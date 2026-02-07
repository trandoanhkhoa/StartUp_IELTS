import * as React from "react";
import {
  Avatar,
  Box,
  Button,
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
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

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

function StatusChip({ status }) {
  if (status === "active") {
    return (
      <Chip
        size="small"
        label="Active"
        sx={{
          borderRadius: 999,
          fontWeight: 950,
          bgcolor: "rgba(34,197,94,.12)",
          color: "#16A34A",
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="Inactive"
      sx={{
        borderRadius: 999,
        fontWeight: 950,
        bgcolor: "rgba(239,68,68,.12)",
        color: "#DC2626",
      }}
    />
  );
}

function TeacherDialog({ open, onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  React.useEffect(() => {
    if (!open) return;
    setForm({
      name: initial?.name || "",
      email: initial?.email || "",
      phone: initial?.phone || "",
      status: initial?.status || "active",
    });
  }, [open, initial]);

  const submit = () => {
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 1000 }}>
        {isEdit ? "Sửa giáo viên" : "Thêm giáo viên"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Họ tên"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            fullWidth
          />
          <TextField
            label="SĐT"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            fullWidth
          />

          <FormControl fullWidth>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 900,
                color: "rgba(15,23,42,.55)",
                mb: 0.7,
              }}
            >
              Trạng thái
            </Typography>
            <Select
              value={form.status}
              onChange={(e) =>
                setForm((p) => ({ ...p, status: e.target.value }))
              }
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>

          <Typography sx={{ fontSize: 13, color: ui.muted }}>
            Avatar có thể thêm sau bằng upload (nếu bạn muốn mình làm tiếp phần
            đó).
          </Typography>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 950, borderRadius: 3 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={submit}
          disabled={!form.name.trim()}
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

export default function TeachersListPage() {
  // ===== MOCK DATA =====
  const [teachers, setTeachers] = React.useState([
    {
      id: "t1",
      name: "Nguyễn Minh Anh",
      email: "minhanh.teacher@gmail.com",
      phone: "0909 123 456",
      classesCount: 3,
      studentsCount: 74,
      status: "active",
    },
    {
      id: "t2",
      name: "Trần Quốc Bảo",
      email: "bao.teacher@gmail.com",
      phone: "0933 777 888",
      classesCount: 2,
      studentsCount: 42,
      status: "active",
    },
    {
      id: "t3",
      name: "Phạm Thùy Linh",
      email: "linh.teacher@gmail.com",
      phone: "0988 222 111",
      classesCount: 1,
      studentsCount: 18,
      status: "inactive",
    },
  ]);

  const [q, setQ] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  // dialogs
  const [openCreate, setOpenCreate] = React.useState(false);
  const [editTeacher, setEditTeacher] = React.useState(null);
  const [deleteTeacher, setDeleteTeacher] = React.useState(null);

  const filtered = React.useMemo(() => {
    const k = q.toLowerCase();
    return teachers.filter((t) => {
      const matchQuery =
        !q ||
        t.name.toLowerCase().includes(k) ||
        (t.email || "").toLowerCase().includes(k) ||
        (t.phone || "").toLowerCase().includes(k);

      const matchStatus =
        statusFilter === "all" ? true : t.status === statusFilter;

      return matchQuery && matchStatus;
    });
  }, [teachers, q, statusFilter]);

  const handleCreate = (data) => {
    setTeachers((prev) => [
      {
        id: `t_${Date.now()}`,
        ...data,
        classesCount: 0,
        studentsCount: 0,
      },
      ...prev,
    ]);
    setOpenCreate(false);
  };

  const handleEdit = (data) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === editTeacher.id ? { ...t, ...data } : t)),
    );
    setEditTeacher(null);
  };

  const handleDelete = () => {
    setTeachers((prev) => prev.filter((t) => t.id !== deleteTeacher.id));
    setDeleteTeacher(null);
  };

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
                    Giáo viên
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: ui.muted }}>
                    Quản lý danh sách giáo viên và phân công giảng dạy.
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
                  Thêm giáo viên
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
                  placeholder="Tìm theo tên / email / SĐT..."
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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ borderRadius: 3, bgcolor: "#fff" }}
                  >
                    <MenuItem value="all">Tất cả trạng thái</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Table */}
            <LinearCard>
              <Box sx={{ px: 3, py: 2 }}>
                <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                  Danh sách giáo viên
                </Typography>
                <Typography sx={{ fontSize: 13, color: ui.muted }}>
                  Tổng: {teachers.length} giáo viên
                </Typography>
              </Box>

              <Divider sx={{ borderColor: ui.border }} />

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Giáo viên
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      SĐT
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Lớp
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Học sinh
                    </TableCell>
                    <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                      Trạng thái
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
                  {filtered.map((t) => (
                    <TableRow
                      key={t.id}
                      hover
                      sx={{
                        transition: "all .15s ease",
                        "&:hover": { bgcolor: "rgba(14,165,233,.05)" },
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
                              width: 34,
                              height: 34,
                              fontWeight: 1000,
                              bgcolor: "rgba(2,132,199,.18)",
                              color: "#075985",
                            }}
                          >
                            {t.name?.[0]?.toUpperCase() || "T"}
                          </Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography
                              sx={{ fontWeight: 1000, color: ui.text }}
                              noWrap
                            >
                              {t.name}
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: ui.muted }}>
                              ID:{" "}
                              <Box
                                component="span"
                                sx={{ fontFamily: "monospace" }}
                              >
                                {t.id}
                              </Box>
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ color: ui.muted, fontWeight: 800 }}>
                        {t.email}
                      </TableCell>

                      <TableCell sx={{ color: ui.muted, fontWeight: 800 }}>
                        {t.phone}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                        {t.classesCount}
                      </TableCell>

                      <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                        {t.studentsCount}
                      </TableCell>

                      <TableCell>
                        <StatusChip status={t.status} />
                      </TableCell>

                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <Tooltip title="Xem chi tiết">
                            <IconButton
                              onClick={() =>
                                alert(`Go to teacher detail: ${t.id}`)
                              }
                              sx={{
                                borderRadius: 2.5,
                                border: "1px solid rgba(2,132,199,.22)",
                                color: "#0284C7",
                                transition: "all .15s ease",
                                "&:hover": { transform: "translateY(-1px)" },
                              }}
                            >
                              <VisibilityRoundedIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Sửa">
                            <IconButton
                              onClick={() => setEditTeacher(t)}
                              sx={{
                                borderRadius: 2.5,
                                border: "1px solid rgba(15,23,42,.10)",
                                transition: "all .15s ease",
                                "&:hover": { transform: "translateY(-1px)" },
                              }}
                            >
                              <EditRoundedIcon />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Xóa">
                            <IconButton
                              onClick={() => setDeleteTeacher(t)}
                              sx={{
                                borderRadius: 2.5,
                                border: "1px solid rgba(239,68,68,.25)",
                                color: "#EF4444",
                                transition: "all .15s ease",
                                "&:hover": { transform: "translateY(-1px)" },
                              }}
                            >
                              <DeleteOutlineRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}

                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ py: 6 }}>
                        <Stack spacing={1} alignItems="center">
                          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                            Không có dữ liệu
                          </Typography>
                          <Typography sx={{ fontSize: 14, color: ui.muted }}>
                            Hãy đổi từ khóa tìm kiếm hoặc filter.
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </LinearCard>

            {/* dialogs */}
            <TeacherDialog
              open={openCreate}
              onClose={() => setOpenCreate(false)}
              onSubmit={handleCreate}
            />

            <TeacherDialog
              open={Boolean(editTeacher)}
              onClose={() => setEditTeacher(null)}
              onSubmit={handleEdit}
              initial={editTeacher}
            />

            <ConfirmDialog
              open={Boolean(deleteTeacher)}
              title="Xóa giáo viên?"
              description="Hành động này sẽ xóa giáo viên khỏi hệ thống. Bạn chắc chắn muốn tiếp tục?"
              onClose={() => setDeleteTeacher(null)}
              onConfirm={handleDelete}
            />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
