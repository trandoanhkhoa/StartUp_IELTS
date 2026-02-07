import React, { useEffect, useMemo, useState } from "react";
import {
  alpha,
  Avatar,
  Box,
  Button,
  Card,
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
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Grid,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";

const PRIMARY = "#0EA5E9";

// ---------- helpers ----------
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
const uid = () => Math.random().toString(16).slice(2) + Date.now().toString(16);

const getInitials = (name = "") => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "S";
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
};

const StatCard = ({ icon, label, value, sub }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 2,
        bgcolor: "background.paper",
        transition: "all 0.18s ease",
        "&:hover": {
          borderColor: alpha(PRIMARY, 0.35),
          boxShadow: "0 10px 30px rgba(2,6,23,0.06)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.4,
            bgcolor: alpha(PRIMARY, 0.12),
            color: PRIMARY,
          }}
        >
          {icon}
        </Avatar>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontWeight: 800 }}
          >
            {label}
          </Typography>
          <Typography sx={{ fontWeight: 950, letterSpacing: -0.4 }}>
            {value}
          </Typography>
          {sub && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {sub}
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

const SectionTitle = ({ title, right }) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between">
    <Typography sx={{ fontWeight: 950, letterSpacing: -0.4, fontSize: 18 }}>
      {title}
    </Typography>
    {right}
  </Stack>
);

// ---------- mock data ----------
const MOCK_CLASSES = [
  { id: "c1", name: "IELTS Foundation A1" },
  { id: "c2", name: "IELTS Writing Intensive B2" },
  { id: "c3", name: "IELTS Advanced C1" },
];

const MOCK_STUDENTS = [
  {
    id: "s1",
    name: "Nguyễn Minh Anh",
    email: "minhanh@gmail.com",
    phone: "0901 234 567",
    status: "active",
    classIds: ["c2", "c3"],
    progress: 72,
    lastActivity: "2026-01-31",
    courses: [
      { id: "k1", name: "Writing Task 2 Mastery", status: "Đang học" },
      { id: "k2", name: "Vocabulary for Band 7+", status: "Hoàn thành" },
    ],
    assignments: [
      {
        id: "a1",
        title: "Task 2 - Opinion Essay",
        score: 6.5,
        date: "2026-01-29",
      },
      {
        id: "a2",
        title: "Task 1 - Line Graph",
        score: 7.0,
        date: "2026-01-30",
      },
    ],
  },
  {
    id: "s2",
    name: "Trần Quốc Huy",
    email: "huy.tran@gmail.com",
    phone: "0932 222 111",
    status: "active",
    classIds: ["c1"],
    progress: 38,
    lastActivity: "2026-01-25",
    courses: [{ id: "k3", name: "IELTS Basics", status: "Đang học" }],
    assignments: [
      { id: "a3", title: "Task 1 - Bar Chart", score: 5.5, date: "2026-01-20" },
    ],
  },
  {
    id: "s3",
    name: "Lê Thuỳ Linh",
    email: "linh.le@gmail.com",
    phone: "0988 555 444",
    status: "inactive",
    classIds: ["c2"],
    progress: 90,
    lastActivity: "2025-12-18",
    courses: [
      { id: "k4", name: "Writing Task 1 Bootcamp", status: "Hoàn thành" },
    ],
    assignments: [
      {
        id: "a4",
        title: "Task 2 - Discussion",
        score: 7.5,
        date: "2025-12-15",
      },
    ],
  },
];

// ---------- dialogs ----------
function StudentFormDialog({ open, onClose, onSubmit, classes, initial }) {
  const isEdit = !!initial?.id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    classIds: [],
  });

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setForm({
        name: initial.name || "",
        email: initial.email || "",
        phone: initial.phone || "",
        status: initial.status || "active",
        classIds: initial.classIds || [],
      });
    } else {
      setForm({
        name: "",
        email: "",
        phone: "",
        status: "active",
        classIds: [],
      });
    }
  }, [open, initial]);

  const update = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 30px 80px rgba(2,6,23,0.16)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 950 }}>
        {isEdit ? "Sửa học sinh" : "Thêm học sinh"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          <TextField
            label="Họ tên"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            fullWidth
            autoFocus
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            fullWidth
          />
          <TextField
            label="Số điện thoại"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            fullWidth
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <FormControl fullWidth size="small">
              <Typography
                variant="caption"
                sx={{ mb: 0.5, color: "text.secondary", fontWeight: 800 }}
              >
                Trạng thái
              </Typography>
              <Select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="active">Đang học</MenuItem>
                <MenuItem value="inactive">Ngừng</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <Typography
                variant="caption"
                sx={{ mb: 0.5, color: "text.secondary", fontWeight: 800 }}
              >
                Lớp
              </Typography>
              <Select
                multiple
                value={form.classIds}
                onChange={(e) => update("classIds", e.target.value)}
                renderValue={(selected) => (
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {selected.map((id) => (
                      <Chip
                        key={id}
                        size="small"
                        label={classes.find((c) => c.id === id)?.name || id}
                        sx={{ borderRadius: 2, fontWeight: 800 }}
                      />
                    ))}
                  </Stack>
                )}
                sx={{ borderRadius: 2 }}
              >
                {classes.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit(form)}
          disabled={!form.name.trim()}
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: 2,
            fontWeight: 900,
            textTransform: "none",
            bgcolor: PRIMARY,
            "&:hover": { bgcolor: PRIMARY },
          }}
        >
          {isEdit ? "Lưu" : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SettingsDialog({ open, onClose, settings, setSettings }) {
  const toggle = (k) => setSettings((p) => ({ ...p, [k]: !p[k] }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 950 }}>Cài đặt bảng</DialogTitle>
      <DialogContent>
        <Stack spacing={0.5} sx={{ pt: 1 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.showEmail}
                onChange={() => toggle("showEmail")}
              />
            }
            label="Hiển thị Email"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.showPhone}
                onChange={() => toggle("showPhone")}
              />
            }
            label="Hiển thị Số điện thoại"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.showClasses}
                onChange={() => toggle("showClasses")}
              />
            }
            label="Hiển thị Lớp"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.showProgress}
                onChange={() => toggle("showProgress")}
              />
            }
            label="Hiển thị Progress"
          />
          <FormControlLabel
            control={
              <Switch
                checked={settings.showLastActivity}
                onChange={() => toggle("showLastActivity")}
              />
            }
            label="Hiển thị Last activity"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ---------- drawer ----------
function StudentDetailDrawer({ open, onClose, student, classes }) {
  const [tab, setTab] = useState(0);

  useEffect(() => {
    if (open) setTab(0);
  }, [open]);

  const classChips = useMemo(() => {
    if (!student) return [];
    return (student.classIds || []).map(
      (id) => classes.find((c) => c.id === id)?.name || id,
    );
  }, [student, classes]);

  if (!student) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 520 },
          borderLeft: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography sx={{ fontWeight: 950, letterSpacing: -0.3 }}>
            Chi tiết học sinh
          </Typography>
          <IconButton onClick={onClose} sx={{ borderRadius: 2 }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>

        <Card
          elevation={0}
          sx={{
            mt: 2,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "divider",
            p: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                bgcolor: alpha(PRIMARY, 0.12),
                color: PRIMARY,
                fontWeight: 950,
              }}
            >
              {getInitials(student.name)}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 950, fontSize: 18 }}>
                {student.name}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 0.5 }}
                flexWrap="wrap"
              >
                <Chip
                  size="small"
                  label={student.status === "active" ? "Đang học" : "Ngừng"}
                  color={student.status === "active" ? "success" : "default"}
                  sx={{ borderRadius: 2, fontWeight: 900 }}
                />
                {classChips.slice(0, 3).map((c) => (
                  <Chip
                    key={c}
                    size="small"
                    label={c}
                    sx={{ borderRadius: 2, fontWeight: 800 }}
                  />
                ))}
              </Stack>

              <Stack spacing={0.5} sx={{ mt: 1.2 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmailRoundedIcon fontSize="small" />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {student.email || "-"}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <PhoneRoundedIcon fontSize="small" />
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {student.phone || "-"}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>

          <Box sx={{ mt: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 900 }}
            >
              Progress
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box sx={{ flex: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={clamp(student.progress || 0, 0, 100)}
                  sx={{
                    height: 10,
                    borderRadius: 99,
                    bgcolor: alpha(PRIMARY, 0.12),
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 99,
                      bgcolor: PRIMARY,
                    },
                  }}
                />
              </Box>
              <Typography
                sx={{ fontWeight: 950, minWidth: 44, textAlign: "right" }}
              >
                {clamp(student.progress || 0, 0, 100)}%
              </Typography>
            </Stack>
          </Box>
        </Card>

        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          sx={{
            mt: 2,
            "& .MuiTab-root": { textTransform: "none", fontWeight: 900 },
          }}
        >
          <Tab
            icon={<ClassRoundedIcon />}
            iconPosition="start"
            label="Lớp học"
          />
          <Tab
            icon={<SchoolRoundedIcon />}
            iconPosition="start"
            label="Khóa học"
          />
          <Tab
            icon={<AssignmentRoundedIcon />}
            iconPosition="start"
            label="Bài tập"
          />
        </Tabs>

        <Divider sx={{ mb: 2 }} />

        {tab === 0 && (
          <Stack spacing={1.2}>
            {(student.classIds || []).length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Chưa tham gia lớp nào.
              </Typography>
            ) : (
              (student.classIds || []).map((id) => {
                const c = classes.find((x) => x.id === id);
                return (
                  <Card
                    key={id}
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      p: 1.5,
                      transition: "all .15s ease",
                      "&:hover": {
                        borderColor: alpha(PRIMARY, 0.35),
                        boxShadow: "0 12px 26px rgba(2,6,23,0.06)",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: 950 }}>
                      {c?.name || id}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      Trạng thái:{" "}
                      {student.status === "active" ? "Đang học" : "Ngừng"}
                    </Typography>
                  </Card>
                );
              })
            )}
          </Stack>
        )}

        {tab === 1 && (
          <Stack spacing={1.2}>
            {(student.courses || []).length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Chưa có khóa học.
              </Typography>
            ) : (
              student.courses.map((k) => (
                <Card
                  key={k.id}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.5,
                  }}
                >
                  <Typography sx={{ fontWeight: 950 }}>{k.name}</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {k.status}
                  </Typography>
                </Card>
              ))
            )}
          </Stack>
        )}

        {tab === 2 && (
          <Stack spacing={1.2}>
            {(student.assignments || []).length === 0 ? (
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Chưa có bài tập.
              </Typography>
            ) : (
              student.assignments.map((a) => (
                <Card
                  key={a.id}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.5,
                  }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography sx={{ fontWeight: 950 }}>{a.title}</Typography>
                    <Chip
                      size="small"
                      label={`Band ${a.score}`}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 950,
                        bgcolor: alpha(PRIMARY, 0.12),
                        color: PRIMARY,
                      }}
                    />
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Nộp ngày: {a.date}
                  </Typography>
                </Card>
              ))
            )}
          </Stack>
        )}
      </Box>
    </Drawer>
  );
}

// ---------- main page ----------
export default function TeacherStudentsPage() {
  const [classes] = useState(MOCK_CLASSES);
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const [query, setQuery] = useState("");
  const [filterClassId, setFilterClassId] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    showEmail: true,
    showPhone: true,
    showClasses: true,
    showProgress: true,
    showLastActivity: true,
  });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();

    let data = [...students];

    if (q) {
      data = data.filter((s) => {
        const hay = `${s.name} ${s.email} ${s.phone}`.toLowerCase();
        return hay.includes(q);
      });
    }

    if (filterClassId !== "all") {
      data = data.filter((s) => (s.classIds || []).includes(filterClassId));
    }

    if (filterStatus !== "all") {
      data = data.filter((s) => s.status === filterStatus);
    }

    data.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "join") return (a.id || "").localeCompare(b.id || "");
      if (sortBy === "progress") return (b.progress || 0) - (a.progress || 0);
      return 0;
    });

    return data;
  }, [students, query, filterClassId, filterStatus, sortBy]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "active").length;
    const assignments = students.reduce(
      (sum, s) => sum + (s.assignments?.length || 0),
      0,
    );
    return { total, active, assignments };
  }, [students]);

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (student) => {
    setEditing(student);
    setFormOpen(true);
  };

  const submitForm = (form) => {
    if (editing?.id) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editing.id ? { ...s, ...form } : s)),
      );
    } else {
      setStudents((prev) => [
        {
          id: uid(),
          ...form,
          progress: 0,
          lastActivity: new Date().toISOString().slice(0, 10),
          courses: [],
          assignments: [],
        },
        ...prev,
      ]);
    }
    setFormOpen(false);
    setEditing(null);
  };

  const deleteStudent = (id) => {
    if (!window.confirm("Xóa học sinh này?")) return;
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const openDetail = (student) => {
    setSelected(student);
    setDetailOpen(true);
  };

  return (
    <Fade in timeout={450}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          py: 4,
        }}
      >
        <Container maxWidth="100%">
          {/* Header */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="space-between"
            sx={{ mb: 2.5 }}
          >
            <Box>
              <Typography
                sx={{ fontWeight: 1000, fontSize: 28, letterSpacing: -0.6 }}
              >
                Học sinh
              </Typography>
              <Typography sx={{ color: "text.secondary", fontWeight: 700 }}>
                Danh sách học sinh • xem/sửa/xóa • filter theo lớp
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <Tooltip title="Cài đặt bảng">
                <IconButton
                  onClick={() => setSettingsOpen(true)}
                  sx={{
                    borderRadius: 2.2,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                  }}
                >
                  <SettingsRoundedIcon />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={openAdd}
                sx={{
                  borderRadius: 2.2,
                  fontWeight: 950,
                  textTransform: "none",
                  bgcolor: PRIMARY,
                  "&:hover": { bgcolor: PRIMARY },
                  boxShadow: "0 18px 40px rgba(14,165,233,0.22)",
                }}
              >
                Thêm học sinh
              </Button>
            </Stack>
          </Stack>

          {/* Stats */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                icon={<SchoolRoundedIcon />}
                label="Tổng số học sinh"
                value={stats.total}
                sub="All students"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                icon={<ClassRoundedIcon />}
                label="Đang học"
                value={stats.active}
                sub="Active"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StatCard
                icon={<AssignmentRoundedIcon />}
                label="Bài tập đã nộp"
                value={stats.assignments}
                sub="Assignments"
              />
            </Grid>
          </Grid>

          {/* Filters */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              p: 2,
              mb: 2,
              bgcolor: "background.paper",
            }}
          >
            <Stack spacing={1.5}>
              <SectionTitle title="Bộ lọc" />

              <Stack direction={{ xs: "column", md: "row" }} spacing={1.5}>
                <TextField
                  placeholder="Tìm học sinh theo tên / email / phone..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3 },
                  }}
                />

                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={filterClassId}
                    onChange={(e) => setFilterClassId(e.target.value)}
                    sx={{ borderRadius: 3 }}
                  >
                    <MenuItem value="all">Tất cả lớp</MenuItem>
                    {classes.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    sx={{ borderRadius: 3 }}
                  >
                    <MenuItem value="all">Tất cả trạng thái</MenuItem>
                    <MenuItem value="active">Đang học</MenuItem>
                    <MenuItem value="inactive">Ngừng</MenuItem>
                  </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ borderRadius: 3 }}
                  >
                    <MenuItem value="name">Sort: Name</MenuItem>
                    <MenuItem value="progress">Sort: Progress</MenuItem>
                    <MenuItem value="join">Sort: Join</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </Card>

          {/* Table */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              overflow: "hidden",
              bgcolor: "background.paper",
            }}
          >
            <Box sx={{ p: 2 }}>
              <SectionTitle
                title={`Danh sách học sinh (${filteredStudents.length})`}
                right={
                  <Chip
                    label="Notion / Linear UI"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 950,
                      bgcolor: alpha(PRIMARY, 0.12),
                      color: PRIMARY,
                    }}
                  />
                }
              />
            </Box>

            <Divider />

            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#F9FAFB" }}>
                    <TableCell sx={{ fontWeight: 950 }}>Học sinh</TableCell>
                    {settings.showEmail && (
                      <TableCell sx={{ fontWeight: 950 }}>Email</TableCell>
                    )}
                    {settings.showPhone && (
                      <TableCell sx={{ fontWeight: 950 }}>SĐT</TableCell>
                    )}
                    {settings.showClasses && (
                      <TableCell sx={{ fontWeight: 950 }}>Lớp</TableCell>
                    )}
                    {settings.showProgress && (
                      <TableCell sx={{ fontWeight: 950, width: 220 }}>
                        Progress
                      </TableCell>
                    )}
                    {settings.showLastActivity && (
                      <TableCell sx={{ fontWeight: 950 }}>
                        Last activity
                      </TableCell>
                    )}
                    <TableCell
                      sx={{ fontWeight: 950, width: 170 }}
                      align="right"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredStudents.map((s) => {
                    const classNames = (s.classIds || []).map(
                      (id) => classes.find((c) => c.id === id)?.name || id,
                    );

                    return (
                      <TableRow
                        key={s.id}
                        hover
                        sx={{
                          transition: "all .15s ease",
                          "&:hover": { bgcolor: alpha(PRIMARY, 0.04) },
                        }}
                      >
                        <TableCell>
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
                                bgcolor: alpha(PRIMARY, 0.12),
                                color: PRIMARY,
                                fontWeight: 950,
                              }}
                            >
                              {getInitials(s.name)}
                            </Avatar>

                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{ fontWeight: 950, lineHeight: 1.2 }}
                              >
                                {s.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  fontWeight: 800,
                                }}
                              >
                                {s.status === "active" ? "Đang học" : "Ngừng"}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        {settings.showEmail && (
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {s.email}
                            </Typography>
                          </TableCell>
                        )}

                        {settings.showPhone && (
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {s.phone}
                            </Typography>
                          </TableCell>
                        )}

                        {settings.showClasses && (
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={0.6}
                              flexWrap="wrap"
                            >
                              {classNames.slice(0, 2).map((name) => (
                                <Chip
                                  key={name}
                                  size="small"
                                  label={name}
                                  sx={{ borderRadius: 2, fontWeight: 850 }}
                                />
                              ))}
                              {classNames.length > 2 && (
                                <Chip
                                  size="small"
                                  label={`+${classNames.length - 2}`}
                                  sx={{
                                    borderRadius: 2,
                                    fontWeight: 950,
                                    bgcolor: alpha(PRIMARY, 0.12),
                                    color: PRIMARY,
                                  }}
                                />
                              )}
                            </Stack>
                          </TableCell>
                        )}

                        {settings.showProgress && (
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                            >
                              <Box sx={{ flex: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={clamp(s.progress || 0, 0, 100)}
                                  sx={{
                                    height: 10,
                                    borderRadius: 99,
                                    bgcolor: alpha(PRIMARY, 0.12),
                                    "& .MuiLinearProgress-bar": {
                                      borderRadius: 99,
                                      bgcolor: PRIMARY,
                                    },
                                  }}
                                />
                              </Box>
                              <Typography
                                sx={{
                                  fontWeight: 950,
                                  minWidth: 44,
                                  textAlign: "right",
                                }}
                              >
                                {clamp(s.progress || 0, 0, 100)}%
                              </Typography>
                            </Stack>
                          </TableCell>
                        )}

                        {settings.showLastActivity && (
                          <TableCell>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {s.lastActivity || "-"}
                            </Typography>
                          </TableCell>
                        )}

                        <TableCell align="right">
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="flex-end"
                          >
                            <Tooltip title="Xem chi tiết">
                              <IconButton
                                size="small"
                                onClick={() => openDetail(s)}
                                sx={{ borderRadius: 2 }}
                              >
                                <VisibilityRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Sửa">
                              <IconButton
                                size="small"
                                onClick={() => openEdit(s)}
                                sx={{ borderRadius: 2 }}
                              >
                                <EditRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>

                            <Tooltip title="Xóa">
                              <IconButton
                                size="small"
                                onClick={() => deleteStudent(s.id)}
                                sx={{ borderRadius: 2 }}
                              >
                                <DeleteRoundedIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  {filteredStudents.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={20}>
                        <Box sx={{ py: 6, textAlign: "center" }}>
                          <Typography sx={{ fontWeight: 950 }}>
                            Không có học sinh nào
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            Thử đổi filter hoặc thêm học sinh mới.
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* dialogs/drawer */}
          <StudentFormDialog
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={submitForm}
            classes={classes}
            initial={editing}
          />

          <SettingsDialog
            open={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            settings={settings}
            setSettings={setSettings}
          />

          <StudentDetailDrawer
            open={detailOpen}
            onClose={() => setDetailOpen(false)}
            student={selected}
            classes={classes}
          />
        </Container>
      </Box>
    </Fade>
  );
}
