import * as React from "react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Fade,
  FormControlLabel,
  IconButton,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

const ui = {
  primary: "#0EA5E9",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "rgba(15,23,42,.62)",
  border: "rgba(15,23,42,.08)",
};

function LinearCard({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        bgcolor: ui.card,
        border: "1px solid",
        borderColor: ui.border,
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function QuestionNumber({ index, active, answered, flagged, onClick }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 36,
        height: 36,
        borderRadius: 3,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        border: "1px solid",
        borderColor: active ? ui.primary : ui.border,
        bgcolor: active ? "rgba(14,165,233,.12)" : "#fff",
        transition: "all .15s ease",
        position: "relative",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 10px 24px rgba(2,6,23,.06)",
        },
      }}
    >
      <Typography sx={{ fontWeight: 1000, color: ui.text, fontSize: 13 }}>
        {index + 1}
      </Typography>

      {answered && (
        <Box
          sx={{
            position: "absolute",
            right: 6,
            bottom: 6,
            width: 6,
            height: 6,
            borderRadius: 999,
            bgcolor: "rgba(34,197,94,.95)",
          }}
        />
      )}

      {flagged && (
        <Box sx={{ position: "absolute", left: 6, top: 6 }}>
          <FlagRoundedIcon sx={{ fontSize: 14, color: "#F59E0B" }} />
        </Box>
      )}
    </Box>
  );
}

export default function ReadingTestPage() {
  // ===== mock data =====
  const passageTitle = "Passage 1 — The Future of Urban Mobility";

  const passageText = `
Urban mobility is undergoing a profound transformation. Over the past decade, cities have faced mounting pressure to reduce congestion, lower carbon emissions, and improve accessibility for residents.

One major factor driving this shift is the rise of micro-mobility solutions such as shared bicycles and electric scooters. These services provide flexible, short-distance travel options that complement traditional public transport networks.

In addition, advancements in battery technology and charging infrastructure have accelerated the adoption of electric vehicles. While EVs alone cannot solve congestion, they play an important role in decarbonising urban transportation.

However, technology is only one piece of the puzzle. Effective policy and planning are equally critical. Cities that invest in dedicated cycling lanes, pedestrian zones, and reliable mass transit systems tend to see measurable improvements in both traffic flow and public health.

Finally, the concept of “mobility as a service” (MaaS) is gaining momentum. MaaS platforms aim to integrate multiple transport modes into a single app, allowing users to plan, book, and pay for trips seamlessly.
`.trim();

  const questions = React.useMemo(
    () => [
      {
        id: 1,
        type: "mcq",
        prompt: "What is one key driver of changes in urban mobility?",
        options: [
          "Declining city populations",
          "Micro-mobility solutions",
          "Lower fuel prices",
          "Reduced use of public transport",
        ],
        answer: "",
      },
      {
        id: 2,
        type: "short",
        prompt: "According to the passage, EVs alone cannot solve ________.",
        answer: "",
      },
      {
        id: 3,
        type: "mcq",
        prompt: "Which policy is mentioned as improving traffic flow?",
        options: [
          "Banning buses",
          "Building more highways",
          "Dedicated cycling lanes",
          "Reducing pedestrian areas",
        ],
        answer: "",
      },
      {
        id: 4,
        type: "short",
        prompt: "What does MaaS stand for?",
        answer: "",
      },
      {
        id: 5,
        type: "mcq",
        prompt: "What does MaaS aim to integrate?",
        options: [
          "Only electric vehicles",
          "Multiple transport modes",
          "Only taxis and buses",
          "Only bike-sharing services",
        ],
        answer: "",
      },
    ],
    [],
  );

  // ===== state =====
  const [timeLeft, setTimeLeft] = React.useState(45 * 60); // 45 minutes
  const [activeIndex, setActiveIndex] = React.useState(0);

  const [answers, setAnswers] = React.useState(() =>
    questions.map((q) => ({ id: q.id, answer: "", flagged: false, note: "" })),
  );

  const activeQ = questions[activeIndex];
  const activeState = answers[activeIndex];

  // settings
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(16);
  const [monoForPassage, setMonoForPassage] = React.useState(false);

  // tools
  const [tool, setTool] = React.useState(null); // "note" | "dict" | null
  const [dictWord, setDictWord] = React.useState("");
  const [highlightOn, setHighlightOn] = React.useState(false);

  // submit
  const [submitOpen, setSubmitOpen] = React.useState(false);

  // ===== timer =====
  React.useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const answeredCount = answers.filter(
    (a) => String(a.answer).trim().length > 0,
  ).length;
  const flaggedCount = answers.filter((a) => a.flagged).length;

  const setAnswer = (value) => {
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === activeIndex ? { ...a, answer: value } : a)),
    );
  };

  const toggleFlag = () => {
    setAnswers((prev) =>
      prev.map((a, idx) =>
        idx === activeIndex ? { ...a, flagged: !a.flagged } : a,
      ),
    );
  };

  const setNote = (value) => {
    setAnswers((prev) =>
      prev.map((a, idx) => (idx === activeIndex ? { ...a, note: value } : a)),
    );
  };

  const resetHighlights = () => {
    alert("Demo: Clear highlights");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg }}>
      {/* TOP BAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(248,250,252,.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid",
          borderColor: ui.border,
          color: ui.text,
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ py: 1.4 }}
          >
            <Stack spacing={0.2}>
              <Typography sx={{ fontWeight: 1000, letterSpacing: -0.3 }}>
                Reading — Practice Test
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={`${answeredCount}/${questions.length} answered`}
                  sx={{
                    borderRadius: 999,
                    fontWeight: 1000,
                    bgcolor: "rgba(14,165,233,.10)",
                    color: "#0284C7",
                  }}
                />
                <Chip
                  size="small"
                  label={`${flaggedCount} flagged`}
                  sx={{
                    borderRadius: 999,
                    fontWeight: 1000,
                    bgcolor: "rgba(245,158,11,.14)",
                    color: "#B45309",
                  }}
                />
              </Stack>
            </Stack>

            <Stack direction="row" spacing={1.2} alignItems="center">
              {/* TIMER */}
              <Box
                sx={{
                  px: 1.4,
                  py: 0.8,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  border: "1px solid",
                  borderColor: ui.border,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccessTimeRoundedIcon sx={{ color: ui.primary }} />
                <Typography sx={{ fontWeight: 1000 }}>
                  {formatTime(timeLeft)}
                </Typography>
              </Box>

              {/* SETTINGS */}
              <Tooltip title="Thiết lập (font size)">
                <IconButton
                  onClick={() => setSettingsOpen(true)}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: ui.border,
                    bgcolor: "#fff",
                  }}
                >
                  <SettingsRoundedIcon />
                </IconButton>
              </Tooltip>

              {/* SUBMIT */}
              <Button
                variant="contained"
                startIcon={<SendRoundedIcon />}
                onClick={() => setSubmitOpen(true)}
                sx={{
                  borderRadius: 3,
                  fontWeight: 1000,
                  bgcolor: ui.primary,
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                Nộp bài
              </Button>
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      {/* MAIN */}
      <Container maxWidth="xl" sx={{ py: 2.5 }}>
        <Fade in timeout={350}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            {/* LEFT: PASSAGE */}
            <LinearCard sx={{ flex: 1.25 }}>
              <Box sx={{ px: 2.5, py: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography sx={{ fontWeight: 1000, letterSpacing: -0.2 }}>
                      {passageTitle}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: ui.muted, mt: 0.4 }}>
                      Scroll để đọc — dùng highlight / tra từ / note.
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1}>
                    <Chip
                      size="small"
                      label={highlightOn ? "Highlight: ON" : "Highlight: OFF"}
                      onClick={() => setHighlightOn((v) => !v)}
                      sx={{
                        borderRadius: 999,
                        fontWeight: 1000,
                        bgcolor: highlightOn
                          ? "rgba(34,197,94,.14)"
                          : "rgba(15,23,42,.06)",
                        color: highlightOn ? "#16A34A" : "rgba(15,23,42,.72)",
                        cursor: "pointer",
                      }}
                    />
                    <Tooltip title="Clear highlights">
                      <IconButton
                        onClick={resetHighlights}
                        sx={{
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: ui.border,
                        }}
                      >
                        <RestartAltRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Box>

              <Divider sx={{ borderColor: ui.border }} />

              <Box
                sx={{
                  p: 2.5,
                  height: { xs: "auto", md: "calc(100vh - 180px)" },
                  overflow: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize,
                    lineHeight: 1.75,
                    color: "rgba(15,23,42,.88)",
                    fontFamily: monoForPassage
                      ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                      : "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
                    whiteSpace: "pre-line",
                  }}
                >
                  {passageText}
                </Typography>
              </Box>
            </LinearCard>
            {/* RIGHT: QUESTIONS */}
            <LinearCard sx={{ flex: 1, minWidth: 360 }}>
              {/* navigator */}
              <Box sx={{ px: 2.5, py: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography sx={{ fontWeight: 1000 }}>Questions</Typography>
                  <Button
                    size="small"
                    startIcon={
                      activeState.flagged ? (
                        <FlagRoundedIcon />
                      ) : (
                        <FlagOutlinedIcon />
                      )
                    }
                    onClick={toggleFlag}
                    sx={{ borderRadius: 3, fontWeight: 1000 }}
                  >
                    {activeState.flagged ? "Flagged" : "Flag"}
                  </Button>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1.6, flexWrap: "wrap" }}
                >
                  {questions.map((q, idx) => (
                    <QuestionNumber
                      key={q.id}
                      index={idx}
                      active={idx === activeIndex}
                      answered={String(answers[idx].answer).trim().length > 0}
                      flagged={answers[idx].flagged}
                      onClick={() => setActiveIndex(idx)}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider sx={{ borderColor: ui.border }} />

              {/* question content */}
              <Box sx={{ p: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: ui.muted,
                    fontWeight: 900,
                  }}
                >
                  Question {activeIndex + 1} / {questions.length}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.6,
                    fontWeight: 1000,
                    fontSize: 16,
                    color: ui.text,
                    letterSpacing: -0.2,
                  }}
                >
                  {activeQ.prompt}
                </Typography>

                {/* Answer */}
                <Box sx={{ mt: 2 }}>
                  {activeQ.type === "mcq" ? (
                    <Stack spacing={1}>
                      {activeQ.options.map((op) => {
                        const selected = activeState.answer === op;
                        return (
                          <Box
                            key={op}
                            onClick={() => setAnswer(op)}
                            sx={{
                              px: 2,
                              py: 1.4,
                              borderRadius: 3,
                              border: "1px solid",
                              borderColor: selected ? ui.primary : ui.border,
                              bgcolor: selected
                                ? "rgba(14,165,233,.10)"
                                : "#fff",
                              cursor: "pointer",
                              transition: "all .15s ease",
                              "&:hover": {
                                boxShadow: "0 12px 30px rgba(2,6,23,.06)",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            <Typography sx={{ fontWeight: 900 }}>
                              {op}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Stack>
                  ) : (
                    <TextField
                      value={activeState.answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      placeholder="Nhập đáp án..."
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />
                  )}
                </Box>

                {/* Note */}
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 1000, color: ui.muted }}
                  >
                    Note (cho riêng câu hỏi này)
                  </Typography>
                  <TextField
                    value={activeState.note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ghi chú nhanh..."
                    fullWidth
                    multiline
                    minRows={2}
                    sx={{
                      mt: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        bgcolor: "#fff",
                      },
                    }}
                  />
                </Box>

                {/* navigation */}
                <Stack direction="row" spacing={1.2} sx={{ mt: 2.2 }}>
                  <Button
                    variant="outlined"
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
                    sx={{ borderRadius: 3, fontWeight: 1000 }}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="contained"
                    disabled={activeIndex === questions.length - 1}
                    onClick={() =>
                      setActiveIndex((p) =>
                        Math.min(questions.length - 1, p + 1),
                      )
                    }
                    sx={{
                      borderRadius: 3,
                      fontWeight: 1000,
                      bgcolor: ui.primary,
                      "&:hover": { bgcolor: "#0284C7" },
                    }}
                  >
                    Next
                  </Button>
                </Stack>
              </Box>
            </LinearCard>
          </Stack>
        </Fade>
      </Container>

      {/* FLOATING TOOLS */}
      <Box
        sx={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 1200,
        }}
      >
        <LinearCard sx={{ p: 1.1 }}>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Note">
              <IconButton
                onClick={() => setTool("note")}
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    tool === "note" ? "rgba(14,165,233,.10)" : "transparent",
                }}
              >
                <NotesRoundedIcon
                  sx={{
                    color: tool === "note" ? ui.primary : "rgba(15,23,42,.7)",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Highlight">
              <IconButton
                onClick={() => setHighlightOn((v) => !v)}
                sx={{
                  borderRadius: 3,
                  bgcolor: highlightOn ? "rgba(34,197,94,.12)" : "transparent",
                }}
              >
                <BorderColorRoundedIcon
                  sx={{ color: highlightOn ? "#16A34A" : "rgba(15,23,42,.7)" }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Tra từ vựng">
              <IconButton
                onClick={() => setTool("dict")}
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    tool === "dict" ? "rgba(14,165,233,.10)" : "transparent",
                }}
              >
                <MenuBookRoundedIcon
                  sx={{
                    color: tool === "dict" ? ui.primary : "rgba(15,23,42,.7)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </LinearCard>
      </Box>

      {/* SETTINGS DIALOG */}
      <Dialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 1000 }}>Thiết lập</DialogTitle>
        <DialogContent>
          <Typography sx={{ fontWeight: 900, color: ui.text, mt: 1 }}>
            Kích cỡ chữ đoạn văn
          </Typography>
          <Slider
            value={fontSize}
            onChange={(e, v) => setFontSize(v)}
            min={13}
            max={22}
            step={1}
            sx={{ mt: 1 }}
          />

          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Switch
                checked={monoForPassage}
                onChange={(e) => setMonoForPassage(e.target.checked)}
              />
            }
            label="Dùng monospace cho passage"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSettingsOpen(false)}
            sx={{ fontWeight: 1000 }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* NOTE DRAWER */}
      <Drawer
        anchor="right"
        open={tool === "note"}
        onClose={() => setTool(null)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            borderLeft: "1px solid",
            borderColor: ui.border,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 1000 }}>Notes</Typography>
            <IconButton onClick={() => setTool(null)} sx={{ borderRadius: 3 }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Typography sx={{ mt: 1, fontSize: 13, color: ui.muted }}>
            Note chung cho bài (demo).
          </Typography>

          <TextField
            multiline
            minRows={8}
            fullWidth
            placeholder="Ghi chú của bạn..."
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fff",
              },
            }}
          />
        </Box>
      </Drawer>

      {/* DICTIONARY DRAWER */}
      <Drawer
        anchor="right"
        open={tool === "dict"}
        onClose={() => setTool(null)}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 420 },
            borderLeft: "1px solid",
            borderColor: ui.border,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography sx={{ fontWeight: 1000 }}>Dictionary</Typography>
            <IconButton onClick={() => setTool(null)} sx={{ borderRadius: 3 }}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <TextField
            value={dictWord}
            onChange={(e) => setDictWord(e.target.value)}
            placeholder="Nhập từ cần tra..."
            fullWidth
            sx={{
              mt: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fff",
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1.5,
              borderRadius: 3,
              fontWeight: 1000,
              bgcolor: ui.primary,
              "&:hover": { bgcolor: "#0284C7" },
            }}
            onClick={() => alert("Demo: tra từ")}
          >
            Tra từ
          </Button>

          <LinearCard sx={{ mt: 2 }}>
            <Box sx={{ p: 2 }}>
              <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                Result
              </Typography>
              <Typography sx={{ mt: 0.8, fontSize: 13.5, color: ui.muted }}>
                Demo: hiển thị nghĩa / IPA / examples.
              </Typography>
            </Box>
          </LinearCard>
        </Box>
      </Drawer>

      {/* SUBMIT CONFIRM */}
      <Dialog
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 1000 }}>Nộp bài?</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: ui.muted }}>
            Bạn đã trả lời <b>{answeredCount}</b> / {questions.length} câu.
          </Typography>
          <Typography sx={{ mt: 1, color: ui.muted }}>
            Nộp bài sẽ khóa đáp án (demo).
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSubmitOpen(false)}
            sx={{ fontWeight: 1000 }}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setSubmitOpen(false);
              alert("Demo: submit bài");
            }}
            sx={{
              borderRadius: 3,
              fontWeight: 1000,
              bgcolor: ui.primary,
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Nộp bài
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
