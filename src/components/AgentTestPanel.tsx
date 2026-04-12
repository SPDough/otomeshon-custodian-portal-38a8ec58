import { useState, useRef, useCallback, useEffect } from "react";
import {
  Box, Card, CardContent, Typography, TextField, IconButton, alpha, useTheme, Chip,
  Select, MenuItem, FormControl, InputLabel, Slider, Tooltip, List, ListItemButton,
  ListItemText, ListItemIcon, Divider, Menu,
} from "@mui/material";
import {
  Send as SendIcon, Stop as StopIcon, DeleteSweep as ClearIcon,
  History as HistoryIcon, Add as AddIcon, Delete as DeleteIcon,
  ChatBubbleOutline as ChatIcon, Search as SearchIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { format } from "date-fns";
import type { Agent } from "@/hooks/useAgents";
import {
  useAgentTestConversations,
  useTestConversationMessages,
  useCreateTestConversation,
  useSaveTestMessage,
  useDeleteTestConversation,
  useUpdateTokenUsage,
} from "@/hooks/useAgentTestHistory";

const AVAILABLE_MODELS = [
  { value: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
  { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { value: "gemini-3-flash-preview", label: "Gemini 3 Flash" },
  { value: "gemini-3.1-pro-preview", label: "Gemini 3.1 Pro" },
  { value: "gpt-5-mini", label: "GPT-5 Mini" },
  { value: "gpt-5", label: "GPT-5" },
  { value: "gpt-5-nano", label: "GPT-5 Nano" },
];

type Msg = { role: "user" | "assistant"; content: string };

const AGENT_TEST_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/agent-test`;

interface AgentTestPanelProps {
  agent: Agent;
}

export default function AgentTestPanel({ agent }: AgentTestPanelProps) {
  const theme = useTheme();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [overrideModel, setOverrideModel] = useState<string>("");
  const [overrideTemp, setOverrideTemp] = useState<number | null>(null);
  const [activeConvoId, setActiveConvoId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historySearch, setHistorySearch] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const { data: conversations = [] } = useAgentTestConversations(agent.id);
  const { data: loadedMessages } = useTestConversationMessages(activeConvoId);
  const createConvo = useCreateTestConversation();
  const saveMessage = useSaveTestMessage();
  const deleteConvo = useDeleteTestConversation();
  const updateTokenUsage = useUpdateTokenUsage();
  const [tokenUsage, setTokenUsage] = useState<{ prompt_tokens: number; completion_tokens: number; total_tokens: number } | null>(null);

  // Load messages and token usage when switching conversations
  useEffect(() => {
    if (loadedMessages && activeConvoId) {
      setMessages(loadedMessages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })));
      const convo = conversations.find((c) => c.id === activeConvoId);
      if (convo && convo.total_tokens > 0) {
        setTokenUsage({ prompt_tokens: convo.prompt_tokens, completion_tokens: convo.completion_tokens, total_tokens: convo.total_tokens });
      } else {
        setTokenUsage(null);
      }
    }
  }, [loadedMessages, activeConvoId, conversations]);

  const scrollToBottom = () => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const activeModel = overrideModel || agent.model || "gemini-2.5-flash";
  const activeTemp = overrideTemp ?? agent.temperature ?? 0.7;

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    scrollToBottom();

    // Create conversation if this is the first message
    let convoId = activeConvoId;
    if (!convoId) {
      try {
        const convo = await createConvo.mutateAsync({
          agentId: agent.id,
          modelUsed: activeModel,
          temperatureUsed: activeTemp,
        });
        convoId = convo.id;
        setActiveConvoId(convo.id);
      } catch (e) {
        console.error("Failed to create conversation:", e);
        toast.error("Failed to save conversation.");
      }
    }

    // Save user message
    if (convoId) {
      saveMessage.mutate({ conversationId: convoId, role: "user", content: text });
    }

    const controller = new AbortController();
    abortRef.current = controller;

    let assistantSoFar = "";
    let streamUsage: { prompt_tokens?: number; completion_tokens?: number; total_tokens?: number } | null = null;

    const upsert = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
      scrollToBottom();
    };

    try {
      const allMessages = [...messages, userMsg];
      const resp = await fetch(AGENT_TEST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: allMessages.map(({ role, content }) => ({ role, content })),
          agentConfig: {
            persona: agent.persona,
            model: activeModel,
            temperature: activeTemp,
            max_tokens: agent.max_tokens,
            guardrails: agent.guardrails,
          },
        }),
        signal: controller.signal,
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Request failed" }));
        if (resp.status === 429) toast.error("Rate limit reached — please wait a moment.");
        else if (resp.status === 402) toast.error("AI credits exhausted — add funds in workspace settings.");
        else toast.error(err.error || "Something went wrong.");
        setIsLoading(false);
        return;
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: readerDone, value } = await reader.read();
        if (readerDone) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
            if (parsed.usage) streamUsage = parsed.usage;
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      // flush
      if (buffer.trim()) {
        for (let raw of buffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const json = raw.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) upsert(content);
            if (parsed.usage) streamUsage = parsed.usage;
          } catch { /* ignore */ }
        }
      }

      // Save assistant message and token usage after streaming completes
      if (convoId && assistantSoFar) {
        saveMessage.mutate({ conversationId: convoId, role: "assistant", content: assistantSoFar });
      }
      if (streamUsage) {
        const usage = {
          prompt_tokens: streamUsage.prompt_tokens ?? 0,
          completion_tokens: streamUsage.completion_tokens ?? 0,
          total_tokens: streamUsage.total_tokens ?? 0,
        };
        setTokenUsage(usage);
        if (convoId) {
          updateTokenUsage.mutate({
            conversationId: convoId,
            agentId: agent.id,
            promptTokens: usage.prompt_tokens,
            completionTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens,
          });
        }
      }
    } catch (e: any) {
      if (e.name !== "AbortError") {
        console.error("Agent test error:", e);
        toast.error("Failed to get response.");
      }
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }, [input, isLoading, messages, agent, activeConvoId, activeModel, activeTemp, createConvo, saveMessage, updateTokenUsage]);

  const stop = () => abortRef.current?.abort();

  const startNew = () => {
    setMessages([]);
    setInput("");
    setActiveConvoId(null);
    setTokenUsage(null);
  };

  const loadConversation = (id: string) => {
    setActiveConvoId(id);
    setShowHistory(false);
  };

  const handleDeleteConvo = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteConvo.mutate(
      { id, agentId: agent.id },
      {
        onSuccess: () => {
          if (activeConvoId === id) startNew();
          toast.success("Conversation deleted.");
        },
      }
    );
  };

  const [exportAnchor, setExportAnchor] = useState<null | HTMLElement>(null);

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeConvo = conversations.find((c) => c.id === activeConvoId);

  const exportAsJson = () => {
    setExportAnchor(null);
    const data = {
      agent: { name: agent.name, model: activeConvo?.model_used ?? activeModel, temperature: activeConvo ? Number(activeConvo.temperature_used) : activeTemp },
      exported_at: new Date().toISOString(),
      messages: messages.map(({ role, content }) => ({ role, content })),
    };
    const ts = format(new Date(), "yyyyMMdd-HHmmss");
    downloadFile(JSON.stringify(data, null, 2), `${agent.name.replace(/\s+/g, "-").toLowerCase()}-${ts}.json`, "application/json");
    toast.success("Exported as JSON.");
  };

  const exportAsMarkdown = () => {
    setExportAnchor(null);
    const model = activeConvo?.model_used ?? activeModel;
    const temp = activeConvo ? Number(activeConvo.temperature_used) : activeTemp;
    let md = `# Agent Test: ${agent.name}\n\n`;
    md += `- **Model:** ${model}\n- **Temperature:** ${temp}\n- **Exported:** ${format(new Date(), "PPpp")}\n\n---\n\n`;
    for (const msg of messages) {
      md += `### ${msg.role === "user" ? "🧑 User" : "🤖 Assistant"}\n\n${msg.content}\n\n`;
    }
    const ts = format(new Date(), "yyyyMMdd-HHmmss");
    downloadFile(md, `${agent.name.replace(/\s+/g, "-").toLowerCase()}-${ts}.md`, "text/markdown");
    toast.success("Exported as Markdown.");
  };

  const getConvoPreview = (convo: typeof conversations[0]) => {
    return format(new Date(convo.created_at), "MMM d, h:mm a");
  };

  const filteredConversations = conversations.filter((convo) => {
    if (!historySearch.trim()) return true;
    const q = historySearch.toLowerCase();
    return (
      convo.model_used.toLowerCase().includes(q) ||
      getConvoPreview(convo).toLowerCase().includes(q) ||
      String(convo.temperature_used).includes(q)
    );
  });

  return (
    <Card>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        {/* Header */}
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="h6" fontWeight={600}>Test Agent</Typography>
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Model</InputLabel>
              <Select
                value={activeModel}
                label="Model"
                onChange={(e) => setOverrideModel(e.target.value)}
              >
                {AVAILABLE_MODELS.map((m) => (
                  <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Tooltip title="Temperature override" placement="top">
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 160 }}>
                <Typography variant="caption" color="text.secondary" noWrap>Temp</Typography>
                <Slider
                  size="small"
                  value={activeTemp}
                  onChange={(_, v) => setOverrideTemp(v as number)}
                  min={0}
                  max={2}
                  step={0.05}
                  valueLabelDisplay="auto"
                  sx={{ flex: 1 }}
                />
                <Typography variant="caption" fontWeight={600} sx={{ minWidth: 28, textAlign: "right" }}>
                  {activeTemp.toFixed(2)}
                </Typography>
              </Box>
            </Tooltip>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Chip label={`${agent.max_tokens ?? 4096} tokens`} size="small" variant="outlined" />
              {agent.guardrails?.length > 0 && (
                <Chip label={`${agent.guardrails.length} guardrail${agent.guardrails.length > 1 ? "s" : ""}`} size="small" color="warning" variant="outlined" />
              )}
              {tokenUsage && (
                <Tooltip title={`Prompt: ${tokenUsage.prompt_tokens} · Completion: ${tokenUsage.completion_tokens}`}>
                  <Chip
                    label={`${tokenUsage.total_tokens.toLocaleString()} tokens used`}
                    size="small"
                    color="info"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="Export conversation">
              <span>
                <IconButton size="small" onClick={(e) => setExportAnchor(e.currentTarget)} disabled={messages.length === 0}>
                  <DownloadIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
            <Menu anchorEl={exportAnchor} open={Boolean(exportAnchor)} onClose={() => setExportAnchor(null)}>
              <MenuItem onClick={exportAsJson}>Export as JSON</MenuItem>
              <MenuItem onClick={exportAsMarkdown}>Export as Markdown</MenuItem>
            </Menu>
            <Tooltip title="Conversation history">
              <IconButton size="small" onClick={() => setShowHistory((s) => !s)}>
                <HistoryIcon fontSize="small" color={showHistory ? "primary" : "inherit"} />
              </IconButton>
            </Tooltip>
            <Tooltip title="New conversation">
              <IconButton size="small" onClick={startNew} disabled={messages.length === 0}>
                <AddIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Clear current">
              <IconButton size="small" onClick={startNew} disabled={messages.length === 0 && !input}>
                <ClearIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Box sx={{ display: "flex" }}>
          {/* History sidebar */}
          {showHistory && (
            <Box
              sx={{
                width: 240,
                borderRight: 1,
                borderColor: "divider",
                height: 360,
                overflowY: "auto",
                flexShrink: 0,
              }}
            >
              <Box sx={{ p: 1, borderBottom: 1, borderColor: "divider" }}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Search history..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon sx={{ fontSize: 16, mr: 0.5, color: "text.disabled" }} />,
                  }}
                  sx={{ "& .MuiInputBase-root": { fontSize: "0.75rem", py: 0.25 } }}
                />
              </Box>
              {filteredConversations.length === 0 ? (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="caption" color="text.secondary">
                    {conversations.length === 0 ? "No saved conversations yet." : "No matching conversations."}
                  </Typography>
                </Box>
              ) : (
                <List dense disablePadding>
                  {filteredConversations.map((convo) => (
                    <ListItemButton
                      key={convo.id}
                      selected={activeConvoId === convo.id}
                      onClick={() => loadConversation(convo.id)}
                      sx={{ py: 1, px: 1.5 }}
                    >
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <ChatIcon fontSize="small" color="action" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="caption" fontWeight={500} noWrap>
                            {getConvoPreview(convo)}
                          </Typography>
                        }
                        secondary={
                          <Typography variant="caption" color="text.secondary" noWrap sx={{ fontSize: "0.7rem" }}>
                            {convo.model_used} · {Number(convo.temperature_used).toFixed(1)}
                          </Typography>
                        }
                      />
                      <IconButton
                        size="small"
                        onClick={(e) => handleDeleteConvo(e, convo.id)}
                        sx={{ opacity: 0.5, "&:hover": { opacity: 1 } }}
                      >
                        <DeleteIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Box>
          )}

          {/* Messages */}
          <Box sx={{ height: 360, overflowY: "auto", px: 3, py: 2, flex: 1 }}>
            {messages.length === 0 && (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Send a message to test this agent with its configured persona, model, and settings.
                </Typography>
              </Box>
            )}
            {messages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: msg.role === "user"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : alpha(theme.palette.text.primary, 0.04),
                    "& p": { m: 0 },
                    "& pre": {
                      bgcolor: alpha(theme.palette.text.primary, 0.06),
                      p: 1.5,
                      borderRadius: 1,
                      overflowX: "auto",
                      fontSize: "0.85rem",
                    },
                    "& code": { fontSize: "0.85rem" },
                  }}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <Typography variant="body2">{msg.content}</Typography>
                  )}
                </Box>
              </Box>
            ))}
            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <Box sx={{ display: "flex", gap: 0.5, py: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 8, height: 8, borderRadius: "50%",
                      bgcolor: "text.disabled",
                      animation: "bounce 1.4s infinite",
                      animationDelay: `${i * 0.16}s`,
                      "@keyframes bounce": {
                        "0%, 80%, 100%": { transform: "scale(0)" },
                        "40%": { transform: "scale(1)" },
                      },
                    }}
                  />
                ))}
              </Box>
            )}
            <div ref={bottomRef} />
          </Box>
        </Box>

        {/* Input */}
        <Box sx={{ px: 3, py: 2, borderTop: 1, borderColor: "divider", display: "flex", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Type a message to test..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            multiline
            maxRows={3}
            inputProps={{ maxLength: 4000 }}
          />
          {isLoading ? (
            <IconButton onClick={stop} color="error">
              <StopIcon />
            </IconButton>
          ) : (
            <IconButton onClick={send} disabled={!input.trim()} color="primary">
              <SendIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
