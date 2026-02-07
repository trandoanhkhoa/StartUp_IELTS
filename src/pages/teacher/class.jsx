import React, { useMemo, useState } from "react";
import {
  Avatar,
  Badge,
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
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const PRIMARY = "#0EA5E9";

const STATUS_META = {
  active: {
    label: "Đang học",
    color: "success",
    icon: <AccessTimeRoundedIcon />,
  },
  upcoming: {
    label: "Sắp khai giảng",
    color: "warning",
    icon: <CalendarMonthRoundedIcon />,
  },
  ended: {
    label: "Đã kết thúc",
    color: "default",
    icon: <CheckCircleRoundedIcon />,
  },
};

const mockCourses = [
  { id: "c1", name: "IELTS Foundation", desc: "Nền tảng Writing + Vocabulary" },
  {
    id: "c2",
    name: "IELTS Writing Task 2",
    desc: "Argument / Opinion / Discussion",
  },
  { id: "c3", name: "IELTS Writing Task 1", desc: "Charts / Process / Maps" },
];

const mockStudents = [
  { id: "s1", name: "Nguyễn Văn A", email: "a@gmail.com" },
  { id: "s2", name: "Trần Thị B", email: "b@gmail.com" },
  { id: "s3", name: "Lê Văn C", email: "c@gmail.com" },
  { id: "s4", name: "Phạm Thị D", email: "d@gmail.com" },
  { id: "s5", name: "Hoàng Văn E", email: "e@gmail.com" },
];

const mockClasses = [
  {
    id: "cl1",
    name: "Lớp Writing K12",
    courseId: "c2",
    status: "active",
    studentsCount: 18,
    startDate: "2026-01-05",
    endDate: "2026-03-15",
    sessionsCompleted: 6,
    sessionsTotal: 12,
  },
  {
    id: "cl2",
    name: "IELTS Basic 01",
    courseId: "c1",
    status: "upcoming",
    studentsCount: 25,
    startDate: "2026-02-10",
    endDate: "2026-04-20",
    sessionsCompleted: 0,
    sessionsTotal: 16,
  },
  {
    id: "cl3",
    name: "Task 1 Intensive",
    courseId: "c3",
    status: "ended",
    studentsCount: 14,
    startDate: "2025-11-01",
    endDate: "2025-12-20",
    sessionsCompleted: 10,
    sessionsTotal: 10,
  },
];

function formatDate(d) {
  // yyyy-mm-dd -> dd/mm/yyyy
  if (!d) return "-";
  const [y, m, day] = d.split("-");
  return `${day}/${m}/${y}`;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getProgressPct(done, total) {
  if (!total) return 0;
  return clamp(Math.round((done / total) * 100), 0, 100);
}

function StatCard({ icon, label, value }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#fff",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 18px 40px rgba(2,6,23,0.06)",
          borderColor: "rgba(14,165,233,0.25)",
        },
      }}
    >
      <CardContent sx={{ p: 2.2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2.2,
              bgcolor: "rgba(14,165,233,0.12)",
              color: PRIMARY,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 900, letterSpacing: -0.2 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {label}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function ClassCard({ data, courseName, onEdit, onDelete }) {
  const meta = STATUS_META[data.status] || STATUS_META.active;
  const pct = getProgressPct(data.sessionsCompleted, data.sessionsTotal);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "#fff",
        overflow: "hidden",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 18px 40px rgba(2,6,23,0.06)",
          borderColor: "rgba(14,165,233,0.25)",
        },
      }}
    >
      <CardContent sx={{ p: 2.2 }}>
        <Stack direction="row" alignItems="flex-start" spacing={1.2}>
          <Avatar
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2.2,
              bgcolor: "rgba(14,165,233,0.12)",
              color: PRIMARY,
            }}
          >
            <SchoolRoundedIcon fontSize="small" />
          </Avatar>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                sx={{
                  fontWeight: 950,
                  letterSpacing: -0.2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {data.name}
              </Typography>

              <Chip
                size="small"
                icon={meta.icon}
                label={meta.label}
                color={meta.color}
                sx={{ fontWeight: 900, borderRadius: 2 }}
              />
            </Stack>

            <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap">
              <Chip
                size="small"
                label={courseName}
                sx={{
                  borderRadius: 2,
                  fontWeight: 900,
                  bgcolor: "rgba(2,6,23,0.04)",
                }}
              />
              <Chip
                size="small"
                icon={<GroupsRoundedIcon />}
                label={`${data.studentsCount} học sinh`}
                sx={{ borderRadius: 2, fontWeight: 900 }}
              />
              <Chip
                size="small"
                icon={<CalendarMonthRoundedIcon />}
                label={`${formatDate(data.startDate)} - ${formatDate(data.endDate)}`}
                sx={{ borderRadius: 2, fontWeight: 900 }}
              />
            </Stack>

            <Box sx={{ mt: 1.6 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 0.7 }}
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Tiến độ buổi học
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 900,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  }}
                >
                  {data.sessionsCompleted}/{data.sessionsTotal}
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={pct}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: "rgba(2,6,23,0.06)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    bgcolor: PRIMARY,
                  },
                }}
              />
            </Box>
          </Box>

          <Stack direction="row" spacing={0.5} sx={{ opacity: 0.9 }}>
            <Tooltip title="Sửa lớp">
              <IconButton
                size="small"
                onClick={onEdit}
                sx={{ borderRadius: 2 }}
              >
                <EditRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa lớp">
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{ borderRadius: 2 }}
              >
                <DeleteRoundedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function AddClassDialog({ open, onClose, courses, students, onCreate }) {
  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState(courses?.[0]?.id || "");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  const reset = () => {
    setName("");
    setCourseId(courses?.[0]?.id || "");
    setStartDate("");
    setEndDate("");
    setSelectedStudents([]);
  };

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate?.({
      id: `cl_${Date.now()}`,
      name: name.trim(),
      courseId,
      status: "upcoming",
      studentsCount: selectedStudents.length,
      startDate,
      endDate,
      sessionsCompleted: 0,
      sessionsTotal: 12,
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 950, letterSpacing: -0.2 }}>
        Thêm lớp học
      </DialogTitle>

      <DialogContent dividers sx={{ bgcolor: "rgba(2,6,23,0.01)" }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>
              Thông tin lớp
            </Typography>
            <Stack spacing={1.5}>
              <TextField
                label="Tên lớp"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: IELTS Writing K12"
                fullWidth
              />

              <FormControl fullWidth>
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", mb: 0.5 }}
                >
                  Khóa học
                </Typography>
                <Select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  {courses.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      <Stack>
                        <Typography sx={{ fontWeight: 900 }}>
                          {c.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          {c.desc}
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                <TextField
                  label="Ngày khai giảng"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <TextField
                  label="Ngày kết thúc"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography sx={{ fontWeight: 900, mb: 1 }}>
              Thêm học sinh
            </Typography>

            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fff",
                p: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Chọn học sinh vào lớp (demo)
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1}>
                {students.map((st) => {
                  const selected = selectedStudents.includes(st.id);
                  return (
                    <Chip
                      key={st.id}
                      clickable
                      onClick={() => {
                        setSelectedStudents((prev) =>
                          selected
                            ? prev.filter((x) => x !== st.id)
                            : [...prev, st.id],
                        );
                      }}
                      label={st.name}
                      variant={selected ? "filled" : "outlined"}
                      sx={{
                        borderRadius: 2,
                        fontWeight: 900,
                        ...(selected && {
                          bgcolor: "rgba(14,165,233,0.12)",
                          borderColor: "rgba(14,165,233,0.35)",
                          color: "rgba(2,6,23,0.9)",
                        }),
                      }}
                    />
                  );
                })}
              </Stack>

              <Divider sx={{ my: 1.5 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Đã chọn
                </Typography>
                <Badge
                  badgeContent={selectedStudents.length}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: PRIMARY,
                      fontWeight: 900,
                    },
                  }}
                />
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 2, fontWeight: 900 }}>
          Hủy
        </Button>
        <Button
          onClick={handleCreate}
          variant="contained"
          startIcon={<AddRoundedIcon />}
          sx={{
            borderRadius: 2,
            fontWeight: 950,
            bgcolor: PRIMARY,
            "&:hover": { bgcolor: PRIMARY },
          }}
        >
          Tạo lớp
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState(mockClasses);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all/active/upcoming/ended
  const [sort, setSort] = useState("start_desc");
  const [view, setView] = useState("grid"); // grid/list

  const [openAdd, setOpenAdd] = useState(false);

  const courseMap = useMemo(() => {
    const m = {};
    mockCourses.forEach((c) => (m[c.id] = c));
    return m;
  }, []);

  const filtered = useMemo(() => {
    let arr = [...classes];

    if (status !== "all") {
      arr = arr.filter((x) => x.status === status);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter((x) => {
        const courseName = courseMap[x.courseId]?.name || "";
        return (
          x.name.toLowerCase().includes(q) ||
          courseName.toLowerCase().includes(q)
        );
      });
    }

    if (sort === "start_desc") {
      arr.sort((a, b) => (b.startDate || "").localeCompare(a.startDate || ""));
    }
    if (sort === "start_asc") {
      arr.sort((a, b) => (a.startDate || "").localeCompare(b.startDate || ""));
    }
    if (sort === "students_desc") {
      arr.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
    }
    if (sort === "progress_desc") {
      arr.sort((a, b) => {
        const pa = getProgressPct(a.sessionsCompleted, a.sessionsTotal);
        const pb = getProgressPct(b.sessionsCompleted, b.sessionsTotal);
        return pb - pa;
      });
    }

    return arr;
  }, [classes, search, status, sort, courseMap]);

  const stats = useMemo(() => {
    const totalClasses = classes.length;
    const activeClasses = classes.filter((c) => c.status === "active").length;
    const totalStudents = classes.reduce(
      (sum, c) => sum + (c.studentsCount || 0),
      0,
    );
    return { totalClasses, activeClasses, totalStudents };
  }, [classes]);

  return (
    <Fade in timeout={450}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 5 }}>
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
                variant="h4"
                sx={{
                  fontWeight: 1000,
                  letterSpacing: -0.6,
                  fontFamily:
                    "Inter, system-ui, -apple-system, Segoe UI, Roboto",
                }}
              >
                Lớp học
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mt: 0.5 }}
              >
                Quản lý lớp đang dạy, tiến độ số buổi & danh sách học sinh.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                placeholder="Tìm theo tên lớp hoặc khóa học..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                size="small"
                sx={{
                  width: { xs: "100%", sm: 360 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2.5,
                    bgcolor: "#fff",
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

              <Tooltip title="Cài đặt hiển thị">
                <IconButton
                  sx={{
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "#fff",
                  }}
                >
                  <SettingsRoundedIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => setOpenAdd(true)}
                sx={{
                  borderRadius: 2.5,
                  fontWeight: 950,
                  bgcolor: PRIMARY,
                  px: 2,
                  "&:hover": { bgcolor: PRIMARY },
                }}
              >
                Thêm lớp
              </Button>
            </Stack>
          </Stack>

          {/* Stats */}
          <Grid container spacing={2} sx={{ mb: 2.5 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                icon={<SchoolRoundedIcon fontSize="small" />}
                label="Tổng số lớp"
                value={stats.totalClasses}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                icon={<AccessTimeRoundedIcon fontSize="small" />}
                label="Lớp đang học"
                value={stats.activeClasses}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <StatCard
                icon={<GroupsRoundedIcon fontSize="small" />}
                label="Tổng học sinh"
                value={stats.totalStudents}
              />
            </Grid>
          </Grid>

          {/* Filters */}
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "#fff",
              mb: 2.5,
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1.5}
                alignItems={{ xs: "stretch", md: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 900, color: "text.secondary" }}
                  >
                    Trạng thái
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 170 }}>
                    <Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="active">Đang học</MenuItem>
                      <MenuItem value="upcoming">Sắp khai giảng</MenuItem>
                      <MenuItem value="ended">Đã kết thúc</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 900, color: "text.secondary" }}
                  >
                    Sắp xếp
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 200 }}>
                    <Select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="start_desc">
                        Ngày khai giảng (mới nhất)
                      </MenuItem>
                      <MenuItem value="start_asc">
                        Ngày khai giảng (cũ nhất)
                      </MenuItem>
                      <MenuItem value="students_desc">
                        Số học sinh (giảm dần)
                      </MenuItem>
                      <MenuItem value="progress_desc">
                        Tiến độ (cao nhất)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Box sx={{ flex: 1 }} />

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Tooltip title="Grid view">
                    <IconButton
                      onClick={() => setView("grid")}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor:
                          view === "grid" ? "rgba(14,165,233,0.35)" : "divider",
                        bgcolor:
                          view === "grid" ? "rgba(14,165,233,0.10)" : "#fff",
                      }}
                    >
                      <GridViewRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List view">
                    <IconButton
                      onClick={() => setView("list")}
                      sx={{
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor:
                          view === "list" ? "rgba(14,165,233,0.35)" : "divider",
                        bgcolor:
                          view === "list" ? "rgba(14,165,233,0.10)" : "#fff",
                      }}
                    >
                      <ViewListRoundedIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Content */}
          {view === "grid" ? (
            <Grid container spacing={2}>
              {filtered.map((cl) => (
                <Grid key={cl.id} size={{ xs: 12, md: 6 }}>
                  <ClassCard
                    data={cl}
                    courseName={courseMap[cl.courseId]?.name || "—"}
                    onEdit={() => alert("Edit (demo)")}
                    onDelete={() => {
                      if (confirm(`Xóa lớp "${cl.name}"?`)) {
                        setClasses((prev) =>
                          prev.filter((x) => x.id !== cl.id),
                        );
                      }
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "#fff",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack spacing={1}>
                  {filtered.map((cl, idx) => {
                    const meta = STATUS_META[cl.status] || STATUS_META.active;
                    const pct = getProgressPct(
                      cl.sessionsCompleted,
                      cl.sessionsTotal,
                    );

                    return (
                      <Box
                        key={cl.id}
                        sx={{
                          p: 1.5,
                          borderRadius: 2.5,
                          border: "1px solid",
                          borderColor: "divider",
                          transition: "all 0.15s ease",
                          "&:hover": {
                            borderColor: "rgba(14,165,233,0.25)",
                            boxShadow: "0 14px 30px rgba(2,6,23,0.05)",
                          },
                        }}
                      >
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={1.5}
                          alignItems={{ md: "center" }}
                        >
                          <Typography
                            sx={{
                              width: 40,
                              fontWeight: 950,
                              color: "text.secondary",
                              fontFamily:
                                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                            }}
                          >
                            #{idx + 1}
                          </Typography>

                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography sx={{ fontWeight: 950 }}>
                              {cl.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              {courseMap[cl.courseId]?.name || "—"} •{" "}
                              {cl.studentsCount} học sinh
                            </Typography>
                          </Box>

                          <Chip
                            size="small"
                            icon={meta.icon}
                            label={meta.label}
                            color={meta.color}
                            sx={{ fontWeight: 900, borderRadius: 2 }}
                          />

                          <Box sx={{ width: 200 }}>
                            <Stack
                              direction="row"
                              justifyContent="space-between"
                              sx={{ mb: 0.6 }}
                            >
                              <Typography
                                variant="caption"
                                sx={{ color: "text.secondary" }}
                              >
                                {cl.sessionsCompleted}/{cl.sessionsTotal} buổi
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 900,
                                  fontFamily:
                                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                                }}
                              >
                                {pct}%
                              </Typography>
                            </Stack>
                            <LinearProgress
                              variant="determinate"
                              value={pct}
                              sx={{
                                height: 7,
                                borderRadius: 999,
                                bgcolor: "rgba(2,6,23,0.06)",
                                "& .MuiLinearProgress-bar": {
                                  borderRadius: 999,
                                  bgcolor: PRIMARY,
                                },
                              }}
                            />
                          </Box>

                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => alert("Edit (demo)")}
                            >
                              <EditRoundedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ borderRadius: 2 }}
                              onClick={() => {
                                if (confirm(`Xóa lớp "${cl.name}"?`)) {
                                  setClasses((prev) =>
                                    prev.filter((x) => x.id !== cl.id),
                                  );
                                }
                              }}
                            >
                              <DeleteRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Add dialog */}
          <AddClassDialog
            open={openAdd}
            onClose={() => setOpenAdd(false)}
            courses={mockCourses}
            students={mockStudents}
            onCreate={(newClass) => setClasses((prev) => [newClass, ...prev])}
          />
        </Container>
      </Box>
    </Fade>
  );
}
