import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";

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
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        bgcolor: ui.card,
        border: "1px solid",
        borderColor: ui.border,
        overflow: "hidden",
        transition: "all .18s ease",
        "&:hover": { boxShadow: "0 16px 50px rgba(2,6,23,.06)" },
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

function DifficultyChip({ value }) {
  if (value === "easy")
    return (
      <Chip
        size="small"
        label="Easy"
        sx={{
          borderRadius: 999,
          fontWeight: 1000,
          bgcolor: "rgba(34,197,94,.12)",
          color: "#16A34A",
        }}
      />
    );
  if (value === "medium")
    return (
      <Chip
        size="small"
        label="Medium"
        sx={{
          borderRadius: 999,
          fontWeight: 1000,
          bgcolor: "rgba(245,158,11,.14)",
          color: "#B45309",
        }}
      />
    );
  return (
    <Chip
      size="small"
      label="Hard"
      sx={{
        borderRadius: 999,
        fontWeight: 1000,
        bgcolor: "rgba(239,68,68,.12)",
        color: "#DC2626",
      }}
    />
  );
}

function ListeningCard({ item }) {
  return (
    <LinearCard
      sx={{
        height: "100%",
        cursor: "pointer",
        "&:hover .thumb": { transform: "scale(1.03)" },
        "&:hover .play": { opacity: 1, transform: "translateY(0px)" },
      }}
    >
      {/* Thumbnail */}
      <Box
        sx={{
          height: 120,
          position: "relative",
          overflow: "hidden",
          bgcolor: "rgba(14,165,233,.08)",
        }}
      >
        <Box
          className="thumb"
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.0)",
            transition: "transform .22s ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,6,23,.12) 0%, rgba(2,6,23,.52) 100%)",
          }}
        />

        {/* Section */}
        <Chip
          label={`Section ${item.section}`}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            borderRadius: 999,
            fontWeight: 900,
            bgcolor: "rgba(255,255,255,.85)",
          }}
        />

        {/* Duration */}
        <Chip
          label={item.duration}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            borderRadius: 999,
            fontWeight: 1000,
            bgcolor: "rgba(15,23,42,.55)",
            color: "#fff",
          }}
        />

        {/* Play preview */}
        <Box
          className="play"
          sx={{
            position: "absolute",
            left: 10,
            bottom: 10,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.8,
            px: 1.2,
            py: 0.6,
            borderRadius: 999,
            bgcolor: "rgba(255,255,255,.88)",
            fontWeight: 1000,
            opacity: 0,
            transform: "translateY(6px)",
            transition: "all .18s ease",
          }}
        >
          <PlayCircleOutlineRoundedIcon sx={{ color: ui.primary }} />
          <Typography sx={{ fontSize: 12.5, fontWeight: 1000, color: ui.text }}>
            Preview
          </Typography>
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            fontWeight: 1000,
            color: ui.text,
            lineHeight: 1.25,
            letterSpacing: -0.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            minHeight: 44,
          }}
        >
          {item.title}
        </Typography>

        <Stack direction="row" sx={{ mt: 1, flexWrap: "wrap" }}>
          {item.questionTypes.slice(0, 3).map((t) => (
            <Chip
              key={t}
              size="small"
              label={t}
              sx={{
                borderRadius: 999,
                fontWeight: 900,
                bgcolor: "rgba(15,23,42,.06)",
                color: "rgba(15,23,42,.78)",
              }}
            />
          ))}
          {item.questionTypes.length > 3 && (
            <Chip
              size="small"
              label={`+${item.questionTypes.length - 3}`}
              sx={{
                borderRadius: 999,
                fontWeight: 1000,
                bgcolor: "rgba(14,165,233,.10)",
                color: "#0284C7",
              }}
            />
          )}
        </Stack>

        <Divider sx={{ my: 1.6, borderColor: ui.border }} />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography sx={{ fontSize: 13, color: ui.muted, fontWeight: 800 }}>
            Source: {item.source}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <DifficultyChip value={item.difficulty} />
          <Chip
            size="small"
            label={`${item.attempts} lượt làm`}
            sx={{
              borderRadius: 999,
              fontWeight: 1000,
              bgcolor: "rgba(2,132,199,.10)",
              color: "#0284C7",
            }}
          />
        </Stack>
      </Box>
    </LinearCard>
  );
}

function CommentItem({ c }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.6,
        borderRadius: 3,
        border: "1px solid",
        borderColor: ui.border,
        bgcolor: "#fff",
        transition: "all .15s ease",
        "&:hover": { bgcolor: "rgba(15,23,42,.02)" },
      }}
    >
      <Stack direction="row" spacing={1.2} alignItems="flex-start">
        <Avatar src={c.avatar} sx={{ width: 34, height: 34 }} />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: 1000, color: ui.text }} noWrap>
              {c.name}
            </Typography>
            <Typography sx={{ fontSize: 12.5, color: ui.muted }} noWrap>
              • {c.time}
            </Typography>
          </Stack>

          <Typography
            sx={{ mt: 0.5, fontSize: 14, color: "rgba(15,23,42,.86)" }}
          >
            {c.content}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              size="small"
              startIcon={<ThumbUpAltOutlinedIcon />}
              sx={{ fontWeight: 950, borderRadius: 3 }}
            >
              Like ({c.likes})
            </Button>
            <Button
              size="small"
              startIcon={<ChatBubbleOutlineRoundedIcon />}
              sx={{ fontWeight: 950, borderRadius: 3 }}
            >
              Reply
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

export default function ListeningPage() {
  // ===== Mock data =====
  const listenings = React.useMemo(
    () =>
      Array.from({ length: 24 }).map((_, idx) => ({
        id: idx + 1,
        title:
          idx % 2 === 0
            ? `Campus Tour & Student Services (Set ${idx + 1})`
            : `Business Meeting & Project Updates (Set ${idx + 1})`,
        attempts: Math.floor(Math.random() * 1400) + 5,
        section: (idx % 4) + 1,
        source:
          idx % 3 === 0
            ? "Cambridge"
            : idx % 3 === 1
              ? "British Council"
              : "IDP",
        difficulty: idx % 3 === 0 ? "easy" : idx % 3 === 1 ? "medium" : "hard",
        duration:
          idx % 4 === 0
            ? "09:40"
            : idx % 4 === 1
              ? "12:10"
              : idx % 4 === 2
                ? "07:55"
                : "10:30",
        questionTypes:
          idx % 3 === 0
            ? ["Form completion", "Multiple choice", "Map labeling"]
            : idx % 3 === 1
              ? [
                  "Sentence completion",
                  "Matching",
                  "Table completion",
                  "Short answers",
                ]
              : ["MCQ", "Flow-chart completion", "Note completion"],
        image:
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60",
      })),
    [],
  );

  const comments = React.useMemo(
    () => [
      {
        id: 1,
        name: "Nguyễn Minh Anh",
        time: "1 giờ trước",
        likes: 8,
        avatar: "",
        content:
          "Section 2 có đoạn nói nhanh quá 😭 mọi người có tips nghe map labeling không?",
      },
      {
        id: 2,
        name: "Trần Quốc Bảo",
        time: "Hôm qua",
        likes: 3,
        avatar: "",
        content:
          "Mình recommend nghe keyword trước, không cố nghe full sentence. Map labeling thì focus hướng (left/right/opposite).",
      },
    ],
    [],
  );

  // ===== Filters =====
  const [search, setSearch] = React.useState("");
  const [section, setSection] = React.useState("all");
  const [source, setSource] = React.useState("all");
  const [qType, setQType] = React.useState("all");
  const [difficulty, setDifficulty] = React.useState("all");
  const [sort, setSort] = React.useState("popular");

  const resetFilters = () => {
    setSearch("");
    setSection("all");
    setSource("all");
    setQType("all");
    setDifficulty("all");
    setSort("popular");
  };

  const filtered = listenings
    .filter((r) => {
      const okSearch =
        !search || r.title.toLowerCase().includes(search.toLowerCase());
      const okSection = section === "all" || r.section === Number(section);
      const okSource = source === "all" || r.source === source;
      const okQType =
        qType === "all" || r.questionTypes.some((t) => t === qType);
      const okDiff = difficulty === "all" || r.difficulty === difficulty;
      return okSearch && okSection && okSource && okQType && okDiff;
    })
    .sort((a, b) => {
      if (sort === "popular") return b.attempts - a.attempts;
      return b.id - a.id;
    });

  // ===== Comments input =====
  const [newComment, setNewComment] = React.useState("");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Fade in timeout={450}>
          <Box>
            {/* Header */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              justifyContent="space-between"
              alignItems={{ xs: "stretch", md: "center" }}
              sx={{ mb: 2 }}
            >
              <Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <HeadphonesRoundedIcon sx={{ color: ui.primary }} />
                  <Typography
                    sx={{
                      fontSize: { xs: 22, md: 28 },
                      fontWeight: 1000,
                      color: ui.text,
                      letterSpacing: -0.5,
                    }}
                  >
                    Listening
                  </Typography>
                </Stack>
                <Typography sx={{ fontSize: 14, color: ui.muted, mt: 0.5 }}>
                  Danh sách bài Listening — lọc theo section, nguồn, dạng câu
                  hỏi, độ khó và thảo luận.
                </Typography>
              </Box>

              <Stack direction="row" spacing={1.5} alignItems="center">
                <TextField
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm bài listening..."
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

                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    sx={{ borderRadius: 3, bgcolor: "#fff", fontWeight: 900 }}
                  >
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            {/* Filters */}
            <LinearCard sx={{ mb: 2 }}>
              <Box sx={{ px: 2.5, py: 2 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  spacing={1.5}
                  alignItems={{ xs: "stretch", md: "center" }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TuneRoundedIcon sx={{ color: "rgba(15,23,42,.55)" }} />
                    <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                      Filters
                    </Typography>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.2}
                    sx={{ flex: 1 }}
                  >
                    <FormControl size="small" fullWidth>
                      <Select
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        sx={{ borderRadius: 3, bgcolor: "#fff" }}
                      >
                        <MenuItem value="all">All sections</MenuItem>
                        <MenuItem value="1">Section 1</MenuItem>
                        <MenuItem value="2">Section 2</MenuItem>
                        <MenuItem value="3">Section 3</MenuItem>
                        <MenuItem value="4">Section 4</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
                      <Select
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        sx={{ borderRadius: 3, bgcolor: "#fff" }}
                      >
                        <MenuItem value="all">All sources</MenuItem>
                        <MenuItem value="Cambridge">Cambridge</MenuItem>
                        <MenuItem value="British Council">
                          British Council
                        </MenuItem>
                        <MenuItem value="IDP">IDP</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
                      <Select
                        value={qType}
                        onChange={(e) => setQType(e.target.value)}
                        sx={{ borderRadius: 3, bgcolor: "#fff" }}
                      >
                        <MenuItem value="all">All question types</MenuItem>
                        <MenuItem value="Form completion">
                          Form completion
                        </MenuItem>
                        <MenuItem value="Map labeling">Map labeling</MenuItem>
                        <MenuItem value="Matching">Matching</MenuItem>
                        <MenuItem value="Multiple choice">
                          Multiple choice
                        </MenuItem>
                        <MenuItem value="Table completion">
                          Table completion
                        </MenuItem>
                        <MenuItem value="Short answers">Short answers</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
                      <Select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        sx={{ borderRadius: 3, bgcolor: "#fff" }}
                      >
                        <MenuItem value="all">All difficulty</MenuItem>
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>

                  <Tooltip title="Reset filters">
                    <IconButton
                      onClick={resetFilters}
                      sx={{
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: ui.border,
                      }}
                    >
                      <RestartAltRoundedIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </LinearCard>

            {/* Main */}
            <Grid container spacing={2}>
              {/* Listening list */}
              <Grid size={{ xs: 12, md: 8.5 }}>
                <LinearCard>
                  <Box sx={{ px: 3, py: 2 }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                        Danh sách bài Listening
                      </Typography>
                      <Chip
                        label={`${filtered.length} bài`}
                        sx={{
                          borderRadius: 999,
                          fontWeight: 1000,
                          bgcolor: "rgba(14,165,233,.10)",
                          color: "#0284C7",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Divider sx={{ borderColor: ui.border }} />

                  <Box sx={{ p: 2.2 }}>
                    {/* 4 cards per row */}
                    <Grid container spacing={2}>
                      {filtered.map((item) => (
                        <Grid
                          key={item.id}
                          size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                        >
                          <ListeningCard item={item} />
                        </Grid>
                      ))}
                    </Grid>

                    {filtered.length === 0 && (
                      <Box sx={{ py: 6, textAlign: "center" }}>
                        <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                          Không tìm thấy bài phù hợp
                        </Typography>
                        <Typography sx={{ mt: 0.5, color: ui.muted }}>
                          Thử đổi filter hoặc từ khóa.
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </LinearCard>
              </Grid>

              {/* Comments */}
              <Grid size={{ xs: 12, md: 3.5 }}>
                <LinearCard sx={{ position: "sticky", top: 18 }}>
                  <Box sx={{ px: 3, py: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <ChatBubbleOutlineRoundedIcon
                        sx={{ color: "rgba(15,23,42,.55)" }}
                      />
                      <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                        Bình luận
                      </Typography>
                    </Stack>
                    <Typography sx={{ fontSize: 13, color: ui.muted, mt: 0.5 }}>
                      Thảo luận / hỏi đáp về bài listening.
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: ui.border }} />

                  {/* Comment input */}
                  <Box sx={{ p: 2 }}>
                    <TextField
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Viết bình luận..."
                      multiline
                      minRows={3}
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          bgcolor: "#fff",
                        },
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<SendRoundedIcon />}
                      sx={{
                        mt: 1.5,
                        borderRadius: 3,
                        fontWeight: 1000,
                        bgcolor: ui.primary,
                        "&:hover": { bgcolor: "#0284C7" },
                      }}
                      onClick={() => {
                        alert("Demo: gửi bình luận");
                        setNewComment("");
                      }}
                    >
                      Gửi
                    </Button>
                  </Box>

                  <Divider sx={{ borderColor: ui.border }} />

                  {/* Comment list */}
                  <Box sx={{ p: 2 }}>
                    <Stack spacing={1.2}>
                      {comments.map((c) => (
                        <CommentItem key={c.id} c={c} />
                      ))}
                    </Stack>
                  </Box>
                </LinearCard>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
