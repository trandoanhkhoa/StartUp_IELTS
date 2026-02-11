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
import { useState, useEffect } from "react";
import adminApi from "@/api/adminApi.jsx";

export default function AdminUpdateWritingOverlay({
  open,
  onClose,
  writingId,
  onSuccess = () => {},
  onError = () => {},
}) {
  const task1Types = [
    "Line Chart",
    "Bar Chart",
    "Pie Chart",
    "Table",
    "Mixed Graph",
    "Map",
    "Process",
  ];

  const task2Types = [
    "Agree or Disagree",
    "Advantages and Disadvantages",
    "Discussion",
    "Causes Problems and Solutions",
    "Part Question",
  ];
  const categories = [
    "Education",
    "Environment",
    "Health",
    "Family",
    "Travel",
    "Technology",
    "Sports",
    "Music",
    "Characteristics",
    "Weather",
    "Career",
    "Study & Work",
    "Crime & Punishment",
    "Food & Drink",
    "Transportation",
  ];
  const [form, setForm] = useState({
    taskType: "",
    imageUrl: "",
    question: "",
    title: "",
    type: "",
    source: "",
    category: "",
    hide: false,
  });
  useEffect(() => {
    if (!open || !writingId) return;
    const fetchWriting = async () => {
      try {
        const res = await adminApi.getWritingById(writingId);
        setForm({
          taskType: res.data.taskType ?? "",
          imageUrl: res.data.imageUrl ?? "",
          question: res.data.question ?? "",
          title: res.data.title ?? "",
          type: res.data.type ?? "",
          source: res.data.source ?? "",
          category: res.data.category ?? "",
          hide: res.data.hide ?? false,
        });
      } catch (err) {
        console.error("Load writing failed", err);
        onError();
      }
    };

    fetchWriting();
  }, [open, writingId]);
  const [dragOver, setDragOver] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.question.trim()) return;

    try {
      await adminApi.updateWritingById(writingId, form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Update writing failed", err);
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
            Update Writing
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

            {/* NEW: Title */}
            <TextField
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              fullWidth
              placeholder="Enter short title..."
            />

            {/* NEW: Type (dynamic theo Task) */}
            {form.taskType && (
              <TextField
                select
                label="Question type"
                name="type"
                value={form.type}
                onChange={handleChange}
                fullWidth
              >
                {(form.taskType === "Task 1" ? task1Types : task2Types).map(
                  (item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ),
                )}
              </TextField>
            )}
            {/* Category */}
            <TextField
              select
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              fullWidth
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
            {/* NEW: Source */}
            <TextField
              select
              label="Source"
              name="source"
              value={form.source}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Cambridge">Cambridge</MenuItem>
              <MenuItem value="IELTS Collection">IELTS Collection</MenuItem>
            </TextField>

            {/* ===== Giữ nguyên Image phần của bạn ===== */}
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
