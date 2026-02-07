import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import {
  EditRounded,
  TrackChangesRounded,
  HistoryRounded,
  LightbulbRounded,
  ArrowForwardRounded,
  BoltRounded,
} from "@mui/icons-material";
import { useAuth } from "@/api/AuthContext.jsx";

const features = [
  {
    icon: TrackChangesRounded,
    title: "Chấm theo Band Descriptors",
    description:
      "Đánh giá chính xác theo 4 tiêu chí IELTS, sát với examiner thật.",
  },
  {
    icon: HistoryRounded,
    title: "Lưu lịch sử bài viết",
    description:
      "Theo dõi tiến độ, so sánh band score và xem lại feedback trước đó.",
  },
  {
    icon: LightbulbRounded,
    title: "Gợi ý cải thiện chi tiết",
    description:
      "Chỉ ra lỗi, highlight câu cần sửa và đề xuất cách viết tốt hơn.",
  },
];

const stats = [
  { value: "10K+", label: "Bài đã chấm" },
  { value: "4.8/5", label: "Đánh giá" },
  { value: "95%", label: "Độ chính xác" },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      {/* NAVBAR */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(248,250,252,0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Box
                width={34}
                height={34}
                borderRadius={2}
                bgcolor="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <EditRounded sx={{ color: "#fff", fontSize: 18 }} />
              </Box>
              <Typography fontWeight={600}>IELTS Grader</Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              {user ? (
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    component={RouterLink}
                    to="/login"
                    variant="contained"
                    endIcon={<ArrowForwardRounded />}
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      color: "#fff",
                      borderRadius: 2,
                      paddingY: 1.1,
                    }}
                  >
                    Đăng nhập
                  </Button>
                </>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* HERO */}
      <Container sx={{ pt: 20, pb: 14 }}>
        <Fade in timeout={600}>
          <Stack spacing={4} textAlign="center" alignItems="center">
            <Chip
              icon={<BoltRounded />}
              label="Chấm bài tức thì với AI"
              sx={{
                bgcolor: "#E0F2FE",
                color: "#0369A1",
                fontWeight: 500,
              }}
            />

            <Typography variant="h3" fontWeight={800} letterSpacing={-1}>
              Chấm IELTS Writing{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #38BDF8, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 800,
                }}
              >
                Task 1 & Task 2
              </Box>
              <br />
              Nhanh & Chính xác
            </Typography>

            <Typography color="text.secondary" fontSize={18} maxWidth={680}>
              Nhận band score và feedback chi tiết theo đúng tiêu chí IELTS chỉ
              trong vài giây. Phù hợp cho người tự học và giáo viên.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={user ? "/dashboard" : "/register"}
                endIcon={<ArrowForwardRounded />}
                sx={{
                  px: 4,
                  py: 1.4,
                  fontWeight: 600,
                  textTransform: "none",
                  color: "#fff",
                }}
              >
                {user ? "Đến Dashboard" : "Bắt đầu chấm bài"}
              </Button>

              <Button
                size="large"
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  px: 4,
                  py: 1.4,
                  textTransform: "none",
                }}
              >
                Đăng nhập
              </Button>
            </Stack>

            {/* STATS */}
            <Stack direction="row" spacing={8} pt={4}>
              {stats.map((s) => (
                <Box key={s.label} textAlign="center">
                  <Typography variant="h4" fontWeight={700} color="primary">
                    {s.value}
                  </Typography>
                  <Typography color="text.secondary">{s.label}</Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Fade>
      </Container>

      {/* FEATURES */}
      <Box
        sx={{
          background: "#E6F7F1",
          pb: 14,
          pt: 8,
          mb: 8,
        }}
      >
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
          Tính năng nổi bật
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          maxWidth={720}
          mx="auto"
        >
          Công cụ chấm bài IELTS Writing toàn diện cho{" "}
          <Box
            component="span"
            sx={{
              background: "linear-gradient(90deg, #38BDF8, #10B981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 600,
            }}
          >
            Task 1 &amp; Task 2
          </Box>
          , cung cấp phản hồi chi tiết theo tiêu chí Band Score, giúp bạn cải
          thiện điểm số nhanh chóng.
        </Typography>
        <Container>
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid key={f.title} size={{ xs: 12, md: 4 }}>
                <Fade in timeout={600 + i * 150}>
                  <Card
                    elevation={0}
                    sx={{
                      border: "1px solid #E2E8F0",
                      borderRadius: 3,
                      height: "100%",
                      backgroundColor: "#FFFFFF",
                      transition: "0.25s",
                      mt: 4,
                      "&:hover": {
                        borderColor: "primary.main",
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box
                        width={48}
                        height={48}
                        borderRadius={2}
                        bgcolor="#E0F2FE"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        mb={2}
                      >
                        <f.icon sx={{ color: "#0284C7" }} />
                      </Box>

                      <Typography fontWeight={600} mb={1}>
                        {f.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {f.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container sx={{ pb: 14 }}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            bgcolor: "primary.main",
            color: "#fff",
          }}
        >
          <CardContent sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h4" fontWeight={700} mb={2}>
              Sẵn sàng cải thiện điểm IELTS Writing?
            </Typography>
            <Typography sx={{ opacity: 0.9, mb: 4 }}>
              Đăng ký miễn phí và nhận feedback chuyên sâu ngay hôm nay.
            </Typography>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={user ? "/dashboard" : "/register"}
              endIcon={<ArrowForwardRounded />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                py: 1.3,
              }}
            >
              {user ? "Đến Dashboard" : "Đăng ký miễn phí"}
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* FOOTER */}
      <Divider />
      <Container sx={{ py: 4 }}>
        <Typography fontSize={14} color="text.secondary" textAlign="center">
          © 2024 IELTS Grader. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
