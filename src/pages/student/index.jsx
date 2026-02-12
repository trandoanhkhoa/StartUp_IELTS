import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
  Avatar,
  Skeleton,
  Fade,
} from "@mui/material";
import {
  ArrowForward,
  EditNote,
  BarChartRounded,
  MenuBookRounded,
  TrendingUpRounded,
  Article,
  BarChart,
  MenuBook,
} from "@mui/icons-material";

/* ---------------- MOCK DATA (replace by API later) ---------------- */

const mockStats = {
  total: 12,
  avgBand: 6.5,
  task1: 5,
  task2: 7,
};

const mockSubmissions = [
  {
    id: 1,
    task: "Task 2",
    topic: "Some people believe technology makes life easier...",
    band: 6.5,
    date: "2026-01-28",
    words: 278,
  },
  {
    id: 2,
    task: "Task 1",
    topic: "The bar chart shows the percentage of...",
    band: 7.0,
    date: "2026-01-25",
    words: 182,
  },
];

/* ---------------- UTIL ---------------- */

const bandColor = (band) => {
  if (band >= 7) return "success";
  if (band >= 5.5) return "warning";
  return "error";
};

/* ====================== DASHBOARD ====================== */

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600); // fake loading
  }, []);
  // useEffect(() => {
  //   const checkRole = async () => {
  //     const res = await userApi.checkRole();
  //     console.log(res.data);
  //   };
  //   checkRole();
  // }, []);

  return (
    <Fade in timeout={600}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 6 }}>
        <Container maxWidth={false}>
          {/* HEADER */}
          <Box mb={6}>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ letterSpacing: "-0.02em" }}
            >
              Dashboard
            </Typography>
            <Typography color="text.secondary" mt={1}>
              Theo dõi tiến trình luyện viết IELTS của bạn
            </Typography>
          </Box>

          <Grid
            container
            spacing={3}
            sx={{
              mb: 6,
              alignItems: "stretch",
            }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stat
                title="Tổng bài đã nộp"
                value="—"
                subtitle="Tất cả các bài viết"
                highlight
                icon={<Article fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stat
                title="Điểm trung bình"
                value="—"
                subtitle="Overall band score"
                highlight
                icon={<TrendingUpRounded fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stat
                title="Task 1"
                value="—"
                subtitle="Bài mô tả dữ liệu"
                highlight
                icon={<BarChart fontSize="small" />}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Stat
                title="Task 2"
                value="—"
                subtitle="Bài luận"
                highlight
                icon={<MenuBook fontSize="small" />}
              />
            </Grid>
          </Grid>
          {/* ACTIONS */}
          <Grid container spacing={3} mb={6}>
            <ActionCard
              title="Write Task 1"
              desc="Describe charts, processes (150+ words)"
              icon={<BarChartRounded />}
              to="/submit/task1"
            />
            <ActionCard
              title="Write Task 2"
              desc="Essay writing (250+ words)"
              icon={<MenuBookRounded />}
              to="/submit/task2"
            />
          </Grid>
          <Typography fontWeight={600} mb={2}>
            Recent submissions
          </Typography>

          <Stack spacing={2}>
            {loading
              ? [1, 2].map((i) => <Skeleton key={i} height={72} />)
              : mockSubmissions.map((s) => (
                  <SubmissionRow key={s.id} data={s} />
                ))}
          </Stack>
        </Container>
      </Box>
    </Fade>
  );
}

/* ====================== COMPONENTS ====================== */
function Stat({
  title,
  value,
  subtitle = "Overall band score",
  highlight,
  icon = <TrendingUpRounded />,
}) {
  return (
    <Card
      sx={{
        flex: 1, // Quan trọng: cho phép card mở rộng
        height: "100%", // Đảm bảo chiều cao đồng đều
        borderRadius: 3,
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        borderColor: "#e5e7eb",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          display="flex"
          alignItems="flex-start" // Đổi từ center thành flex-start
          justifyContent="space-between"
          mb={1}
          flexShrink={0} // Không bị co lại
        >
          <Typography color="text.secondary" fontSize={13} fontWeight={500}>
            {title}
          </Typography>

          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: "#E0F2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0284C7",
              flexShrink: 0, // Không bị co lại
              ml: 1, // Thêm khoảng cách với text
            }}
          >
            {icon}
          </Box>
        </Box>

        {/* Value - chiếm không gian còn lại */}
        <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              fontFamily: "monospace",
              color: highlight ? "#0EA5E9" : "inherit",
            }}
          >
            {value || "—"}
          </Typography>
        </Box>

        {/* Subtitle */}
        <Typography
          fontSize={13}
          color="text.secondary"
          flexShrink={0} // Không bị co lại
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

function ActionCard({ title, desc, icon, to }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Card
        sx={{
          borderRadius: 3,
          transition: "0.25s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Avatar
              sx={{
                bgcolor: "#E0F2FE",
                color: "#0284C7",
                mb: 1,
              }}
            >
              {icon}
            </Avatar>
            <Typography fontWeight={600}>{title}</Typography>
            <Typography color="text.secondary" fontSize={14}>
              {desc}
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            component={RouterLink}
            to={to}
            sx={{
              color: "#FFFFFF",
              bgcolor: "#0EA5E9",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { bgcolor: "#0284C7" },
            }}
          >
            Bắt đầu
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

function SubmissionRow({ data }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        "&:hover": { bgcolor: "rgba(0,0,0,0.02)" },
        overflow: "visible",
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 1.5, sm: 2 },
            width: "100%",
          }}
        >
          {/* Content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Typography
              fontWeight={500}
              sx={{
                fontSize: { xs: "0.95rem", sm: "1rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                mb: 0.5,
              }}
            >
              {data.topic}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <Box component="span">{data.task}</Box>
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                •
              </Box>
              <Box component="span">{data.words} words</Box>
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                •
              </Box>
              <Box component="span">{data.date}</Box>
            </Typography>
          </Box>

          {/* Chip */}
          <Box
            sx={{
              alignSelf: { xs: "flex-start", sm: "center" },
              flexShrink: 0,
            }}
          >
            <Chip
              label={`Band ${data.band}`}
              color={bandColor(data.band)}
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                px: { xs: 1, sm: 1.5 },
              }}
            />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
