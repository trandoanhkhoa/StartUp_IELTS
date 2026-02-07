import * as React from "react";
import {
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
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
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

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";

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
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        bgcolor: ui.card,
        border: "1px solid",
        borderColor: ui.border,
        ...sx,
      }}
    >
      {children}
    </Card>
  );
}

function SoftIcon({ children }) {
  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 3,
        display: "grid",
        placeItems: "center",
        bgcolor: "rgba(14,165,233,.10)",
        color: "#0284C7",
      }}
    >
      {children}
    </Box>
  );
}

function AddStudentDialog({ open, onClose, onAdd }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 950 }}>Thêm học sinh</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Tên học sinh"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="VD: Nguyễn Văn A"
            fullWidth
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="VD: a@gmail.com"
            fullWidth
          />
          <Typography sx={{ fontSize: 13, color: ui.muted }}>
            Tip: Email giúp liên kết tài khoản Student sau này.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} sx={{ fontWeight: 900, borderRadius: 3 }}>
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={!name.trim()}
          onClick={() => onAdd({ name, email })}
          sx={{
            fontWeight: 950,
            borderRadius: 3,
            bgcolor: ui.primary,
            "&:hover": { bgcolor: "#0284C7" },
          }}
        >
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ClassDetailPage() {
  // ===== MOCK DATA =====
  const teachers = React.useMemo(
    () => [
      { id: "t1", name: "Nguyễn Minh Anh" },
      { id: "t2", name: "Trần Quốc Bảo" },
      { id: "t3", name: "Phạm Thùy Linh" },
    ],
    [],
  );

  const [classInfo, setClassInfo] = React.useState({
    id: "c1",
    name: "IELTS Writing Task 2 - K12",
    teacherId: "t1",
    createdAt: "2026-01-21",
    updatedAt: "2026-02-01",
  });

  const [students, setStudents] = React.useState([
    { id: "s1", name: "Nguyễn Văn A", email: "a@gmail.com", band: 6.5 },
    { id: "s2", name: "Trần Thị B", email: "b@gmail.com", band: 7.0 },
    { id: "s3", name: "Lê Văn C", email: "c@gmail.com", band: 5.5 },
    { id: "s4", name: "Phạm Minh D", email: "d@gmail.com", band: 6.0 },
  ]);

  // ===== UI STATES =====
  const teacher = teachers.find((t) => t.id === classInfo.teacherId);
  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState(classInfo);

  const [openAddStudent, setOpenAddStudent] = React.useState(false);
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    setDraft(classInfo);
  }, [classInfo]);

  const filteredStudents = React.useMemo(() => {
    if (!q) return students;
    const k = q.toLowerCase();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(k) ||
        (s.email || "").toLowerCase().includes(k),
    );
  }, [students, q]);

  const save = () => {
    setClassInfo({
      ...classInfo,
      ...draft,
      updatedAt: new Date().toISOString().slice(0, 10),
    });
    setEditing(false);
  };

  const cancel = () => {
    setDraft(classInfo);
    setEditing(false);
  };

  const addStudent = ({ name, email }) => {
    setStudents((prev) => [
      { id: `s_${Date.now()}`, name, email, band: null },
      ...prev,
    ]);
    setOpenAddStudent(false);
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const bandChip = (band) => {
    // accent colors: green/amber/red
    if (band == null)
      return (
        <Chip
          label="—"
          size="small"
          sx={{ borderRadius: 999, fontWeight: 900 }}
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
        label={`Band ${band}`}
        size="small"
        sx={{
          borderRadius: 999,
          fontWeight: 950,
          bgcolor: bg,
          color,
        }}
      />
    );
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Fade in timeout={450}>
          <Box>
            {/* ===== HEADER ===== */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              {/* breadcrumb-ish */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={() => alert("Back to classes list")}
                  sx={{
                    borderRadius: 3,
                    bgcolor: "#fff",
                    border: "1px solid rgba(15,23,42,.10)",
                    transition: "all .18s ease",
                    "&:hover": { transform: "translateY(-1px)" },
                  }}
                >
                  <ArrowBackRoundedIcon />
                </IconButton>

                <Typography
                  sx={{ color: ui.muted, fontWeight: 800, fontSize: 13 }}
                >
                  Classes
                </Typography>
                <Typography
                  sx={{ color: "rgba(15,23,42,.35)", fontWeight: 900 }}
                >
                  /
                </Typography>
                <Typography
                  sx={{ color: ui.text, fontWeight: 950, fontSize: 13 }}
                >
                  {classInfo.name}
                </Typography>

                <Chip
                  label={`${students.length} học sinh`}
                  size="small"
                  sx={{
                    ml: 1,
                    borderRadius: 999,
                    fontWeight: 950,
                    bgcolor: "rgba(2,132,199,.08)",
                    color: "#0284C7",
                  }}
                />
              </Stack>

              {/* title + actions */}
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <SoftIcon>
                    <SchoolRoundedIcon />
                  </SoftIcon>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: { xs: 22, md: 28 },
                        fontWeight: 1000,
                        color: ui.text,
                        letterSpacing: -0.5,
                        lineHeight: 1.2,
                      }}
                    >
                      {classInfo.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: ui.muted }}>
                      Thông tin lớp, giáo viên đứng lớp và danh sách học sinh
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {!editing ? (
                    <Button
                      onClick={() => setEditing(true)}
                      startIcon={<EditRoundedIcon />}
                      sx={{ fontWeight: 950, borderRadius: 3 }}
                    >
                      Sửa thông tin
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={cancel}
                        startIcon={<CloseRoundedIcon />}
                        sx={{ fontWeight: 950, borderRadius: 3 }}
                      >
                        Hủy
                      </Button>
                      <Button
                        variant="contained"
                        onClick={save}
                        startIcon={<SaveRoundedIcon />}
                        sx={{
                          fontWeight: 950,
                          borderRadius: 3,
                          bgcolor: ui.primary,
                          "&:hover": { bgcolor: "#0284C7" },
                        }}
                      >
                        Lưu
                      </Button>
                    </>
                  )}
                </Stack>
              </Stack>
            </Stack>

            {/* ===== CONTENT ===== */}
            <Grid container spacing={2.5}>
              {/* LEFT: class info */}
              <Grid size={{ xs: 12, md: 4 }}>
                <LinearCard
                  sx={{
                    position: "sticky",
                    top: 20,
                    transition: "all .18s ease",
                    "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                      Thông tin lớp
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontSize: 13, color: ui.muted }}>
                      Quản lý thông tin cơ bản của lớp học.
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: ui.border }} />

                    <Stack spacing={2.2}>
                      <TextField
                        label="Tên lớp"
                        value={draft.name}
                        onChange={(e) =>
                          setDraft((p) => ({ ...p, name: e.target.value }))
                        }
                        disabled={!editing}
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
                          Giáo viên đứng lớp
                        </Typography>
                        <Select
                          value={draft.teacherId}
                          onChange={(e) =>
                            setDraft((p) => ({
                              ...p,
                              teacherId: e.target.value,
                            }))
                          }
                          disabled={!editing}
                          input={<OutlinedInput />}
                          sx={{ borderRadius: 3 }}
                          renderValue={(val) =>
                            teachers.find((t) => t.id === val)?.name || ""
                          }
                        >
                          {teachers.map((t) => (
                            <MenuItem key={t.id} value={t.id}>
                              {t.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <Stack
                        direction="row"
                        spacing={1.2}
                        alignItems="center"
                        sx={{
                          p: 1.6,
                          borderRadius: 3,
                          border: "1px solid rgba(15,23,42,.08)",
                          bgcolor: "rgba(248,250,252,.6)",
                        }}
                      >
                        <Avatar sx={{ width: 36, height: 36 }}>
                          {teacher?.name?.[0]?.toUpperCase() || "T"}
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontWeight: 1000,
                              color: ui.text,
                              lineHeight: 1.2,
                            }}
                            noWrap
                          >
                            {teacher?.name}
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: ui.muted }}>
                            Teacher
                          </Typography>
                        </Box>
                      </Stack>

                      <Divider sx={{ borderColor: ui.border }} />

                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: ui.muted,
                            fontWeight: 800,
                          }}
                        >
                          Created
                        </Typography>
                        <Typography
                          sx={{ fontSize: 13, color: ui.text, fontWeight: 900 }}
                        >
                          {classInfo.createdAt}
                        </Typography>
                      </Stack>

                      <Stack direction="row" justifyContent="space-between">
                        <Typography
                          sx={{
                            fontSize: 13,
                            color: ui.muted,
                            fontWeight: 800,
                          }}
                        >
                          Updated
                        </Typography>
                        <Typography
                          sx={{ fontSize: 13, color: ui.text, fontWeight: 900 }}
                        >
                          {classInfo.updatedAt}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </LinearCard>
              </Grid>

              {/* RIGHT: students list */}
              <Grid size={{ xs: 12, md: 8 }}>
                <LinearCard
                  sx={{
                    transition: "all .18s ease",
                    "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    {/* toolbar */}
                    <Box sx={{ px: 3, py: 2.2 }}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={1.6}
                        alignItems={{ xs: "stretch", md: "center" }}
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                            Danh sách học sinh
                          </Typography>
                          <Typography sx={{ fontSize: 13, color: ui.muted }}>
                            Quản lý học sinh thuộc lớp này.
                          </Typography>
                        </Box>

                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <TextField
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Tìm học sinh..."
                            size="small"
                            sx={{
                              width: { xs: "100%", md: 280 },
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

                          <Button
                            variant="contained"
                            onClick={() => setOpenAddStudent(true)}
                            startIcon={<PersonAddAltRoundedIcon />}
                            sx={{
                              borderRadius: 3,
                              fontWeight: 950,
                              bgcolor: ui.primary,
                              "&:hover": { bgcolor: "#0284C7" },
                            }}
                          >
                            Thêm
                          </Button>
                        </Stack>
                      </Stack>
                    </Box>

                    <Divider sx={{ borderColor: ui.border }} />

                    {/* table */}
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                            Học sinh
                          </TableCell>
                          <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                            Email
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
                        {filteredStudents.map((s) => (
                          <TableRow
                            key={s.id}
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
                                <Avatar sx={{ width: 34, height: 34 }}>
                                  {s.name?.[0]?.toUpperCase() || "S"}
                                </Avatar>
                                <Typography
                                  sx={{ fontWeight: 950, color: ui.text }}
                                >
                                  {s.name}
                                </Typography>
                              </Stack>
                            </TableCell>

                            <TableCell
                              sx={{ color: ui.muted, fontWeight: 700 }}
                            >
                              {s.email || "-"}
                            </TableCell>

                            <TableCell>{bandChip(s.band)}</TableCell>

                            <TableCell align="right">
                              <Tooltip title="Xóa học sinh khỏi lớp">
                                <IconButton
                                  onClick={() => removeStudent(s.id)}
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
                            </TableCell>
                          </TableRow>
                        ))}

                        {filteredStudents.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={4} sx={{ py: 6 }}>
                              <Stack spacing={1} alignItems="center">
                                <Typography
                                  sx={{ fontWeight: 1000, color: ui.text }}
                                >
                                  Không có học sinh
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 14, color: ui.muted }}
                                >
                                  Hãy thêm học sinh hoặc đổi từ khóa tìm kiếm.
                                </Typography>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </LinearCard>
              </Grid>
            </Grid>

            <AddStudentDialog
              open={openAddStudent}
              onClose={() => setOpenAddStudent(false)}
              onAdd={addStudent}
            />
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
