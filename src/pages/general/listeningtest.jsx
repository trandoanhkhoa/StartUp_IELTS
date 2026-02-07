import * as React from "react";
import {
  AppBar,
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
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Switch,
  Tab,
  Tabs,
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
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import Replay5RoundedIcon from "@mui/icons-material/Replay5Rounded";
import Forward5RoundedIcon from "@mui/icons-material/Forward5Rounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";

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
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
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

export default function ListeningTestPage() {
  // =========================
  // Mock data
  // =========================
  const sections = [
    { key: 1, label: "Section 1" },
    { key: 2, label: "Section 2" },
    { key: 3, label: "Section 3" },
    { key: 4, label: "Section 4" },
  ];

  const questionsBySection = React.useMemo(
    () => ({
      1: [
        {
          id: 1,
          type: "fill",
          qType: "Form completion",
          prompt: "Complete the form: The student ID is ________.",
          answer: "",
        },
        {
          id: 2,
          type: "mcq",
          qType: "Multiple choice",
          prompt: "Where will the student collect the materials?",
          options: ["Library desk", "Room 12", "Main office", "Online only"],
          answer: "",
        },
        {
          id: 3,
          type: "fill",
          qType: "Note completion",
          prompt: "The course begins on ________ (date).",
          answer: "",
        },
      ],
      2: [
        {
          id: 4,
          type: "mcq",
          qType: "Map labeling",
          prompt: "Which place is next to the cafeteria?",
          options: ["Reception", "Gym", "Garden", "Car park"],
          answer: "",
        },
        {
          id: 5,
          type: "fill",
          qType: "Sentence completion",
          prompt: "The museum ticket costs ________ pounds.",
          answer: "",
        },
      ],
      3: [
        {
          id: 6,
          type: "mcq",
          qType: "Matching",
          prompt: "What is the topic of the group discussion?",
          options: ["Marketing", "Climate change", "AI tools", "Tourism"],
          answer: "",
        },
        {
          id: 7,
          type: "fill",
          qType: "Table completion",
          prompt: "The project deadline is ________.",
          answer: "",
        },
      ],
      4: [
        {
          id: 8,
          type: "mcq",
          qType: "MCQ",
          prompt: "What does the speaker emphasise about research?",
          options: [
            "It is always expensive",
            "It must be replicated",
            "It should be fast",
            "It is mostly theoretical",
          ],
          answer: "",
        },
        {
          id: 9,
          type: "fill",
          qType: "Short answers",
          prompt: "Name ONE factor affecting urban mobility: ________",
          answer: "",
        },
      ],
    }),
    [],
  );

  // audio demo
  const audioSrc =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // =========================
  // State
  // =========================
  const [section, setSection] = React.useState(1);
  const sectionQuestions = questionsBySection[section] ?? [];

  const [activeIndex, setActiveIndex] = React.useState(0);
  React.useEffect(() => setActiveIndex(0), [section]);

  const [answers, setAnswers] = React.useState(() => {
    // flatten all questions into state
    const all = Object.values(questionsBySection).flat();
    return all.map((q) => ({ id: q.id, answer: "", flagged: false, note: "" }));
  });

  const activeQ = sectionQuestions[activeIndex];
  const activeState = activeQ ? answers.find((a) => a.id === activeQ.id) : null;

  // timer (optional)
  const [timeLeft, setTimeLeft] = React.useState(40 * 60);
  React.useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  // settings
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [questionFontSize, setQuestionFontSize] = React.useState(16);

  // tools
  const [tool, setTool] = React.useState(null); // "note" | "dict" | "transcript" | null
  const [highlightOn, setHighlightOn] = React.useState(false);
  const [dictWord, setDictWord] = React.useState("");

  // submit
  const [submitOpen, setSubmitOpen] = React.useState(false);

  // audio player state
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [current, setCurrent] = React.useState(0);
  const [volume, setVolume] = React.useState(0.9);
  const [speed, setSpeed] = React.useState(1);

  const allQuestions = React.useMemo(
    () => Object.values(questionsBySection).flat(),
    [questionsBySection],
  );

  const answeredCount = answers.filter(
    (a) => String(a.answer).trim().length > 0,
  ).length;
  const flaggedCount = answers.filter((a) => a.flagged).length;

  const setAnswer = (value) => {
    if (!activeQ) return;
    setAnswers((prev) =>
      prev.map((a) => (a.id === activeQ.id ? { ...a, answer: value } : a)),
    );
  };

  const toggleFlag = () => {
    if (!activeQ) return;
    setAnswers((prev) =>
      prev.map((a) =>
        a.id === activeQ.id ? { ...a, flagged: !a.flagged } : a,
      ),
    );
  };

  const setNote = (value) => {
    if (!activeQ) return;
    setAnswers((prev) =>
      prev.map((a) => (a.id === activeQ.id ? { ...a, note: value } : a)),
    );
  };

  // audio handlers
  const playPause = async () => {
    const el = audioRef.current;
    if (!el) return;

    if (el.paused) {
      try {
        await el.play();
        setIsPlaying(true);
      } catch (e) {
        console.log(e);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (value) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = value;
    setCurrent(value);
  };

  const skip = (delta) => {
    const el = audioRef.current;
    if (!el) return;
    const next = Math.max(
      0,
      Math.min(el.duration || 0, el.currentTime + delta),
    );
    el.currentTime = next;
    setCurrent(next);
  };

  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  React.useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.playbackRate = speed;
  }, [speed]);

  // =========================
  // Render
  // =========================
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, pb: 12 }}>
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
              <Stack direction="row" spacing={1} alignItems="center">
                <HeadphonesRoundedIcon sx={{ color: ui.primary }} />
                <Typography sx={{ fontWeight: 1000, letterSpacing: -0.3 }}>
                  Listening — Practice Test
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1} alignItems="center">
                <Chip
                  size="small"
                  label={`${answeredCount}/${allQuestions.length} answered`}
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
              <Tooltip title="Thiết lập">
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
      {/* QUESTIONS – ONE BOX */}
      <LinearCard sx={{ mb: 4 }}>
        <Box sx={{ px: 2.5, py: 2 }}>
          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
            Questions – Section {section}
          </Typography>
          <Typography sx={{ mt: 0.4, fontSize: 13, color: ui.muted }}>
            Trả lời tất cả câu hỏi bên dưới (scroll dọc).
          </Typography>
        </Box>

        <Divider sx={{ borderColor: ui.border }} />

        <Box sx={{ p: 2.5 }}>
          <Stack spacing={3}>
            {sectionQuestions.map((q, idx) => {
              const st = answers.find((a) => a.id === q.id);
              const answered = String(st?.answer ?? "").trim().length > 0;

              return (
                <Box key={q.id}>
                  {/* QUESTION HEADER */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography sx={{ fontWeight: 1000 }}>
                      Question {idx + 1}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {st?.flagged && (
                        <FlagRoundedIcon sx={{ color: "#F59E0B" }} />
                      )}
                      <Button
                        size="small"
                        onClick={() =>
                          setAnswers((prev) =>
                            prev.map((a) =>
                              a.id === q.id ? { ...a, flagged: !a.flagged } : a,
                            ),
                          )
                        }
                        sx={{ borderRadius: 3, fontWeight: 1000 }}
                      >
                        {st?.flagged ? "Unflag" : "Flag"}
                      </Button>
                    </Stack>
                  </Stack>

                  {/* PROMPT */}
                  <Typography
                    sx={{
                      mt: 1.2,
                      fontWeight: 1000,
                      fontSize: questionFontSize,
                      color: ui.text,
                      letterSpacing: -0.2,
                    }}
                  >
                    {q.prompt}
                  </Typography>

                  {/* ANSWER */}
                  <Box sx={{ mt: 2 }}>
                    {q.type === "mcq" ? (
                      <Stack spacing={1}>
                        {q.options.map((op) => {
                          const selected = st?.answer === op;
                          return (
                            <Box
                              key={op}
                              onClick={() =>
                                setAnswers((prev) =>
                                  prev.map((a) =>
                                    a.id === q.id ? { ...a, answer: op } : a,
                                  ),
                                )
                              }
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
                        value={st?.answer ?? ""}
                        onChange={(e) =>
                          setAnswers((prev) =>
                            prev.map((a) =>
                              a.id === q.id
                                ? { ...a, answer: e.target.value }
                                : a,
                            ),
                          )
                        }
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

                  {/* NOTE */}
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 1000,
                        color: ui.muted,
                      }}
                    >
                      Note
                    </Typography>
                    <TextField
                      value={st?.note ?? ""}
                      onChange={(e) =>
                        setAnswers((prev) =>
                          prev.map((a) =>
                            a.id === q.id ? { ...a, note: e.target.value } : a,
                          ),
                        )
                      }
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

                  {/* DIVIDER */}
                  {idx !== sectionQuestions.length - 1 && (
                    <Divider sx={{ mt: 3, borderColor: ui.border }} />
                  )}
                </Box>
              );
            })}
          </Stack>
        </Box>
      </LinearCard>

      {/* FLOATING TOOLS */}
      <Box sx={{ position: "fixed", right: 18, bottom: 98, zIndex: 1500 }}>
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

            <Tooltip title="Highlight (Transcript)">
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

      {/* AUDIO PLAYER (BOTTOM STICKY) */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1300,
          bgcolor: "rgba(248,250,252,.92)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid",
          borderColor: ui.border,
        }}
      >
        <Container maxWidth="xl" sx={{ py: 1.5 }}>
          <LinearCard sx={{ borderRadius: 4 }}>
            <Box sx={{ px: 2, py: 1.5 }}>
              <Stack spacing={1.2}>
                {/* progress */}
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography
                    sx={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontWeight: 900,
                      color: ui.muted,
                      fontSize: 12.5,
                    }}
                  >
                    {formatTime(current)}
                  </Typography>

                  <Slider
                    value={Math.min(current, duration || 0)}
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    onChange={(e, v) => seekTo(v)}
                    sx={{
                      flex: 1,
                      "& .MuiSlider-thumb": { width: 14, height: 14 },
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                      fontWeight: 900,
                      color: ui.muted,
                      fontSize: 12.5,
                    }}
                  >
                    {formatTime(duration)}
                  </Typography>
                </Stack>

                {/* controls */}
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1.2}
                  alignItems={{ xs: "stretch", md: "center" }}
                  justifyContent="space-between"
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                      onClick={() => skip(-5)}
                      sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: ui.border,
                        bgcolor: "#fff",
                      }}
                    >
                      <Replay5RoundedIcon />
                    </IconButton>

                    <IconButton
                      onClick={playPause}
                      sx={{
                        borderRadius: 3,
                        bgcolor: "rgba(14,165,233,.12)",
                        border: "1px solid",
                        borderColor: "rgba(14,165,233,.25)",
                      }}
                    >
                      {isPlaying ? (
                        <PauseRoundedIcon sx={{ color: ui.primary }} />
                      ) : (
                        <PlayArrowRoundedIcon sx={{ color: ui.primary }} />
                      )}
                    </IconButton>

                    <IconButton
                      onClick={() => skip(5)}
                      sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: ui.border,
                        bgcolor: "#fff",
                      }}
                    >
                      <Forward5RoundedIcon />
                    </IconButton>

                    <Divider
                      flexItem
                      orientation="vertical"
                      sx={{ mx: 1, borderColor: ui.border }}
                    />

                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      sx={{ minWidth: 220 }}
                    >
                      <VolumeUpRoundedIcon
                        sx={{ color: "rgba(15,23,42,.6)" }}
                      />
                      <Slider
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(e, v) => setVolume(v)}
                        sx={{ width: 140 }}
                      />
                      <Typography
                        sx={{
                          fontSize: 12.5,
                          fontWeight: 1000,
                          color: ui.muted,
                        }}
                      >
                        {Math.round(volume * 100)}%
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Typography
                      sx={{ fontSize: 13, fontWeight: 1000, color: ui.muted }}
                    >
                      Speed
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 110 }}>
                      <Select
                        value={speed}
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        sx={{
                          borderRadius: 3,
                          bgcolor: "#fff",
                          fontWeight: 1000,
                        }}
                      >
                        <MenuItem value={0.75}>0.75x</MenuItem>
                        <MenuItem value={1}>1.0x</MenuItem>
                        <MenuItem value={1.25}>1.25x</MenuItem>
                        <MenuItem value={1.5}>1.5x</MenuItem>
                      </Select>
                    </FormControl>

                    <Chip
                      size="small"
                      label={highlightOn ? "Highlight ON" : "Highlight OFF"}
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
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </LinearCard>

          {/* hidden audio element */}
          <audio
            ref={audioRef}
            src={audioSrc}
            preload="metadata"
            onLoadedMetadata={(e) => {
              setDuration(e.currentTarget.duration || 0);
            }}
            onTimeUpdate={(e) => {
              setCurrent(e.currentTarget.currentTime || 0);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            style={{ display: "none" }}
          />
        </Container>
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
            Kích cỡ chữ câu hỏi
          </Typography>
          <Slider
            value={questionFontSize}
            onChange={(e, v) => setQuestionFontSize(v)}
            min={13}
            max={22}
            step={1}
            sx={{ mt: 1 }}
          />

          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Switch
                checked={highlightOn}
                onChange={(e) => setHighlightOn(e.target.checked)}
              />
            }
            label="Highlight transcript (demo)"
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
            Note chung cho bài listening (demo).
          </Typography>

          <TextField
            multiline
            minRows={10}
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
            Bạn đã trả lời <b>{answeredCount}</b> / {allQuestions.length} câu.
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
