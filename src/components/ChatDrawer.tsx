import { useState, useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  CircularProgress,
  Divider,
  alpha,
} from "@mui/material";
import {
  Send as SendIcon,
  Close as CloseIcon,
  DeleteOutline as ClearIcon,
  StopCircle as StopIcon,
  SmartToy as BotIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useChatStream, type ChatMessage } from "@/hooks/useChatStream";

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 400;

const ChatDrawer = ({ open, onClose }: ChatDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { messages, isLoading, send, stop, clear } = useChatStream();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    send(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          border: "none",
          borderLeft: 1,
          borderColor: "divider",
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <BotIcon sx={{ fontSize: 20, color: "primary.main" }} />
          <Typography variant="subtitle1" fontWeight={600}>
            AI Assistant
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" onClick={clear} title="Clear conversation" disabled={messages.length === 0}>
            <ClearIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" onClick={onClose} title="Close">
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
        {messages.length === 0 && (
          <Box sx={{ textAlign: "center", mt: 8, color: "text.secondary" }}>
            <BotIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
            <Typography variant="body2" color="text.secondary">
              Ask anything about portfolios, workflows, or data.
            </Typography>
          </Box>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}

        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", color: "text.secondary" }}>
            <CircularProgress size={14} />
            <Typography variant="caption">Thinking…</Typography>
          </Box>
        )}

        <div ref={bottomRef} />
      </Box>

      <Divider />

      {/* Input */}
      <Box sx={{ p: 1.5, display: "flex", gap: 1, alignItems: "flex-end" }}>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          placeholder="Ask something…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
        />
        {isLoading ? (
          <IconButton onClick={stop} color="error" size="small" title="Stop">
            <StopIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleSend} color="primary" size="small" disabled={!input.trim()} title="Send">
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Drawer>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        px: 2,
        py: 1.5,
        borderRadius: 2,
        maxWidth: "90%",
        alignSelf: isUser ? "flex-end" : "flex-start",
        bgcolor: isUser
          ? alpha(theme.palette.primary.main, 0.1)
          : theme.palette.mode === "dark"
          ? alpha(theme.palette.background.paper, 0.6)
          : alpha(theme.palette.grey[100], 1),
      })}
    >
      {isUser ? (
        <Typography variant="body2">{message.content}</Typography>
      ) : (
        <Box
          sx={{
            "& p": { m: 0, mb: 1, "&:last-child": { mb: 0 } },
            "& pre": { overflow: "auto", p: 1, borderRadius: 1, bgcolor: "action.hover", fontSize: "0.8rem" },
            "& code": { fontSize: "0.8rem", bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 },
            "& ul, & ol": { pl: 2, m: 0, mb: 1 },
            fontSize: "0.875rem",
          }}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </Box>
      )}
    </Paper>
  );
};

export default ChatDrawer;
