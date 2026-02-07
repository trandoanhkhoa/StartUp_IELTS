import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const StatCard = ({ icon, label, value, subLabel }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "rgba(15, 23, 42, 0.08)",
        bgcolor: "#fff",
        transition: "all .18s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 30px rgba(2, 6, 23, 0.08)",
          borderColor: "rgba(14, 165, 233, 0.35)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              display: "grid",
              placeItems: "center",
              bgcolor: "rgba(14, 165, 233, 0.12)",
              color: "#0284C7",
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontSize: 13,
                color: "rgba(15,23,42,.65)",
                fontWeight: 600,
                letterSpacing: 0.2,
              }}
            >
              {label}
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="baseline">
              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#0F172A",
                  lineHeight: 1.1,
                }}
              >
                {value}
              </Typography>

              {subLabel ? (
                <Typography sx={{ fontSize: 13, color: "rgba(15,23,42,.55)" }}>
                  {subLabel}
                </Typography>
              ) : null}
            </Stack>
          </Box>

          <Chip
            icon={<TrendingUpRoundedIcon sx={{ fontSize: 18 }} />}
            label="Updated"
            variant="outlined"
            sx={{
              height: 28,
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 12,
              borderColor: "rgba(14,165,233,.35)",
              color: "#0284C7",
              bgcolor: "rgba(14,165,233,.06)",
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default function AdminDashboard() {
  // mock data (sau này bạn fetch API là xong)
  const stats = {
    teachers: 12,
    students: 420,
    classes: 18,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F8FAFC", // off-white/slate
        py: { xs: 3, md: 5 },
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Stack spacing={1.5} sx={{ mb: 3.5 }}>
          <Typography
            sx={{
              fontSize: { xs: 22, md: 28 },
              fontWeight: 900,
              color: "#0F172A",
              letterSpacing: -0.4,
            }}
          >
            Dashboard
          </Typography>

          <Typography sx={{ color: "rgba(15,23,42,.62)", fontSize: 14 }}>
            Hiển thị tổng quan hệ thống: giáo viên, học sinh và số lớp hiện có.
          </Typography>

          <Divider sx={{ borderColor: "rgba(15,23,42,.08)" }} />
        </Stack>

        {/* Stats */}
        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              icon={<SchoolRoundedIcon />}
              label="Tổng giáo viên"
              value={stats.teachers}
              subLabel="teachers"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              icon={<PeopleAltRoundedIcon />}
              label="Tổng học sinh"
              value={stats.students}
              subLabel="students"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <StatCard
              icon={<ClassRoundedIcon />}
              label="Tổng số lớp"
              value={stats.classes}
              subLabel="classes"
            />
          </Grid>
        </Grid>

        {/* Section: placeholder (Notion/Linear style) */}
        <Card
          elevation={0}
          sx={{
            mt: 3,
            borderRadius: 4,
            border: "1px solid",
            borderColor: "rgba(15, 23, 42, 0.08)",
            bgcolor: "#fff",
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 900, color: "#0F172A" }}>
                Gợi ý tiếp theo
              </Typography>
              <Typography sx={{ fontSize: 14, color: "rgba(15,23,42,.62)" }}>
                Bạn có thể thêm chart (số bài nộp theo ngày), activity log, top
                lớp theo điểm trung bình...
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
