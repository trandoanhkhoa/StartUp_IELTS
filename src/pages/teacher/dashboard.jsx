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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

const PRIMARY = "#0EA5E9";

const mockTeacher = {
  name: "Teacher",
  email: "teacher@ielts.ai",
};

const mockClasses = [
  {
    id: "c1",
    name: "IELTS Writing - Basic A1",
    totalStudents: 18,
    startDate: "2026-01-10",
    endDate: "2026-03-10",
  },
  {
    id: "c2",
    name: "IELTS Writing - Task 2 Intensive",
    totalStudents: 26,
    startDate: "2026-01-22",
    endDate: "2026-04-01",
  },
  {
    id: "c3",
    name: "IELTS Writing - Advanced",
    totalStudents: 14,
    startDate: "2026-02-01",
    endDate: "2026-04-20",
  },
  {
    id: "c4",
    name: "IELTS Writing - Task 1 Core",
    totalStudents: 21,
    startDate: "2026-02-05",
    endDate: "2026-03-25",
  },
];

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getStatus(startDate, endDate) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "active";
}

function StatusChip({ startDate, endDate }) {
  const status = getStatus(startDate, endDate);

  if (status === "active")
    return (
      <Chip
        size="small"
        label="Đang học"
        color="success"
        sx={{ fontWeight: 900 }}
      />
    );

  if (status === "upcoming")
    return (
      <Chip
        size="small"
        label="Sắp khai giảng"
        color="warning"
        sx={{ fontWeight: 900 }}
      />
    );

  return (
    <Chip
      size="small"
      label="Đã kết thúc"
      color="error"
      sx={{ fontWeight: 900 }}
    />
  );
}

function StatCard({ icon, label, value, sub }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(10px)",
        transition: "all 0.18s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 18px 50px rgba(2,6,23,0.08)",
        },
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                bgcolor: "rgba(14,165,233,0.12)",
                color: PRIMARY,
              }}
            >
              {icon}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {label}
              </Typography>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900, letterSpacing: -0.4, lineHeight: 1.1 }}
              >
                {value}
              </Typography>
              {sub && (
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {sub}
                </Typography>
              )}
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function TeacherDashboard() {
  const [classes] = useState(mockClasses);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("start_desc");

  const totalClasses = classes.length;

  const totalStudents = useMemo(() => {
    // tổng HS của tất cả lớp đang đảm nhiệm
    return classes.reduce((sum, c) => sum + (c.totalStudents || 0), 0);
  }, [classes]);

  const filteredClasses = useMemo(() => {
    let list = [...classes];

    // search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.name.toLowerCase().includes(q));
    }

    // filter status
    if (statusFilter !== "all") {
      list = list.filter(
        (c) => getStatus(c.startDate, c.endDate) === statusFilter,
      );
    }

    // sort
    list.sort((a, b) => {
      const aStart = new Date(a.startDate).getTime();
      const bStart = new Date(b.startDate).getTime();
      const aEnd = new Date(a.endDate).getTime();
      const bEnd = new Date(b.endDate).getTime();

      switch (sortBy) {
        case "start_asc":
          return aStart - bStart;
        case "start_desc":
          return bStart - aStart;
        case "end_asc":
          return aEnd - bEnd;
        case "end_desc":
          return bEnd - aEnd;
        case "students_desc":
          return (b.totalStudents || 0) - (a.totalStudents || 0);
        default:
          return 0;
      }
    });

    return list;
  }, [classes, search, statusFilter, sortBy]);

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
        <Container maxWidth="xl">
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
                <DashboardRoundedIcon />
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
                  Teacher Dashboard
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Xin chào <b>{mockTeacher.name}</b> — quản lý lớp học & học
                  sinh nhanh gọn.
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1.2} alignItems="center">
              <Tooltip title="Làm mới">
                <IconButton
                  sx={{
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(255,255,255,0.85)",
                  }}
                  onClick={() => window.location.reload()}
                >
                  <RefreshRoundedIcon />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<OpenInNewRoundedIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: 900,
                  borderRadius: 2.5,
                  bgcolor: PRIMARY,
                  boxShadow: "0 14px 30px rgba(14,165,233,0.22)",
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                Tạo lớp mới
              </Button>
            </Stack>
          </Stack>

          {/* STATS */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              mb: 3,
            }}
          >
            <StatCard
              icon={<GroupsRoundedIcon />}
              label="Tổng số lượng học sinh"
              value={totalStudents}
              sub="Tổng số HS của các lớp đang đảm nhiệm"
            />

            <StatCard
              icon={<SchoolRoundedIcon />}
              label="Tổng số lượng lớp"
              value={totalClasses}
              sub="Số lớp teacher đang phụ trách"
            />

            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 2.25 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Trạng thái lớp
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ mt: 1, flexWrap: "wrap" }}
                >
                  <Chip
                    size="small"
                    color="success"
                    label="Đang học"
                    sx={{ fontWeight: 900 }}
                  />
                  <Chip
                    size="small"
                    color="warning"
                    label="Sắp khai giảng"
                    sx={{ fontWeight: 900 }}
                  />
                  <Chip
                    size="small"
                    color="error"
                    label="Đã kết thúc"
                    sx={{ fontWeight: 900 }}
                  />
                </Stack>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Accent màu theo trạng thái giúp teacher nhìn nhanh như
                  Grammarly/Linear.
                </Typography>
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,0.82)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 2.25 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Email
                </Typography>
                <Typography
                  sx={{
                    mt: 0.75,
                    fontWeight: 900,
                    letterSpacing: -0.2,
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  }}
                >
                  {mockTeacher.email}
                </Typography>

                <Divider sx={{ my: 1.5 }} />

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Typography monospace giống editor style.
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* TABLE CARD */}
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
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 950, letterSpacing: -0.25 }}>
                    Các lớp đang đảm nhiệm
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Xem chi tiết tất cả lớp: số lượng học sinh, ngày khai giảng,
                    ngày kết thúc.
                  </Typography>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1}
                  alignItems="center"
                >
                  <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    placeholder="Tìm tên lớp..."
                    sx={{
                      width: { xs: "100%", sm: 300 },
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

                  <FormControl size="small" sx={{ minWidth: 170 }}>
                    <InputLabel>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FilterAltRoundedIcon fontSize="small" />
                        <span>Trạng thái</span>
                      </Stack>
                    </InputLabel>
                    <Select
                      value={statusFilter}
                      label="Trạng thái"
                      onChange={(e) => setStatusFilter(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="all">Tất cả</MenuItem>
                      <MenuItem value="active">Đang học</MenuItem>
                      <MenuItem value="upcoming">Sắp khai giảng</MenuItem>
                      <MenuItem value="ended">Đã kết thúc</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl size="small" sx={{ minWidth: 170 }}>
                    <InputLabel>Sắp xếp</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sắp xếp"
                      onChange={(e) => setSortBy(e.target.value)}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="start_desc">
                        Khai giảng (mới nhất)
                      </MenuItem>
                      <MenuItem value="start_asc">
                        Khai giảng (cũ nhất)
                      </MenuItem>
                      <MenuItem value="end_desc">Kết thúc (mới nhất)</MenuItem>
                      <MenuItem value="end_asc">Kết thúc (cũ nhất)</MenuItem>
                      <MenuItem value="students_desc">
                        Số HS (cao → thấp)
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Stack>

              <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                  borderRadius: 2.5,
                  border: "1px solid",
                  borderColor: "divider",
                  overflow: "hidden",
                }}
              >
                <Table
                  sx={{
                    tableLayout: "fixed",
                    width: "100%",
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": {
                          bgcolor: "rgba(2,6,23,0.02)",
                          fontWeight: 950,
                          color: "text.secondary",
                          borderBottom: "1px solid rgba(2,6,23,0.08)",
                        },
                      }}
                    >
                      <TableCell sx={{ width: 70 }}>STT</TableCell>
                      <TableCell>Tên lớp</TableCell>
                      <TableCell sx={{ width: 170 }}>Tổng học sinh</TableCell>
                      <TableCell sx={{ width: 170 }}>Khai giảng</TableCell>
                      <TableCell sx={{ width: 170 }}>Kết thúc</TableCell>
                      <TableCell sx={{ width: 160 }}>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredClasses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <Box sx={{ py: 6, textAlign: "center" }}>
                            <Typography sx={{ fontWeight: 950, mb: 0.5 }}>
                              Không có lớp phù hợp
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "text.secondary" }}
                            >
                              Thử đổi bộ lọc hoặc tìm kiếm tên lớp khác.
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClasses.map((c, idx) => (
                        <TableRow
                          key={c.id}
                          hover
                          sx={{
                            transition: "all 0.15s ease",
                            "&:hover": {
                              bgcolor: "rgba(14,165,233,0.06)",
                            },
                          }}
                        >
                          <TableCell>
                            <Typography sx={{ fontWeight: 900 }}>
                              {idx + 1}
                            </Typography>
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
                                  borderRadius: 2.2,
                                  bgcolor: "rgba(14,165,233,0.12)",
                                  color: PRIMARY,
                                  fontWeight: 900,
                                }}
                              >
                                {c.name?.slice(0, 1)?.toUpperCase()}
                              </Avatar>

                              <Box sx={{ minWidth: 0 }}>
                                <Typography
                                  sx={{
                                    fontWeight: 950,
                                    letterSpacing: -0.2,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {c.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  sx={{ color: "text.secondary" }}
                                >
                                  ID:{" "}
                                  <span
                                    style={{
                                      fontFamily:
                                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                                    }}
                                  >
                                    {c.id}
                                  </span>
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          <TableCell>
                            <Chip
                              label={`${c.totalStudents} học sinh`}
                              sx={{
                                fontWeight: 950,
                                borderRadius: 2,
                                bgcolor: "rgba(2,6,23,0.05)",
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Typography sx={{ fontWeight: 800 }}>
                              {formatDate(c.startDate)}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <Typography sx={{ fontWeight: 800 }}>
                              {formatDate(c.endDate)}
                            </Typography>
                          </TableCell>

                          <TableCell>
                            <StatusChip
                              startDate={c.startDate}
                              endDate={c.endDate}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Divider sx={{ mt: 2 }} />

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mt: 1.5 }}
              >
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  Tổng hiển thị: <b>{filteredClasses.length}</b> lớp
                </Typography>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Badge
                    badgeContent={filteredClasses.length}
                    color="primary"
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary" }}
                  >
                    Đã lọc theo điều kiện
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Fade>
  );
}
