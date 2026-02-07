import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Switch,
  TextField,
  MenuItem,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import adminApi from "@/api/adminApi.jsx";

export default function AdminAddWritingOverlay({
  open,
  onClose,
  onSuccess = () => {},
  onError = () => {},
}) {
  const [form, setForm] = useState({
    taskType: "",
    imageUrl: "",
    question: "",
    hide: false,
  });

  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.question.trim()) return;

    try {
      await adminApi.addWriting(form);
      onSuccess();
    } catch (err) {
      console.error("Add writing failed", err);
      onError();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* ===== Top Bar ===== */}
      <AppBar
        elevation={0}
        sx={{
          position: "relative",
          bgcolor: "background.paper",
          borderBottom: "1px solid rgba(15,23,42,.08)",
          color: "text.primary",
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={onClose}>
            <CloseIcon />
          </IconButton>

          <Typography sx={{ ml: 2, flex: 1 }} variant="h6">
            Add Writing
          </Typography>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.question.trim()}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== Content ===== */}
      <Box
        sx={{
          p: 4,
          bgcolor: "#f8fafc",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 900,
            mx: "auto",
            p: 4,
            borderRadius: 3,
            border: "1px solid rgba(15,23,42,.08)",
          }}
        >
          <Stack spacing={3}>
            {/* Task Type */}
            <TextField
              select
              label="Task type"
              name="taskType"
              value={form.taskType}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Task 1">Task 1</MenuItem>
              <MenuItem value="Task 2">Task 2</MenuItem>
            </TextField>

            {/* Image */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
                Image (optional)
              </Typography>

              <Box
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (!file) return;
                  setForm({
                    ...form,
                    imageUrl: URL.createObjectURL(file),
                  });
                }}
                sx={{
                  border: "1.5px dashed",
                  borderColor: dragOver ? "primary.main" : "rgba(15,23,42,.2)",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  bgcolor: dragOver ? "rgba(14,165,233,.04)" : "transparent",
                }}
              >
                {form.imageUrl ? (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    style={{ maxHeight: 220, borderRadius: 8 }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Drag & drop image here or paste image URL
                  </Typography>
                )}
              </Box>

              <TextField
                placeholder="Or paste image URL"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Question */}
            <TextField
              multiline
              minRows={7}
              name="question"
              value={form.question}
              onChange={handleChange}
              fullWidth
              placeholder="Write the IELTS question here..."
              InputProps={{
                sx: {
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 14,
                },
              }}
            />

            {/* Hide */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Switch
                checked={form.hide}
                onChange={(e) => setForm({ ...form, hide: e.target.checked })}
              />
              <Typography variant="body2">
                Hide this writing from students
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Dialog>
  );
}
