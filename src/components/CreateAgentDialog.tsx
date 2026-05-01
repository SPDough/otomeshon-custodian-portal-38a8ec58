import { useState } from "react";
import { useIntl } from "react-intl";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, MenuItem, Box,
} from "@mui/material";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  description: z.string().trim().max(500).optional(),
  persona: z.string().trim().max(500).optional(),
  model: z.string(),
});

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; persona: string; model: string }) => void;
  saving?: boolean;
}

const MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gpt-5-mini",
  "gpt-5",
];

const CreateAgentDialog = ({ open, onClose, onSave, saving }: Props) => {
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [persona, setPersona] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const result = schema.safeParse({ name, description, persona, model });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => { fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    onSave({ name: name.trim(), description: description.trim(), persona: persona.trim(), model });
  };

  const handleClose = () => {
    setName(""); setDescription(""); setPersona(""); setModel("gemini-2.5-flash"); setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{fm("agents.createTitle")}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2.5, pt: "16px !important" }}>
        <TextField
          label={fm("agents.createName")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          size="small"
          inputProps={{ maxLength: 100 }}
          autoFocus
        />
        <TextField
          label={fm("agents.createDescription")}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={2}
          inputProps={{ maxLength: 500 }}
        />
        <TextField
          label={fm("agents.createPersona")}
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          fullWidth
          size="small"
          multiline
          rows={2}
          inputProps={{ maxLength: 500 }}
          placeholder={fm("agents.createPersonaPlaceholder")}
        />
        <TextField
          select
          label={fm("agents.createModel")}
          value={model}
          onChange={(e) => setModel(e.target.value)}
          fullWidth
          size="small"
        >
          {MODELS.map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit">{fm("agents.editCancel")}</Button>
        <Button onClick={handleSave} variant="contained" disabled={saving}>
          {fm("agents.createSave")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAgentDialog;
