import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";

const PRIMARY = "#0EA5E9";

const initialCourses = [
  {
    id: "crs_01",
    title: "IELTS Writing Foundation",
    description:
      "Khóa nền tảng giúp học sinh nắm cấu trúc Task 1/2, grammar core, và luyện viết theo rubric.",
    level: "Beginner",
    targetBand: "5.5",
    durationWeeks: 6,
    sessions: [
      {
        id: "ss_01",
        title: "Buổi 1 — Overview + Vocabulary Core",
        vocab: [
          {
            id: "v1",
            word: "significant",
            meaning: "đáng kể",
            example: "There was a significant increase...",
          },
          {
            id: "v2",
            word: "fluctuate",
            meaning: "dao động",
            example: "The figure fluctuated slightly.",
          },
        ],
        exercises: [
          {
            id: "e1",
            title: "Task 1: Describe line chart",
            link: "https://example.com/ex1",
          },
        ],
        notes:
          "Focus: overview sentence + trend verbs.\nHomework: rewrite 5 overview sentences.",
      },
      {
        id: "ss_02",
        title: "Buổi 2 — Task 2 Opinion Essay",
        vocab: [
          {
            id: "v3",
            word: "arguably",
            meaning: "có thể nói là",
            example: "Arguably, education is...",
          },
        ],
        exercises: [
          {
            id: "e2",
            title: "Task 2: Opinion structure",
            link: "https://example.com/ex2",
          },
        ],
        notes: "Focus: thesis statement + topic sentence.",
      },
    ],
  },
  {
    id: "crs_02",
    title: "IELTS Writing Intensive (Task 2)",
    description:
      "Luyện Task 2 chuyên sâu: idea generation, coherence, lexical resource theo band 6.5+.",
    level: "Intermediate",
    targetBand: "6.5",
    durationWeeks: 8,
    sessions: [
      {
        id: "ss_03",
        title: "Buổi 1 — Coherence & Cohesion",
        vocab: [],
        exercises: [],
        notes: "Use linking devices naturally. Avoid overuse.",
      },
    ],
  },
];

function MonoBlock({ value, onChange, placeholder }) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      multiline
      minRows={8}
      placeholder={placeholder}
      fullWidth
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2.5,
          bgcolor: "rgba(248,250,252,0.95)",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          fontSize: 13,
        },
      }}
    />
  );
}

function CourseMeta({ course }) {
  return (
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      <Chip
        icon={<MenuBookRoundedIcon />}
        label={`Level: ${course.level}`}
        sx={{ fontWeight: 900, borderRadius: 2 }}
      />
      <Chip
        icon={<LocalFireDepartmentRoundedIcon />}
        label={`Target band: ${course.targetBand}`}
        color="success"
        sx={{ fontWeight: 900, borderRadius: 2 }}
      />
      <Chip
        icon={<AutoAwesomeRoundedIcon />}
        label={`Duration: ${course.durationWeeks} weeks`}
        color="info"
        sx={{ fontWeight: 900, borderRadius: 2 }}
      />
      <Chip
        icon={<LibraryBooksRoundedIcon />}
        label={`${course.sessions?.length || 0} buổi`}
        sx={{ fontWeight: 900, borderRadius: 2 }}
      />
    </Stack>
  );
}

export default function TeacherCourses() {
  const [courses, setCourses] = useState(initialCourses);

  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const [selectedCourseId, setSelectedCourseId] = useState(
    courses[0]?.id || "",
  );
  const selectedCourse = useMemo(
    () => courses.find((c) => c.id === selectedCourseId),
    [courses, selectedCourseId],
  );

  // dialogs
  const [openCourseDialog, setOpenCourseDialog] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [openSessionDialog, setOpenSessionDialog] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  // session detail
  const [activeSessionId, setActiveSessionId] = useState("");
  const activeSession = useMemo(() => {
    if (!selectedCourse) return null;
    return (
      selectedCourse.sessions?.find((s) => s.id === activeSessionId) || null
    );
  }, [selectedCourse, activeSessionId]);

  const [materialTab, setMaterialTab] = useState(0); // 0 vocab, 1 ex, 2 notes

  const filteredCourses = useMemo(() => {
    let list = [...courses];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.title.toLowerCase().includes(q));
    }

    if (levelFilter !== "all") {
      list = list.filter((c) => c.level === levelFilter);
    }

    return list;
  }, [courses, search, levelFilter]);

  // -------- COURSE CRUD ----------
  const openCreateCourse = () => {
    setEditingCourse({
      id: "",
      title: "",
      description: "",
      level: "Beginner",
      targetBand: "5.5",
      durationWeeks: 6,
      sessions: [],
    });
    setOpenCourseDialog(true);
  };

  const openEditCourse = (course) => {
    setEditingCourse(JSON.parse(JSON.stringify(course)));
    setOpenCourseDialog(true);
  };

  const saveCourse = () => {
    if (!editingCourse.title.trim()) return;

    if (!editingCourse.id) {
      const newCourse = { ...editingCourse, id: `crs_${Date.now()}` };
      setCourses((prev) => [newCourse, ...prev]);
      setSelectedCourseId(newCourse.id);
    } else {
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? editingCourse : c)),
      );
    }

    setOpenCourseDialog(false);
  };

  const deleteCourse = (courseId) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    if (selectedCourseId === courseId) {
      const next = courses.find((c) => c.id !== courseId);
      setSelectedCourseId(next?.id || "");
      setActiveSessionId("");
    }
  };

  // -------- SESSION CRUD ----------
  const openCreateSession = () => {
    if (!selectedCourse) return;
    setEditingSession({
      id: "",
      title: "",
      vocab: [],
      exercises: [],
      notes: "",
    });
    setOpenSessionDialog(true);
  };

  const openEditSession = (session) => {
    setEditingSession(JSON.parse(JSON.stringify(session)));
    setOpenSessionDialog(true);
  };

  const saveSession = () => {
    if (!selectedCourse || !editingSession.title.trim()) return;

    const updated = JSON.parse(JSON.stringify(selectedCourse));

    if (!editingSession.id) {
      const newSession = { ...editingSession, id: `ss_${Date.now()}` };
      updated.sessions = [newSession, ...(updated.sessions || [])];
      setActiveSessionId(newSession.id);
    } else {
      updated.sessions = updated.sessions.map((s) =>
        s.id === editingSession.id ? editingSession : s,
      );
    }

    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setOpenSessionDialog(false);
  };

  const deleteSession = (sessionId) => {
    if (!selectedCourse) return;

    const updated = JSON.parse(JSON.stringify(selectedCourse));
    updated.sessions = updated.sessions.filter((s) => s.id !== sessionId);

    setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));

    if (activeSessionId === sessionId) setActiveSessionId("");
  };

  // -------- MATERIAL EDIT ----------
  const updateActiveSession = (patch) => {
    if (!selectedCourse || !activeSession) return;

    const updatedCourse = JSON.parse(JSON.stringify(selectedCourse));
    updatedCourse.sessions = updatedCourse.sessions.map((s) =>
      s.id === activeSession.id ? { ...s, ...patch } : s,
    );

    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)),
    );
  };

  return (
    <Fade in timeout={550}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          backgroundImage:
            "radial-gradient(1200px 520px at 15% 0%, rgba(14,165,233,0.14), transparent 60%), radial-gradient(900px 520px at 85% 10%, rgba(16,185,129,0.10), transparent 60%)",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="100%">
          {/* HEADER */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Stack direction="row" spacing={1.4} alignItems="center">
              <Avatar
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 3,
                  bgcolor: "rgba(14,165,233,0.12)",
                  color: PRIMARY,
                }}
              >
                <LibraryBooksRoundedIcon />
              </Avatar>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 950,
                    letterSpacing: -0.9,
                    lineHeight: 1.15,
                  }}
                >
                  Khóa học
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Quản lý khóa học và tài liệu theo buổi (vocabulary, bài
                  tập,...)
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.2} alignItems="center">
              <Button
                onClick={openCreateCourse}
                variant="contained"
                startIcon={<AddRoundedIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 2.5,
                  bgcolor: PRIMARY,
                  boxShadow: "0 14px 30px rgba(14,165,233,0.22)",
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                Thêm khóa học
              </Button>
            </Stack>
          </Stack>

          {/* MAIN GRID */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "420px 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
            {/* LEFT: COURSES LIST */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1.2}>
                  <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    placeholder="Tìm khóa học..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        bgcolor: "rgba(248,250,252,0.9)",
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <FormControl size="small">
                    <InputLabel>Level</InputLabel>
                    <Select
                      value={levelFilter}
                      label="Level"
                      onChange={(e) => setLevelFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Intermediate">Intermediate</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1.25}>
                  {filteredCourses.map((c) => {
                    const active = c.id === selectedCourseId;

                    return (
                      <Paper
                        key={c.id}
                        onClick={() => {
                          setSelectedCourseId(c.id);
                          setActiveSessionId("");
                          setMaterialTab(0);
                        }}
                        elevation={0}
                        sx={{
                          cursor: "pointer",
                          p: 1.4,
                          borderRadius: 2.5,
                          border: "1px solid",
                          borderColor: active
                            ? "rgba(14,165,233,0.35)"
                            : "divider",
                          bgcolor: active
                            ? "rgba(14,165,233,0.08)"
                            : "transparent",
                          transition: "all 0.18s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 18px 50px rgba(2,6,23,0.08)",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              borderRadius: 2.4,
                              bgcolor: "rgba(14,165,233,0.12)",
                              color: PRIMARY,
                              fontWeight: 900,
                            }}
                          >
                            {c.title.slice(0, 1).toUpperCase()}
                          </Avatar>

                          <Box sx={{ minWidth: 0, flex: 1 }}>
                            <Typography
                              sx={{
                                fontWeight: 950,
                                letterSpacing: -0.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {c.title}
                            </Typography>

                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {c.description}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <Tooltip title="Sửa khóa học">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openEditCourse(c);
                                }}
                                sx={{ borderRadius: 2 }}
                              >
                                <EditRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Xóa khóa học">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteCourse(c.id);
                                }}
                                sx={{ borderRadius: 2 }}
                              >
                                <DeleteRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ mt: 1, flexWrap: "wrap" }}
                        >
                          <Chip
                            size="small"
                            label={c.level}
                            sx={{ borderRadius: 2, fontWeight: 900 }}
                          />
                          <Chip
                            size="small"
                            color="success"
                            label={`Band ${c.targetBand}`}
                            sx={{ borderRadius: 2, fontWeight: 900 }}
                          />
                          <Chip
                            size="small"
                            label={`${c.durationWeeks}w`}
                            sx={{ borderRadius: 2, fontWeight: 900 }}
                          />
                        </Stack>
                      </Paper>
                    );
                  })}

                  {filteredCourses.length === 0 && (
                    <Alert severity="info" sx={{ borderRadius: 2 }}>
                      Không có khóa học phù hợp.
                    </Alert>
                  )}
                </Stack>
              </CardContent>
            </Card>

            {/* RIGHT: COURSE DETAIL */}
            <Stack spacing={2}>
              {!selectedCourse ? (
                <Alert severity="warning" sx={{ borderRadius: 3 }}>
                  Chưa chọn khóa học.
                </Alert>
              ) : (
                <>
                  {/* OVERVIEW */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1.5}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        justifyContent="space-between"
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: 950, letterSpacing: -0.6 }}
                          >
                            {selectedCourse.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mt: 0.5 }}
                          >
                            {selectedCourse.description}
                          </Typography>
                        </Box>

                        <Button
                          variant="outlined"
                          onClick={() => openEditCourse(selectedCourse)}
                          startIcon={<EditRoundedIcon />}
                          sx={{
                            textTransform: "none",
                            fontWeight: 900,
                            borderRadius: 2.5,
                          }}
                        >
                          Chỉnh sửa
                        </Button>
                      </Stack>

                      <Divider sx={{ my: 2 }} />

                      <CourseMeta course={selectedCourse} />
                    </CardContent>
                  </Card>

                  {/* SESSIONS */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(10px)",
                      overflow: "hidden",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1.5}
                        alignItems={{ xs: "stretch", md: "center" }}
                        justifyContent="space-between"
                        sx={{ mb: 1.5 }}
                      >
                        <Box>
                          <Typography
                            sx={{ fontWeight: 950, letterSpacing: -0.25 }}
                          >
                            Tài liệu theo buổi
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            Mỗi buổi có vocabulary, bài tập và notes.
                          </Typography>
                        </Box>

                        <Button
                          onClick={openCreateSession}
                          startIcon={<AddRoundedIcon />}
                          variant="contained"
                          sx={{
                            textTransform: "none",
                            fontWeight: 900,
                            borderRadius: 2.5,
                            bgcolor: PRIMARY,
                            "&:hover": { bgcolor: "#0284C7" },
                          }}
                        >
                          Thêm buổi
                        </Button>
                      </Stack>

                      <Divider sx={{ mb: 1.5 }} />

                      <Stack spacing={1}>
                        {(selectedCourse.sessions || []).map((s) => {
                          const isActive = s.id === activeSessionId;

                          return (
                            <Accordion
                              key={s.id}
                              expanded={isActive}
                              onChange={() =>
                                setActiveSessionId(isActive ? "" : s.id)
                              }
                              disableGutters
                              elevation={0}
                              sx={{
                                borderRadius: 2.5,
                                border: "1px solid",
                                borderColor: isActive
                                  ? "rgba(14,165,233,0.35)"
                                  : "divider",
                                overflow: "hidden",
                                "&:before": { display: "none" },
                              }}
                            >
                              {/* Header row: Summary (clickable) + Actions (not inside button) */}
                              <Box
                                sx={{ display: "flex", alignItems: "stretch" }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreRoundedIcon />}
                                  sx={{
                                    flex: 1,
                                    minHeight: 72,
                                    "& .MuiAccordionSummary-content": { my: 1 },
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ width: "100%" }}
                                  >
                                    <Avatar
                                      sx={{
                                        width: 34,
                                        height: 34,
                                        borderRadius: 2.2,
                                        bgcolor: "rgba(14,165,233,0.12)",
                                        color: PRIMARY,
                                      }}
                                    >
                                      <LibraryBooksRoundedIcon fontSize="small" />
                                    </Avatar>

                                    <Box sx={{ flex: 1, minWidth: 0 }}>
                                      <Typography
                                        sx={{
                                          fontWeight: 950,
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                          whiteSpace: "nowrap",
                                        }}
                                      >
                                        {s.title}
                                      </Typography>

                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ mt: 0.5 }}
                                      >
                                        <Chip
                                          size="small"
                                          icon={<MenuBookRoundedIcon />}
                                          label={`${s.vocab?.length || 0} từ`}
                                          sx={{
                                            borderRadius: 2,
                                            fontWeight: 900,
                                          }}
                                        />
                                        <Chip
                                          size="small"
                                          icon={<AssignmentRoundedIcon />}
                                          label={`${s.exercises?.length || 0} bài tập`}
                                          sx={{
                                            borderRadius: 2,
                                            fontWeight: 900,
                                          }}
                                        />
                                      </Stack>
                                    </Box>
                                  </Stack>
                                </AccordionSummary>

                                {/* Actions OUTSIDE Summary => no nested button */}
                                <Stack
                                  direction="row"
                                  spacing={0.5}
                                  alignItems="center"
                                  sx={{
                                    pr: 1,
                                    pl: 0.5,
                                    borderLeft: "1px solid",
                                    borderColor: "divider",
                                  }}
                                  onClick={(e) => e.stopPropagation()} // optional: click actions won't toggle
                                >
                                  <Tooltip title="Sửa buổi">
                                    <IconButton
                                      size="small"
                                      onClick={() => openEditSession(s)}
                                      sx={{ borderRadius: 2 }}
                                    >
                                      <EditRoundedIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>

                                  <Tooltip title="Xóa buổi">
                                    <IconButton
                                      size="small"
                                      onClick={() => deleteSession(s.id)}
                                      sx={{ borderRadius: 2 }}
                                    >
                                      <DeleteRoundedIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </Stack>
                              </Box>

                              <AccordionDetails sx={{ pt: 0 }}>
                                <Typography
                                  variant="body2"
                                  sx={{ color: "text.secondary" }}
                                >
                                  Chọn tab bên dưới để chỉnh sửa nội dung buổi
                                  học.
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}

                        {(selectedCourse.sessions || []).length === 0 && (
                          <Alert severity="info" sx={{ borderRadius: 2.5 }}>
                            Chưa có buổi học nào. Hãy bấm <b>Thêm buổi</b>.
                          </Alert>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* MATERIAL EDITOR */}
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "rgba(255,255,255,0.85)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Avatar
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: 2.4,
                            bgcolor: "rgba(14,165,233,0.12)",
                            color: PRIMARY,
                          }}
                        >
                          <NotesRoundedIcon />
                        </Avatar>
                        <Box>
                          <Typography
                            sx={{ fontWeight: 950, letterSpacing: -0.2 }}
                          >
                            Editor tài liệu
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            Typography monospace kiểu Linear/Notion.
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ mb: 1.5 }} />

                      {!activeSession ? (
                        <Alert severity="warning" sx={{ borderRadius: 2.5 }}>
                          Hãy chọn một buổi học để chỉnh sửa tài liệu.
                        </Alert>
                      ) : (
                        <>
                          <Tabs
                            value={materialTab}
                            onChange={(_, v) => setMaterialTab(v)}
                            sx={{
                              minHeight: 42,
                              "& .MuiTab-root": {
                                textTransform: "none",
                                fontWeight: 900,
                                minHeight: 42,
                              },
                            }}
                          >
                            <Tab
                              icon={<MenuBookRoundedIcon />}
                              iconPosition="start"
                              label="Vocabulary"
                            />
                            <Tab
                              icon={<AssignmentRoundedIcon />}
                              iconPosition="start"
                              label="Bài tập"
                            />
                            <Tab
                              icon={<NotesRoundedIcon />}
                              iconPosition="start"
                              label="Notes"
                            />
                          </Tabs>

                          <Divider sx={{ mb: 1.5 }} />

                          {materialTab === 0 && (
                            <Stack spacing={1.2}>
                              <Typography sx={{ fontWeight: 950 }}>
                                Vocabulary ({activeSession.vocab?.length || 0})
                              </Typography>

                              <MonoBlock
                                value={(activeSession.vocab || [])
                                  .map(
                                    (v) =>
                                      `- ${v.word} | ${v.meaning} | ${v.example}`,
                                  )
                                  .join("\n")}
                                onChange={(e) => {
                                  // demo: convert plain text -> array
                                  const lines = e.target.value
                                    .split("\n")
                                    .filter(Boolean);
                                  const newVocab = lines.map((line, idx) => {
                                    const clean = line.replace(/^- /, "");
                                    const parts = clean
                                      .split("|")
                                      .map((x) => x.trim());
                                    return {
                                      id: `v_${Date.now()}_${idx}`,
                                      word: parts[0] || "",
                                      meaning: parts[1] || "",
                                      example: parts[2] || "",
                                    };
                                  });
                                  updateActiveSession({ vocab: newVocab });
                                }}
                                placeholder="- word | meaning | example"
                              />
                            </Stack>
                          )}

                          {materialTab === 1 && (
                            <Stack spacing={1.2}>
                              <Typography sx={{ fontWeight: 950 }}>
                                Bài tập ({activeSession.exercises?.length || 0})
                              </Typography>

                              <MonoBlock
                                value={(activeSession.exercises || [])
                                  .map((ex) => `- ${ex.title} | ${ex.link}`)
                                  .join("\n")}
                                onChange={(e) => {
                                  const lines = e.target.value
                                    .split("\n")
                                    .filter(Boolean);
                                  const newExercises = lines.map(
                                    (line, idx) => {
                                      const clean = line.replace(/^- /, "");
                                      const parts = clean
                                        .split("|")
                                        .map((x) => x.trim());
                                      return {
                                        id: `e_${Date.now()}_${idx}`,
                                        title: parts[0] || "",
                                        link: parts[1] || "",
                                      };
                                    },
                                  );
                                  updateActiveSession({
                                    exercises: newExercises,
                                  });
                                }}
                                placeholder="- title | link"
                              />
                            </Stack>
                          )}

                          {materialTab === 2 && (
                            <Stack spacing={1.2}>
                              <Typography sx={{ fontWeight: 950 }}>
                                Notes
                              </Typography>

                              <MonoBlock
                                value={activeSession.notes || ""}
                                onChange={(e) =>
                                  updateActiveSession({ notes: e.target.value })
                                }
                                placeholder="Write notes here..."
                              />
                            </Stack>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>
                </>
              )}
            </Stack>
          </Box>
        </Container>

        {/* DIALOG: COURSE CRUD */}
        <Dialog
          open={openCourseDialog}
          onClose={() => setOpenCourseDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 950 }}>
            {editingCourse?.id ? "Sửa khóa học" : "Thêm khóa học"}
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={1.4} sx={{ mt: 1 }}>
              <TextField
                label="Tên khóa học"
                value={editingCourse?.title || ""}
                onChange={(e) =>
                  setEditingCourse((p) => ({ ...p, title: e.target.value }))
                }
                fullWidth
              />

              <TextField
                label="Mô tả khóa học"
                value={editingCourse?.description || ""}
                onChange={(e) =>
                  setEditingCourse((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                fullWidth
                multiline
                minRows={3}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
                <FormControl fullWidth>
                  <InputLabel>Level</InputLabel>
                  <Select
                    label="Level"
                    value={editingCourse?.level || "Beginner"}
                    onChange={(e) =>
                      setEditingCourse((p) => ({ ...p, level: e.target.value }))
                    }
                  >
                    <MenuItem value="Beginner">Beginner</MenuItem>
                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                    <MenuItem value="Advanced">Advanced</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Target band"
                  value={editingCourse?.targetBand || ""}
                  onChange={(e) =>
                    setEditingCourse((p) => ({
                      ...p,
                      targetBand: e.target.value,
                    }))
                  }
                  fullWidth
                />

                <TextField
                  label="Duration (weeks)"
                  type="number"
                  value={editingCourse?.durationWeeks || 0}
                  onChange={(e) =>
                    setEditingCourse((p) => ({
                      ...p,
                      durationWeeks: Number(e.target.value),
                    }))
                  }
                  fullWidth
                />
              </Stack>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setOpenCourseDialog(false)}
              sx={{ textTransform: "none", fontWeight: 900, borderRadius: 2 }}
            >
              Hủy
            </Button>
            <Button
              onClick={saveCourse}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 900,
                borderRadius: 2,
                bgcolor: PRIMARY,
                "&:hover": { bgcolor: "#0284C7" },
              }}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>

        {/* DIALOG: SESSION CRUD */}
        <Dialog
          open={openSessionDialog}
          onClose={() => setOpenSessionDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: 950 }}>
            {editingSession?.id ? "Sửa buổi học" : "Thêm buổi học"}
          </DialogTitle>

          <DialogContent sx={{ pt: 1 }}>
            <Stack spacing={1.4} sx={{ mt: 1 }}>
              <TextField
                label="Tên buổi"
                value={editingSession?.title || ""}
                onChange={(e) =>
                  setEditingSession((p) => ({ ...p, title: e.target.value }))
                }
                fullWidth
              />

              <Alert severity="info" sx={{ borderRadius: 2 }}>
                Sau khi tạo buổi, bạn chỉnh <b>Vocabulary / Bài tập / Notes</b>{" "}
                ở editor bên dưới.
              </Alert>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => setOpenSessionDialog(false)}
              sx={{ textTransform: "none", fontWeight: 900, borderRadius: 2 }}
            >
              Hủy
            </Button>
            <Button
              onClick={saveSession}
              variant="contained"
              sx={{
                textTransform: "none",
                fontWeight: 900,
                borderRadius: 2,
                bgcolor: PRIMARY,
                "&:hover": { bgcolor: "#0284C7" },
              }}
            >
              Lưu
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Fade>
  );
}
