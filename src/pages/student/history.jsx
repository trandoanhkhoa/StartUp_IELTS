import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Select,
  MenuItem,
  Stack,
  Chip,
  Button,
  Fade,
} from "@mui/material";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import SortRoundedIcon from "@mui/icons-material/SortRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import { Link as RouterLink } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */

const submissions = [
  {
    id: 1,
    task: "Task 2",
    topic: "Some people believe technology makes life easier...",
    band: 6.5,
    date: "2026-01-28",
  },
  {
    id: 2,
    task: "Task 1",
    topic: "The bar chart shows the percentage of households...",
    band: 7.0,
    date: "2026-01-25",
  },
];

/* ---------------- UTIL ---------------- */

const bandColor = (band) => {
  if (band >= 7) return "success";
  if (band >= 5.5) return "warning";
  return "error";
};

/* ====================== PAGE ====================== */

export default function SubmissionHistory() {
  const [taskFilter, setTaskFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filteredData = useMemo(() => {
    let data = [...submissions];

    if (taskFilter !== "all") {
      data = data.filter((s) => s.task === taskFilter);
    }

    if (sortBy === "date") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      data.sort((a, b) => b.band - a.band);
    }

    return data;
  }, [taskFilter, sortBy]);

  return (
    <Fade in timeout={500}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 6 }}>
        <Container maxWidth="lg">
          {/* HEADER */}
          <Box
            mb={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Lịch sử bài viết
              </Typography>
              <Typography color="text.secondary">
                Xem lại tất cả các bài đã nộp và kết quả chấm
              </Typography>
            </Box>

            {/* FILTERS */}
            <Stack direction="row" spacing={2}>
              <Select
                size="small"
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                startAdornment={<FilterListRoundedIcon sx={{ mr: 1 }} />}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="all">Tất cả</MenuItem>
                <MenuItem value="Task 1">Task 1</MenuItem>
                <MenuItem value="Task 2">Task 2</MenuItem>
              </Select>

              <Select
                size="small"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                startAdornment={<SortRoundedIcon sx={{ mr: 1 }} />}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="date">Theo ngày</MenuItem>
                <MenuItem value="band">Theo điểm</MenuItem>
              </Select>
            </Stack>
          </Box>

          {/* CONTENT */}
          {filteredData.length === 0 ? (
            <Card sx={{ borderRadius: 3, py: 6 }}>
              <CardContent>
                <Stack spacing={2} alignItems="center">
                  <EditNoteRoundedIcon
                    sx={{ fontSize: 48, color: "text.disabled" }}
                  />
                  <Typography fontWeight={600}>Chưa có bài viết nào</Typography>
                  <Typography color="text.secondary">
                    Bắt đầu nộp bài để theo dõi tiến trình học tập
                  </Typography>

                  <Stack direction="row" spacing={2} mt={2}>
                    <Button
                      variant="contained"
                      component={RouterLink}
                      to="/submit/task1"
                      sx={{
                        bgcolor: "#0EA5E9",
                        textTransform: "none",
                        borderRadius: 2,
                        "&:hover": { bgcolor: "#0284C7" },
                      }}
                    >
                      Nộp Task 1
                    </Button>

                    <Button
                      variant="outlined"
                      component={RouterLink}
                      to="/submit/task2"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                      }}
                    >
                      Nộp Task 2
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {filteredData.map((item) => (
                <Grid size={{ xs: 12 }} key={item.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      transition: "0.2s",
                      "&:hover": {
                        bgcolor: "rgba(0,0,0,0.02)",
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography fontWeight={500} noWrap>
                          {item.topic}
                        </Typography>
                        <Typography fontSize={13} color="text.secondary">
                          {item.task} • {item.date}
                        </Typography>
                      </Box>

                      <Chip
                        label={`Band ${item.band}`}
                        color={bandColor(item.band)}
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Fade>
  );
}
