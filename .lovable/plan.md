

## Plan: Right-Side Drawer Chat with LLM (Lovable AI)

### Overview
Add a right-side drawer chat panel that slides in from the right edge, streams AI responses from Lovable AI Gateway via a Supabase Edge Function, and renders markdown. A floating chat FAB button in the navbar triggers the drawer.

### Prerequisites
- **Enable Lovable Cloud** to get Supabase + auto-provisioned `LOVABLE_API_KEY`
- **Install `react-markdown`** for rendering AI responses

### Architecture

```text
┌──────────────────────────────────────────────────┐
│  Navbar  [≡]  Logo  ...nav...  [💬] [🌙] [👤]   │
├────────────┬─────────────────────┬───────────────┤
│            │                     │  Chat Drawer   │
│  Sidebar   │   Main Content      │  (400px)       │
│  (260px)   │                     │  ┌───────────┐│
│            │                     │  │ Messages  ││
│            │                     │  │ ...       ││
│            │                     │  │           ││
│            │                     │  ├───────────┤│
│            │                     │  │ Input box ││
│            │                     │  └───────────┘│
└────────────┴─────────────────────┴───────────────┘
```

### Steps

**1. Enable Lovable Cloud**
Provision Supabase backend so the `LOVABLE_API_KEY` secret is available for the edge function.

**2. Create Edge Function `supabase/functions/chat/index.ts`**
- Proxies requests to `https://ai.gateway.lovable.dev/v1/chat/completions`
- Uses `google/gemini-3-flash-preview` model
- Streams SSE responses back to client
- Handles CORS, 429/402 errors
- System prompt: context-aware assistant for the custodian portal

**3. Install `react-markdown`**
For rendering AI markdown responses in the chat.

**4. Create `src/components/ChatDrawer.tsx`**
- MUI `Drawer` anchored to the right, width 400px
- Message list with user/assistant message bubbles (MUI `Paper`, `Box`)
- Markdown rendering for assistant messages via `react-markdown`
- Text input with send button at bottom
- Streaming token-by-token rendering
- Loading indicator (typing dots) while streaming
- Toast notifications for errors (429/402)
- Conversation history maintained in state

**5. Create `src/hooks/useChatStream.ts`**
- SSE streaming logic extracted into a reusable hook
- Manages messages state, loading state, abort controller
- Calls the edge function with full conversation history

**6. Update `src/components/MaterialNavbar.tsx`**
- Add a chat icon button (MUI `Chat` icon) to the toolbar
- Toggles the chat drawer open/closed

**7. Update `src/components/MaterialLayout.tsx`**
- Add `ChatDrawer` component to the layout
- Pass open/close state from navbar through to the drawer

### Technical Details
- Edge function deployed with `verify_jwt = false` (public access)
- Frontend constructs URL via `import.meta.env.VITE_SUPABASE_URL`
- SSE parsed line-by-line with proper `[DONE]`, CRLF, and partial JSON handling
- Main content area does NOT shift when chat opens (drawer overlays)

