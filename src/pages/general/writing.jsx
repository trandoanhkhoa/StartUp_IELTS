import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userApi from "@/api/user_api/userApi.jsx";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Button,
  CssBaseline,
  Skeleton,
  Pagination,
  Stack,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function WritingPage() {
  //Animation

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const pageSize = 20;

  // filters
  const [search, setSearch] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");
  // const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await userApi.getallWritings({
        page,
        pageSize,
        status: "visible",
      });
      setData(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const res = await userApi.getallWritings({
        page,
        pageSize,
        search: search,
        taskType: taskFilter,
        source: sourceFilter,
        status: "visible",
      });
      setData(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [page]);
  const task1Types = [
    "Line Chart",
    "Bar Chart",
    "Map",
    "Process",
    "Mixed Chart",
    "Table",
  ];

  const task2Types = [
    "Agree or Disagree",
    "Discussion",
    "Advantages and Disadvantages",
    "Causes Problems and Solutions",
    "Part Question",
  ];

  const typeOptions =
    taskFilter === "Task 1"
      ? task1Types
      : taskFilter === "Task 2"
        ? task2Types
        : [];
  // ===== FILTER LOGIC =====
  // const filteredRows = (data.items || []).filter((row) => {
  //   const matchSearch = row.question
  //     ?.toLowerCase()
  //     .includes(search.toLowerCase());
  //   const matchTask = taskFilter === "all" || row.taskType === taskFilter;
  //   const matchType = typeFilter === "all" || row.type === typeFilter;
  //   const matchSource = sourceFilter === "all" || row.source === sourceFilter;
  //   const matchStatus =
  //     statusFilter === "all" ||
  //     (statusFilter === "visible" && !row.hide) ||
  //     (statusFilter === "hidden" && row.hide);
  //   return matchSearch && matchTask && matchType && matchSource && matchStatus;
  // });

  return (
    <>
      <CssBaseline />
      <Box sx={{ background: "#F8FAFC", minHeight: "100vh", py: 6 }}>
        {/* ===== Header ===== */}
        <Box sx={{ px: 3, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            IELTS Writing Library
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Browse official IELTS writing tasks.
          </Typography>
        </Box>

        {/* ===== Content ===== */}
        <Box sx={{ px: 3 }}>
          {/* ===== Filter Bar ===== */}
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              p: 1.5,
              border: "1px solid rgba(15,23,42,.08)",
              bgcolor: "background.paper",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              alignItems={{ xs: "stretch", md: "center" }}
            >
              {/* SEARCH BUTTON */}
              <Button
                fullWidth
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => handleSearch()}
                sx={{
                  width: { xs: "100%", md: "auto" },
                  borderRadius: 3,
                  textTransform: "none",
                  px: 3,
                  bgcolor: "#0EA5E9",
                  "&:hover": {
                    bgcolor: "#0284C7",
                  },
                }}
              >
                Tìm kiếm
              </Button>

              {/* SEARCH INPUT */}
              <TextField
                size="small"
                placeholder="Search question..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                sx={{
                  flex: { md: 1 },
                  minWidth: { md: 280 },
                  maxWidth: { md: 520 },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                    bgcolor: "#F8FAFC",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Task Filter */}
              <TextField
                select
                size="small"
                value={taskFilter}
                onChange={(e) => {
                  setTaskFilter(e.target.value);
                  setTypeFilter("all");
                }}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="all">Loại bài</MenuItem>
                <MenuItem value="Task 1">Task 1</MenuItem>
                <MenuItem value="Task 2">Task 2</MenuItem>
              </TextField>

              {/* Type Filter */}
              <TextField
                select
                size="small"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ minWidth: 220 }}
                disabled={taskFilter === "all"}
              >
                <MenuItem value="all">Dạng bài</MenuItem>
                {typeOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              {/* Source Filter */}
              <TextField
                select
                size="small"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="all">Nguồn</MenuItem>
                <MenuItem value="Cambridge">Cambridge</MenuItem>
                <MenuItem value="IELTS Collection">IELTS Collection</MenuItem>
              </TextField>

              <Box flex={1} />

              <Typography variant="caption" color="text.secondary">
                {data.length} Kết quả
              </Typography>
            </Stack>
          </Paper>

          {/* ===== Writing Topic ===== */}
          <Grid container spacing={2}>
            {(loading ? Array.from(new Array(pageSize)) : data).map(
              (item, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  {loading ? (
                    <Skeleton
                      variant="rounded"
                      height={130}
                      sx={{ borderRadius: 3 }}
                    />
                  ) : (
                    <Card
                      sx={{
                        position: "relative",
                        display: "flex",
                        borderRadius: 3,
                        overflow: "hidden",
                        background: "#fff",
                        border: "1px solid #E2E8F0",
                        transition: "all 0.35s ease",
                        cursor: "pointer",

                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
                          borderColor: "#0EA5E9",
                        },

                        "&:hover .hoverOverlay": {
                          opacity: 1,
                          transform: "translateY(0)",
                          pointerEvents: "auto",
                        },
                      }}
                    >
                      {/* IMAGE LEFT */}
                      <CardMedia
                        component="img"
                        image={item?.imageUrl}
                        alt={item?.title}
                        sx={{
                          width: 140,
                          height: 130,
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />

                      {/* RIGHT CONTENT */}
                      <CardContent sx={{ flex: 1 }}>
                        <Stack spacing={1}>
                          <Stack direction="row" spacing={1}>
                            <Chip label={item?.taskType} size="small" />
                            <Chip
                              label={item?.type}
                              size="small"
                              variant="outlined"
                            />
                          </Stack>

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item?.title}
                          </Typography>

                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Source: {item?.source}
                          </Typography>
                        </Stack>
                      </CardContent>

                      {/* ===== HOVER OVERLAY ===== */}
                      <Link
                        to={`/writingtest/${item.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Box
                          className="hoverOverlay"
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(255,255,255,0.98)",
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            opacity: 0,
                            transform: "translateY(10px)",
                            pointerEvents: "none",
                            transition: "all 0.35s ease",
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: 14,
                              lineHeight: 1.6,
                              color: "#334155",
                              overflowY: "auto",
                            }}
                          >
                            {item?.question}
                          </Typography>

                          <Button
                            variant="contained"
                            sx={{
                              mt: 2,
                              alignSelf: "flex-end",
                              borderRadius: 2,
                              textTransform: "none",
                            }}
                          >
                            Làm bài
                          </Button>
                        </Box>
                      </Link>
                    </Card>
                  )}
                </Grid>
              ),
            )}
          </Grid>

          {/* ===== Pagination ===== */}

          {!loading && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 2 }}
            >
              <Typography variant="caption" color="text.secondary">
                Page {page} / {totalPages}
              </Typography>

              <Pagination
                page={page}
                count={totalPages}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
              />
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}
