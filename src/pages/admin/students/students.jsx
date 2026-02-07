import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
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
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

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
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: ui.card,
        border: "1px solid",
        borderColor: ui.border,
        overflow: "hidden",
        transition: "all .18s ease",
        "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function ConfirmDialog({ open, title, description, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 1000 }}>{title}</DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ fontSize: 14, color: ui.muted }}>
          {description}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 950, borderRadius: 3 }}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            fontWeight: 1000,
            borderRadius: 3,
            bgcolor: "#EF4444",
            "&:hover": { bgcolor: "#DC2626" },
          }}
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function StudentDialog({ open, onClose, onSubmit, initial, classes }) {
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = React.useState({
    studentId: "",
    name: "",
    classId: "",
    email: "",
    phone: "",
    band: "",
  });

  React.useEffect(() => {
    if (!open) return;
    setForm({
      studentId: initial?.studentId || "",
      name: initial?.name || "",
      classId: initial?.classId || classes?.[0]?.id || "",
      email: initial?.email || "",
      phone: initial?.phone || "",
      band: initial?.band ?? "",
    });
  }, [open, initial, classes]);

  const submit = () => {
    if (!form.studentId.trim() || !form.name.trim()) return;
    onSubmit({
      ...form,
      band: form.band === "" ? null : Number(form.band),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 1000 }}>
        {isEdit ? "Sửa học sinh" : "Thêm học sinh"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="ID"
                value={form.studentId}
                onChange={(e) =>
                  setForm((p) => ({ ...p, studentId: e.target.value }))
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                label="Tên"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                fullWidth
              />
            </Grid>
          </Grid>

          <FormControl fullWidth>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 900,
                color: "rgba(15,23,42,.55)",
                mb: 0.7,
              }}
            >
              Lớp
            </Typography>
            <Select
              value={form.classId}
              onChange={(e) =>
                setForm((p) => ({ ...p, classId: e.target.value }))
              }
              sx={{ borderRadius: 3 }}
            >
              {classes.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* optional details */}
          <Divider sx={{ borderColor: ui.border }} />
          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
            Thông tin chi tiết (tuỳ chọn)
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="SĐT"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                fullWidth
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Band (optional)"
                value={form.band}
                onChange={(e) =>
                  setForm((p) => ({ ...p, band: e.target.value }))
                }
                fullWidth
                placeholder="VD: 6.5"
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 950, borderRadius: 3 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={!form.studentId.trim() || !form.name.trim()}
          sx={{
            fontWeight: 1000,
            borderRadius: 3,
            bgcolor: ui.primary,
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          {isEdit ? "Lưu" : "Tạo mới"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function BandChip({ band }) {
  if (band == null)
    return (
      <Chip
        size="small"
        label="—"
        sx={{ borderRadius: 999, fontWeight: 950 }}
      />
    );

  let bg = "rgba(245,158,11,.12)";
  let color = "#B45309";
  if (band >= 7) {
    bg = "rgba(34,197,94,.12)";
    color = "#16A34A";
  } else if (band < 6) {
    bg = "rgba(239,68,68,.12)";
    color = "#DC2626";
  }

  return (
    <Chip
      size="small"
      label={`Band ${band}`}
      sx={{ borderRadius: 999, fontWeight: 1000, bgcolor: bg, color }}
    />
  );
}

export default function StudentsListPage() {
  // ===== MOCK DATA =====
  const classes = React.useMemo(
    () => [
      { id: "c1", name: "IELTS Writing Task 2 - K12" },
      { id: "c2", name: "IELTS Writing Task 1 - Beginner" },
      { id: "c3", name: "IELTS Writing Intensive - Weekend" },
    ],
    [],
  );

  const [students, setStudents] = React.useState([
    {
      id: "s1",
      studentId: "ST001",
      name: "Nguyễn Văn A",
      classId: "c1",
      email: "a@gmail.com",
      phone: "0901 111 111",
      band: 6.5,
    },
    {
      id: "s2",
      studentId: "ST002",
      name: "Trần Thị B",
      classId: "c2",
      email: "b@gmail.com",
      phone: "0902 222 222",
      band: 7.0,
    },
    {
      id: "s3",
      studentId: "ST003",
      name: "Lê Văn C",
      classId: "c1",
      email: "",
      phone: "",
      band: 5.5,
    },
  ]);

  // ===== filters =====
  const [q, setQ] = React.useState("");
  const [classFilter, setClassFilter] = React.useState("all");

  const filtered = React.useMemo(() => {
    const k = q.toLowerCase();
    return students.filter((s) => {
      const matchQuery =
        !q ||
        s.studentId.toLowerCase().includes(k) ||
        s.name.toLowerCase().includes(k);

      const matchClass =
        classFilter === "all" ? true : s.classId === classFilter;

      return matchQuery && matchClass;
    });
  }, [students, q, classFilter]);

  // ===== row detail toggle =====
  const [openRows, setOpenRows] = React.useState(() => new Set());
  const toggleRow = (id) => {
    setOpenRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ===== dialogs =====
  const [openCreate, setOpenCreate] = React.useState(false);
  const [editStudent, setEditStudent] = React.useState(null);
  const [deleteStudent, setDeleteStudent] = React.useState(null);

  const handleCreate = (data) => {
    setStudents((prev) => [{ id: `s_${Date.now()}`, ...data }, ...prev]);
    setOpenCreate(false);
  };

  const handleEdit = (data) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === editStudent.id ? { ...s, ...data } : s)),
    );
    setEditStudent(null);
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
    setDeleteStudent(null);
  };

  const changeClassInline = (studentId, classId) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, classId } : s)),
    );
  };

  const className = (id) => classes.find((c) => c.id === id)?.name || "-";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Fade in timeout={450}>
          <Box>
            {/* Header */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
                alignItems={{ xs: "stretch", md: "center" }}
                justifyContent="space-between"
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: 22, md: 28 },
                      fontWeight: 1000,
                      color: ui.text,
                      letterSpacing: -0.5,
                    }}
                  >
                    Học sinh
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: ui.muted }}>
                    Quản lý danh sách học sinh, lớp và thông tin chi tiết.
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => setOpenCreate(true)}
                  sx={{
                    borderRadius: 3,
                    fontWeight: 1000,
                    bgcolor: ui.primary,
                    "&:hover": { bgcolor: "#0284C7" },
                  }}
                >
                  Thêm học sinh
                </Button>
              </Stack>

              <Divider sx={{ borderColor: ui.border }} />
            </Stack>

            {/* Toolbar */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Tìm theo ID / tên..."
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      bgcolor: "#fff",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon
                          sx={{ color: "rgba(15,23,42,.45)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <FormControl fullWidth size="small">
                  <Select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    sx={{ borderRadius: 3, bgcolor: "#fff" }}
                  >
                    <MenuItem value="all">Tất cả lớp</MenuItem>
                    {classes.map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Table */}
            <LinearCard>
              <Box sx={{ px: 3, py: 2 }}>
                <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                  Danh sách học sinh
                </Typography>
                <Typography sx={{ fontSize: 13, color: ui.muted }}>
                  Tổng: {students.length} học sinh
                </Typography>
              </Box>

              <Divider sx={{ borderColor: ui.border }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 60 }} />
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Tên
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Lớp
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Band
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 1000, color: ui.text }}
                    >
                      Hành động
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filtered.map((s) => {
                    const isOpen = openRows.has(s.id);

                    return (
                      <React.Fragment key={s.id}>
                        <TableRow
                          hover
                          sx={{
                            transition: "all .15s ease",
                            "&:hover": { bgcolor: "rgba(14,165,233,.05)" },
                          }}
                        >
                          <TableCell>
                            <IconButton
                              onClick={() => toggleRow(s.id)}
                              sx={{
                                borderRadius: 2.5,
                                border: "1px solid rgba(15,23,42,.10)",
                                transition: "all .15s ease",
                                "&:hover": { transform: "translateY(-1px)" },
                              }}
                            >
                              {isOpen ? (
                                <KeyboardArrowUpRoundedIcon />
                              ) : (
                                <KeyboardArrowDownRoundedIcon />
                              )}
                            </IconButton>
                          </TableCell>

                          <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                            <Box sx={{ fontFamily: "monospace" }}>
                              {s.studentId}
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={1.2}
                              alignItems="center"
                            >
                              <Avatar
                                sx={{
                                  width: 34,
                                  height: 34,
                                  fontWeight: 1000,
                                  bgcolor: "rgba(2,132,199,.18)",
                                  color: "#075985",
                                }}
                              >
                                {s.name?.[0]?.toUpperCase() || "S"}
                              </Avatar>
                              <Typography
                                sx={{ fontWeight: 1000, color: ui.text }}
                              >
                                {s.name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          {/* inline change class */}
                          <TableCell>
                            <Select
                              size="small"
                              value={s.classId}
                              onChange={(e) =>
                                changeClassInline(s.id, e.target.value)
                              }
                              sx={{
                                borderRadius: 3,
                                bgcolor: "#fff",
                                minWidth: 240,
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "rgba(15,23,42,.12)",
                                },
                              }}
                            >
                              {classes.map((c) => (
                                <MenuItem key={c.id} value={c.id}>
                                  {c.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>

                          <TableCell>
                            <BandChip band={s.band} />
                          </TableCell>

                          <TableCell align="right">
                            <Stack
                              direction="row"
                              spacing={1}
                              justifyContent="flex-end"
                            >
                              <Tooltip title="Sửa">
                                <IconButton
                                  onClick={() => setEditStudent(s)}
                                  sx={{
                                    borderRadius: 2.5,
                                    border: "1px solid rgba(15,23,42,.10)",
                                    transition: "all .15s ease",
                                    "&:hover": {
                                      transform: "translateY(-1px)",
                                    },
                                  }}
                                >
                                  <EditRoundedIcon />
                                </IconButton>
                              </Tooltip>

                              <Tooltip title="Xóa">
                                <IconButton
                                  onClick={() => setDeleteStudent(s)}
                                  sx={{
                                    borderRadius: 2.5,
                                    border: "1px solid rgba(239,68,68,.25)",
                                    color: "#EF4444",
                                    transition: "all .15s ease",
                                    "&:hover": {
                                      transform: "translateY(-1px)",
                                    },
                                  }}
                                >
                                  <DeleteOutlineRoundedIcon />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>

                        {/* Expand details */}
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            sx={{ p: 0, borderBottom: "none" }}
                          >
                            <Collapse in={isOpen} timeout={180} unmountOnExit>
                              <Box
                                sx={{
                                  px: 3,
                                  py: 2.2,
                                  bgcolor: "rgba(248,250,252,.7)",
                                }}
                              >
                                <Grid container spacing={2}>
                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <Typography
                                      sx={{ fontWeight: 1000, color: ui.text }}
                                    >
                                      Thông tin chi tiết
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: 13,
                                        color: ui.muted,
                                        mt: 0.4,
                                      }}
                                    >
                                      Dữ liệu mở rộng cho học sinh.
                                    </Typography>

                                    <Stack spacing={1.1} sx={{ mt: 1.5 }}>
                                      <Stack direction="row" spacing={1}>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.muted,
                                          }}
                                        >
                                          Email:
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.text,
                                          }}
                                        >
                                          {s.email || "—"}
                                        </Typography>
                                      </Stack>

                                      <Stack direction="row" spacing={1}>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.muted,
                                          }}
                                        >
                                          SĐT:
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.text,
                                          }}
                                        >
                                          {s.phone || "—"}
                                        </Typography>
                                      </Stack>

                                      <Stack direction="row" spacing={1}>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.muted,
                                          }}
                                        >
                                          Lớp:
                                        </Typography>
                                        <Typography
                                          sx={{
                                            fontWeight: 900,
                                            color: ui.text,
                                          }}
                                        >
                                          {className(s.classId)}
                                        </Typography>
                                      </Stack>
                                    </Stack>
                                  </Grid>

                                  <Grid size={{ xs: 12, md: 6 }}>
                                    <Box
                                      sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        border: "1px solid rgba(15,23,42,.08)",
                                        bgcolor: "#fff",
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontWeight: 1000,
                                          color: ui.text,
                                        }}
                                      >
                                        Quick summary
                                      </Typography>
                                      <Typography
                                        sx={{
                                          fontSize: 13,
                                          color: ui.muted,
                                          mt: 0.4,
                                        }}
                                      >
                                        Hiển thị nhanh (có thể mở rộng sau).
                                      </Typography>

                                      <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ mt: 1.5 }}
                                      >
                                        <Chip
                                          label={s.studentId}
                                          size="small"
                                          sx={{
                                            borderRadius: 999,
                                            fontWeight: 1000,
                                            bgcolor: "rgba(2,132,199,.08)",
                                            color: "#0284C7",
                                            fontFamily: "monospace",
                                          }}
                                        />
                                        <BandChip band={s.band} />
                                      </Stack>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}

                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ py: 6 }}>
                        <Stack spacing={1} alignItems="center">
                          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                            Không có dữ liệu
                          </Typography>
                          <Typography sx={{ fontSize: 14, color: ui.muted }}>
                            Hãy đổi từ khóa tìm kiếm hoặc filter lớp.
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </LinearCard>

            {/* dialogs */}
            <StudentDialog
              open={openCreate}
              onClose={() => setOpenCreate(false)}
              onSubmit={handleCreate}
              classes={classes}
            />

            <StudentDialog
              open={Boolean(editStudent)}
              onClose={() => setEditStudent(null)}
              onSubmit={handleEdit}
              initial={editStudent}
              classes={classes}
            />

            <ConfirmDialog
              open={Boolean(deleteStudent)}
              title="Xóa học sinh?"
              description="Hành động này sẽ xóa học sinh khỏi hệ thống. Bạn chắc chắn muốn tiếp tục?"
              onClose={() => setDeleteStudent(null)}
              onConfirm={handleDelete}
            />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
