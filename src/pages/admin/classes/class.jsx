import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  OutlinedInput,
  Avatar,
  Tooltip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const ui = {
  bg: "#F8FAFC",
  cardBorder: "rgba(15,23,42,.08)",
  text: "#0F172A",
  muted: "rgba(15,23,42,.62)",
  primary: "#0EA5E9",
};

function LinearCard({ children, sx }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: ui.cardBorder,
        bgcolor: "#fff",
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function TeacherChip({ teacher }) {
  return (
    <Chip
      avatar={
        <Avatar sx={{ width: 22, height: 22 }}>
          {teacher?.name?.[0]?.toUpperCase() || "T"}
        </Avatar>
      }
      label={teacher?.name || "Chưa gán"}
      variant="outlined"
      sx={{
        borderRadius: 999,
        fontWeight: 700,
        borderColor: "rgba(14,165,233,.35)",
        bgcolor: "rgba(14,165,233,.06)",
        color: "#0284C7",
      }}
    />
  );
}

function ClassFormDialog({ open, onClose, onSubmit, teachers, initialValue }) {
  const isEdit = Boolean(initialValue?.id);

  const [name, setName] = React.useState(initialValue?.name || "");
  const [teacherId, setTeacherId] = React.useState(
    initialValue?.teacher?.id || "",
  );

  React.useEffect(() => {
    setName(initialValue?.name || "");
    setTeacherId(initialValue?.teacher?.id || "");
  }, [initialValue, open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>
        {isEdit ? "Sửa lớp học" : "Tạo lớp học"}
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2.2} sx={{ mt: 1 }}>
          <TextField
            label="Tên lớp"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: IELTS Writing K12 - Task 2"
            fullWidth
          />

          <FormControl fullWidth>
            <Select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              input={<OutlinedInput />}
              displayEmpty
              renderValue={(val) => {
                if (!val)
                  return (
                    <span style={{ color: "rgba(15,23,42,.45)" }}>
                      Chọn giáo viên
                    </span>
                  );
                const t = teachers.find((x) => x.id === val);
                return t?.name || "Giáo viên";
              }}
            >
              <MenuItem value="">
                <em>Chưa gán</em>
              </MenuItem>
              {teachers.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography sx={{ fontSize: 13, color: ui.muted }}>
            Sau khi tạo lớp bạn có thể vào trang chi tiết để thêm học sinh.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 800 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={() => onSubmit({ name, teacherId })}
          disabled={!name.trim()}
          sx={{
            fontWeight: 900,
            borderRadius: 3,
            bgcolor: ui.primary,
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          {isEdit ? "Lưu" : "Tạo lớp"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function ConfirmDeleteDialog({ open, onClose, onConfirm, className }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ fontWeight: 900 }}>Xóa lớp học?</DialogTitle>
      <DialogContent dividers>
        <Typography sx={{ color: ui.muted, fontSize: 14 }}>
          Bạn chắc chắn muốn xóa lớp{" "}
          <b style={{ color: ui.text }}>{className}</b>? Hành động này không thể
          hoàn tác.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 800 }}>
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            fontWeight: 900,
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

export default function ClassesListPage() {
  // mock teachers
  const teachers = React.useMemo(
    () => [
      { id: "t1", name: "Nguyễn Minh Anh" },
      { id: "t2", name: "Trần Quốc Bảo" },
      { id: "t3", name: "Phạm Thùy Linh" },
    ],
    [],
  );

  // mock classes
  const [classes, setClasses] = React.useState([
    {
      id: "c1",
      name: "IELTS Writing Task 2 - K12",
      teacher: teachers[0],
      studentsCount: 38,
      createdAt: "2026-01-21",
    },
    {
      id: "c2",
      name: "IELTS Writing Task 1 - Beginner",
      teacher: teachers[2],
      studentsCount: 24,
      createdAt: "2026-01-18",
    },
    {
      id: "c3",
      name: "IELTS Writing Intensive - Band 7+",
      teacher: teachers[1],
      studentsCount: 16,
      createdAt: "2026-01-10",
    },
  ]);

  const [q, setQ] = React.useState("");
  const [teacherFilter, setTeacherFilter] = React.useState("");

  // menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selected, setSelected] = React.useState(null);

  // dialogs
  const [openForm, setOpenForm] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [openDelete, setOpenDelete] = React.useState(false);

  const filtered = React.useMemo(() => {
    return classes.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.teacher?.name?.toLowerCase().includes(q.toLowerCase());
      const matchTeacher = !teacherFilter || c.teacher?.id === teacherFilter;
      return matchQ && matchTeacher;
    });
  }, [classes, q, teacherFilter]);

  const openMenu = (e, row) => {
    setAnchorEl(e.currentTarget);
    setSelected(row);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleCreate = () => {
    setEditing(null);
    setOpenForm(true);
  };

  const handleEdit = () => {
    setEditing(selected);
    setOpenForm(true);
    closeMenu();
  };

  const handleDelete = () => {
    setOpenDelete(true);
    closeMenu();
  };

  const handleSubmitForm = ({ name, teacherId }) => {
    const teacher = teachers.find((t) => t.id === teacherId) || null;

    if (editing?.id) {
      setClasses((prev) =>
        prev.map((c) => (c.id === editing.id ? { ...c, name, teacher } : c)),
      );
    } else {
      setClasses((prev) => [
        {
          id: `c_${Date.now()}`,
          name,
          teacher,
          studentsCount: 0,
          createdAt: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    }

    setOpenForm(false);
    setEditing(null);
  };

  const confirmDelete = () => {
    setClasses((prev) => prev.filter((c) => c.id !== selected?.id));
    setOpenDelete(false);
    setSelected(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", md: "center" }}
          justifyContent="space-between"
          sx={{ mb: 3 }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 22, md: 28 },
                fontWeight: 950,
                color: ui.text,
                letterSpacing: -0.4,
              }}
            >
              Lớp học
            </Typography>
            <Typography sx={{ fontSize: 14, color: ui.muted }}>
              Quản lý danh sách lớp, giáo viên đứng lớp và học sinh.
            </Typography>
          </Box>

          <Button
            onClick={handleCreate}
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{
              borderRadius: 3,
              fontWeight: 900,
              bgcolor: ui.primary,
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Thêm lớp
          </Button>
        </Stack>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 2.5 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên lớp hoặc giáo viên..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon sx={{ color: "rgba(15,23,42,.45)" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <FormControl fullWidth>
              <Select
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                displayEmpty
                input={<OutlinedInput />}
                sx={{
                  borderRadius: 3,
                  bgcolor: "#fff",
                }}
                renderValue={(val) => {
                  if (!val)
                    return (
                      <span style={{ color: "rgba(15,23,42,.45)" }}>
                        Lọc theo giáo viên
                      </span>
                    );
                  return (
                    teachers.find((t) => t.id === val)?.name || "Giáo viên"
                  );
                }}
              >
                <MenuItem value="">
                  <em>Tất cả giáo viên</em>
                </MenuItem>
                {teachers.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Table */}
        <LinearCard>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ px: 3, py: 2 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <SchoolRoundedIcon sx={{ color: "#0284C7" }} />
                <Typography sx={{ fontWeight: 950, color: ui.text }}>
                  Danh sách lớp
                </Typography>
                <Chip
                  label={`${filtered.length} lớp`}
                  size="small"
                  sx={{
                    ml: "auto",
                    fontWeight: 900,
                    borderRadius: 999,
                    bgcolor: "rgba(2,132,199,.08)",
                    color: "#0284C7",
                  }}
                />
              </Stack>
            </Box>

            <Divider sx={{ borderColor: ui.cardBorder }} />

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 900, color: ui.text }}>
                    Tên lớp
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, color: ui.text }}>
                    Giáo viên
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, color: ui.text }}>
                    Học sinh
                  </TableCell>
                  <TableCell sx={{ fontWeight: 900, color: ui.text }}>
                    Ngày tạo
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontWeight: 900, color: ui.text }}
                  >
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map((row) => (
                  <TableRow
                    key={row.id}
                    hover
                    sx={{
                      transition: "all .15s ease",
                      "&:hover": { bgcolor: "rgba(14,165,233,.05)" },
                    }}
                  >
                    <TableCell sx={{ fontWeight: 900, color: ui.text }}>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            bgcolor: "rgba(14,165,233,.55)",
                          }}
                        />
                        {row.name}
                      </Stack>
                    </TableCell>

                    <TableCell>
                      <TeacherChip teacher={row.teacher} />
                    </TableCell>

                    <TableCell sx={{ color: ui.muted, fontWeight: 800 }}>
                      {row.studentsCount}
                    </TableCell>

                    <TableCell sx={{ color: ui.muted, fontWeight: 700 }}>
                      {row.createdAt}
                    </TableCell>

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="flex-end"
                      >
                        <Tooltip title="Xem chi tiết">
                          <IconButton
                            size="small"
                            sx={{
                              borderRadius: 2,
                              border: "1px solid rgba(15,23,42,.10)",
                            }}
                            onClick={() => {
                              window.location.href = `/admin-detailclass?id=${row.id}`;
                              // TODO: navigate(`/admin/classes/${row.id}`)
                              //alert(`Đi tới chi tiết lớp: ${row.name}`);
                            }}
                          >
                            <ArrowForwardRoundedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>

                        <IconButton
                          size="small"
                          onClick={(e) => openMenu(e, row)}
                          sx={{
                            borderRadius: 2,
                            border: "1px solid rgba(15,23,42,.10)",
                          }}
                        >
                          <MoreHorizRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} sx={{ py: 5 }}>
                      <Stack alignItems="center" spacing={1}>
                        <Typography sx={{ fontWeight: 900, color: ui.text }}>
                          Không có lớp nào
                        </Typography>
                        <Typography sx={{ fontSize: 14, color: ui.muted }}>
                          Thử đổi bộ lọc hoặc tạo lớp mới.
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </LinearCard>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: "1px solid rgba(15,23,42,.10)",
              boxShadow: "0 18px 50px rgba(2,6,23,.12)",
              minWidth: 200,
            },
          }}
        >
          <MenuItem onClick={handleEdit}>
            <EditRoundedIcon sx={{ mr: 1.2 }} fontSize="small" />
            Sửa lớp
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: "#EF4444" }}>
            <DeleteOutlineRoundedIcon sx={{ mr: 1.2 }} fontSize="small" />
            Xóa lớp
          </MenuItem>
        </Menu>

        {/* Dialogs */}
        <ClassFormDialog
          open={openForm}
          onClose={() => {
            setOpenForm(false);
            setEditing(null);
          }}
          onSubmit={handleSubmitForm}
          teachers={teachers}
          initialValue={editing}
        />

        <ConfirmDeleteDialog
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirm={confirmDelete}
          className={selected?.name}
        />
      </Container>
    </Box>
  );
}
