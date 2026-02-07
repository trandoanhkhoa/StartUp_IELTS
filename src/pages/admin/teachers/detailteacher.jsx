import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  InputAdornment,
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
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";

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

function StatCard({ icon, label, value }) {
  return (
    <LinearCard
      sx={{
        transition: "all .18s ease",
        "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
      }}
    >
      <CardContent sx={{ p: 2.6 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(14,165,233,.10)",
              color: "#0284C7",
            }}
          >
            {icon}
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 12, color: ui.muted, fontWeight: 900 }}>
              {label}
            </Typography>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 1000,
                color: ui.text,
                letterSpacing: -0.4,
              }}
            >
              {value}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </LinearCard>
  );
}

export default function TeacherDetailPage() {
  // ===== MOCK DATA =====
  const teacher = {
    id: "t1",
    name: "Nguyễn Minh Anh",
    email: "minhanh.teacher@gmail.com",
    phone: "0909 123 456",
    avatarUrl: "",
    status: "active", // active / inactive
  };

  const [classes] = React.useState([
    {
      id: "c1",
      name: "IELTS Writing Task 2 - K12",
      students: 32,
      status: "active",
    },
    {
      id: "c2",
      name: "IELTS Writing Task 1 - Beginner",
      students: 18,
      status: "active",
    },
    {
      id: "c3",
      name: "IELTS Writing Intensive - Weekend",
      students: 24,
      status: "paused",
    },
  ]);

  const [q, setQ] = React.useState("");

  const filteredClasses = React.useMemo(() => {
    if (!q) return classes;
    const k = q.toLowerCase();
    return classes.filter((c) => c.name.toLowerCase().includes(k));
  }, [classes, q]);

  const totalStudents = React.useMemo(
    () => classes.reduce((sum, c) => sum + (c.students || 0), 0),
    [classes],
  );

  const statusChip = (status) => {
    if (status === "active")
      return (
        <Chip
          label="Active"
          size="small"
          sx={{
            borderRadius: 999,
            fontWeight: 950,
            bgcolor: "rgba(34,197,94,.12)",
            color: "#16A34A",
          }}
        />
      );

    return (
      <Chip
        label="Paused"
        size="small"
        sx={{
          borderRadius: 999,
          fontWeight: 950,
          bgcolor: "rgba(245,158,11,.12)",
          color: "#B45309",
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
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={() => alert("Back to teachers list")}
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
                  Teachers
                </Typography>
                <Typography
                  sx={{ color: "rgba(15,23,42,.35)", fontWeight: 900 }}
                >
                  /
                </Typography>
                <Typography
                  sx={{ color: ui.text, fontWeight: 950, fontSize: 13 }}
                >
                  {teacher.name}
                </Typography>

                <Chip
                  label={`${classes.length} lớp`}
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

              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "stretch", md: "center" }}
                justifyContent="space-between"
                spacing={2}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
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
                    <SchoolRoundedIcon />
                  </Box>

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
                      {teacher.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14, color: ui.muted }}>
                      Thông tin giáo viên, số học sinh và danh sách lớp đang đảm
                      nhiệm
                    </Typography>
                  </Box>
                </Stack>

                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    startIcon={<EditRoundedIcon />}
                    sx={{ fontWeight: 950, borderRadius: 3 }}
                    onClick={() => alert("Open edit teacher dialog")}
                  >
                    Sửa
                  </Button>

                  <Button
                    startIcon={<DeleteOutlineRoundedIcon />}
                    sx={{
                      fontWeight: 950,
                      borderRadius: 3,
                      color: "#EF4444",
                      border: "1px solid rgba(239,68,68,.25)",
                    }}
                    onClick={() => alert("Confirm delete teacher")}
                  >
                    Xóa
                  </Button>
                </Stack>
              </Stack>
            </Stack>

            {/* ===== CONTENT ===== */}
            <Grid container spacing={2.5}>
              {/* LEFT: profile */}
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
                      Thông tin giáo viên
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontSize: 13, color: ui.muted }}>
                      Hồ sơ & liên hệ.
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: ui.border }} />

                    <Stack spacing={2.2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          src={teacher.avatarUrl}
                          sx={{
                            width: 56,
                            height: 56,
                            fontWeight: 1000,
                            bgcolor: "rgba(2,132,199,.18)",
                            color: "#075985",
                          }}
                        >
                          {teacher.name?.[0]?.toUpperCase() || "T"}
                        </Avatar>

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{ fontWeight: 1000, color: ui.text }}
                            noWrap
                          >
                            {teacher.name}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{ mt: 0.6 }}
                          >
                            {teacher.status === "active" ? (
                              <Chip
                                label="Active"
                                size="small"
                                sx={{
                                  borderRadius: 999,
                                  fontWeight: 950,
                                  bgcolor: "rgba(34,197,94,.12)",
                                  color: "#16A34A",
                                }}
                              />
                            ) : (
                              <Chip
                                label="Inactive"
                                size="small"
                                sx={{
                                  borderRadius: 999,
                                  fontWeight: 950,
                                  bgcolor: "rgba(239,68,68,.12)",
                                  color: "#DC2626",
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      </Stack>

                      <Stack
                        spacing={1.2}
                        sx={{
                          p: 1.8,
                          borderRadius: 3,
                          border: "1px solid rgba(15,23,42,.08)",
                          bgcolor: "rgba(248,250,252,.6)",
                        }}
                      >
                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <MailOutlineRoundedIcon
                            sx={{ color: "rgba(15,23,42,.55)" }}
                          />
                          <Typography sx={{ fontWeight: 900, color: ui.text }}>
                            {teacher.email}
                          </Typography>
                        </Stack>

                        <Stack
                          direction="row"
                          spacing={1.2}
                          alignItems="center"
                        >
                          <LocalPhoneRoundedIcon
                            sx={{ color: "rgba(15,23,42,.55)" }}
                          />
                          <Typography sx={{ fontWeight: 900, color: ui.text }}>
                            {teacher.phone}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </CardContent>
                </LinearCard>
              </Grid>

              {/* RIGHT: stats + classes */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={2.5}>
                  {/* stats */}
                  <Grid container spacing={2}>
                    <Grid  size={{ xs: 12, md: 6 }}>
                      <StatCard
                        icon={<PeopleAltRoundedIcon />}
                        label="Số học sinh đang theo học"
                        value={totalStudents}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                      <StatCard
                        icon={<SchoolRoundedIcon />}
                        label="Số lớp đang đảm nhiệm"
                        value={classes.length}
                      />
                    </Grid>
                  </Grid>

                  {/* classes table */}
                  <LinearCard
                    sx={{
                      transition: "all .18s ease",
                      "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ px: 3, py: 2.2 }}>
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={1.6}
                          alignItems={{ xs: "stretch", md: "center" }}
                          justifyContent="space-between"
                        >
                          <Box>
                            <Typography
                              sx={{ fontWeight: 1000, color: ui.text }}
                            >
                              Các lớp đang đảm nhiệm
                            </Typography>
                            <Typography sx={{ fontSize: 13, color: ui.muted }}>
                              Danh sách lớp thuộc giáo viên này.
                            </Typography>
                          </Box>

                          <TextField
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Tìm lớp..."
                            size="small"
                            sx={{
                              width: { xs: "100%", md: 320 },
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
                        </Stack>
                      </Box>

                      <Divider sx={{ borderColor: ui.border }} />

                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{ fontWeight: 1000, color: ui.text }}
                            >
                              Lớp học
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: 1000, color: ui.text }}
                            >
                              Học sinh
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: 1000, color: ui.text }}
                            >
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
                          {filteredClasses.map((c) => (
                            <TableRow
                              key={c.id}
                              hover
                              sx={{
                                transition: "all .15s ease",
                                "&:hover": { bgcolor: "rgba(14,165,233,.05)" },
                              }}
                            >
                              <TableCell>
                                <Typography
                                  sx={{ fontWeight: 950, color: ui.text }}
                                >
                                  {c.name}
                                </Typography>
                                <Typography
                                  sx={{ fontSize: 13, color: ui.muted }}
                                >
                                  ID:{" "}
                                  <Box
                                    component="span"
                                    sx={{ fontFamily: "monospace" }}
                                  >
                                    {c.id}
                                  </Box>
                                </Typography>
                              </TableCell>

                              <TableCell
                                sx={{ fontWeight: 900, color: ui.text }}
                              >
                                {c.students}
                              </TableCell>

                              <TableCell>{statusChip(c.status)}</TableCell>

                              <TableCell align="right">
                                <Tooltip title="Xem chi tiết lớp">
                                  <IconButton
                                    onClick={() =>
                                      alert(`Go to class detail: ${c.id}`)
                                    }
                                    sx={{
                                      borderRadius: 2.5,
                                      border: "1px solid rgba(2,132,199,.22)",
                                      color: "#0284C7",
                                      transition: "all .15s ease",
                                      "&:hover": {
                                        transform: "translateY(-1px)",
                                      },
                                    }}
                                  >
                                    <VisibilityRoundedIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}

                          {filteredClasses.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={4} sx={{ py: 6 }}>
                                <Stack spacing={1} alignItems="center">
                                  <Typography
                                    sx={{ fontWeight: 1000, color: ui.text }}
                                  >
                                    Không có lớp phù hợp
                                  </Typography>
                                  <Typography
                                    sx={{ fontSize: 14, color: ui.muted }}
                                  >
                                    Hãy đổi từ khóa tìm kiếm.
                                  </Typography>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </LinearCard>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
