import { useState, useRef, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  Drawer, Box, Typography, TextField, IconButton, Paper,
  CircularProgress, Divider, alpha, List, ListItemButton,
  ListItemText, ListItemSecondaryAction,
} from "@mui/material";
import {
  Send as SendIcon, Close as CloseIcon, DeleteOutline as ClearIcon,
  StopCircle as StopIcon, SmartToy as BotIcon, Add as AddIcon,
  History as HistoryIcon, ArrowBack as BackIcon,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { useChatStream, type ChatMessage } from "@/hooks/useChatStream";
import { useIntl } from "react-intl";

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

const DRAWER_WIDTH = 400;

const ChatDrawer = ({ open, onClose }: ChatDrawerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const intl = useIntl();
  const {
    messages, isLoading, send, stop, clear,
    conversations, conversationId,
    loadConversation, newConversation, deleteConversation,
  } = useChatStream();
  const [input, setInput] = useState("");
  const [showHistory, setShowHistory] = useState(false);
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

  const handleSelectConversation = (convId: string) => {
    loadConversation(convId);
    setShowHistory(false);
  };

  const handleNewConversation = () => {
    newConversation();
    setShowHistory(false);
  };

  return (
    <Drawer
      anchor="right" open={open} onClose={onClose}
      variant={isMobile ? "temporary" : "persistent"}
      sx={{
        "& .MuiDrawer-paper": {
          width: isMobile ? "100%" : DRAWER_WIDTH, boxSizing: "border-box",
          border: "none", borderLeft: isMobile ? 0 : 1, borderColor: "divider",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showHistory ? (
            <IconButton size="small" onClick={() => setShowHistory(false)} title={intl.formatMessage({ id: "chat.backToChat" })}>
              <BackIcon sx={{ fontSize: 18 }} />
            </IconButton>
          ) : (
            <BotIcon sx={{ fontSize: 20, color: "primary.main" }} />
          )}
          <Typography variant="subtitle1" fontWeight={600}>
            {showHistory ? intl.formatMessage({ id: "chat.history" }) : intl.formatMessage({ id: "chat.title" })}
          </Typography>
        </Box>
        <Box>
          {!showHistory && (
            <>
              <IconButton size="small" onClick={handleNewConversation} title={intl.formatMessage({ id: "chat.newConversation" })}>
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" onClick={() => setShowHistory(true)} title={intl.formatMessage({ id: "chat.conversationHistory" })} disabled={conversations.length === 0}>
                <HistoryIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton size="small" onClick={clear} title={intl.formatMessage({ id: "chat.deleteConversation" })} disabled={messages.length === 0}>
                <ClearIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}
          <IconButton size="small" onClick={onClose} title={intl.formatMessage({ id: "chat.close" })}>
            <CloseIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>

      {showHistory ? (
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List disablePadding>
            {conversations.map((conv) => (
              <ListItemButton key={conv.id} selected={conv.id === conversationId}
                onClick={() => handleSelectConversation(conv.id)} sx={{ pr: 6 }}>
                <ListItemText primary={conv.title} secondary={new Date(conv.updated_at).toLocaleDateString()}
                  primaryTypographyProps={{ variant: "body2", noWrap: true }}
                  secondaryTypographyProps={{ variant: "caption" }} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" size="small" onClick={() => deleteConversation(conv.id)}>
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItemButton>
            ))}
            {conversations.length === 0 && (
              <Box sx={{ p: 3, textAlign: "center", color: "text.secondary" }}>
                <Typography variant="body2">{intl.formatMessage({ id: "chat.noConversations" })}</Typography>
              </Box>
            )}
          </List>
        </Box>
      ) : (
        <>
          <Box sx={{ flex: 1, overflowY: "auto", px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
            {messages.length === 0 && (
              <Box sx={{ textAlign: "center", mt: 8, color: "text.secondary" }}>
                <BotIcon sx={{ fontSize: 48, mb: 1, opacity: 0.3 }} />
                <Typography variant="body2" color="text.secondary">
                  {intl.formatMessage({ id: "chat.emptyMessage" })}
                </Typography>
              </Box>
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", pl: 1, py: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} sx={{
                    width: 8, height: 8, borderRadius: "50%", bgcolor: "text.secondary",
                    animation: "bounce 1.4s infinite ease-in-out both",
                    animationDelay: `${i * 0.16}s`,
                    "@keyframes bounce": {
                      "0%, 80%, 100%": { transform: "scale(0.4)", opacity: 0.4 },
                      "40%": { transform: "scale(1)", opacity: 1 },
                    },
                  }} />
                ))}
              </Box>
            )}

            <div ref={bottomRef} />
          </Box>

          <Divider />

          <Box sx={{ p: 1.5, display: "flex", gap: 1, alignItems: "flex-end" }}>
            <TextField fullWidth size="small" multiline maxRows={4}
              placeholder={intl.formatMessage({ id: "chat.placeholder" })}
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} disabled={isLoading}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
            {isLoading ? (
              <IconButton onClick={stop} color="error" size="small" title={intl.formatMessage({ id: "chat.stop" })}>
                <StopIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleSend} color="primary" size="small" disabled={!input.trim()} title={intl.formatMessage({ id: "chat.send" })}>
                <SendIcon />
              </IconButton>
            )}
          </Box>
        </>
      )}
    </Drawer>
  );
};

const MessageBubble = ({ message }: { message: ChatMessage }) => {
  const isUser = message.role === "user";

  return (
    <Paper elevation={0} sx={(theme) => ({
      px: 2, py: 1.5, borderRadius: 2, maxWidth: "90%",
      alignSelf: isUser ? "flex-end" : "flex-start",
      bgcolor: isUser
        ? alpha(theme.palette.primary.main, 0.1)
        : theme.palette.mode === "dark"
        ? alpha(theme.palette.background.paper, 0.6)
        : alpha(theme.palette.grey[100], 1),
    })}>
      {isUser ? (
        <Typography variant="body2">{message.content}</Typography>
      ) : (
        <Box sx={{
          "& p": { m: 0, mb: 1, "&:last-child": { mb: 0 } },
          "& pre": { overflow: "auto", p: 1, borderRadius: 1, bgcolor: "action.hover", fontSize: "0.8rem" },
          "& code": { fontSize: "0.8rem", bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 },
          "& ul, & ol": { pl: 2, m: 0, mb: 1 },
          fontSize: "0.875rem",
        }}>
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </Box>
      )}
    </Paper>
  );
};

export default ChatDrawer;
