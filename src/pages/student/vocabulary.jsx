import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Button,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Fade,
  Tooltip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Badge,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Avatar,
} from "@mui/material";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import TopicRoundedIcon from "@mui/icons-material/TopicRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

const PRIMARY = "#0EA5E9";

// status colors
const STATUS_META = {
  known: {
    label: "Đã biết",
    color: "success",
    icon: <VisibilityRoundedIcon fontSize="small" />,
  },
  mastered: {
    label: "Đã thuộc",
    color: "primary",
    icon: <CheckCircleRoundedIcon fontSize="small" />,
  },
  unknown: {
    label: "Chưa thuộc",
    color: "warning",
    icon: <HelpRoundedIcon fontSize="small" />,
  },
};

const mockTopics = [
  {
    id: "t1",
    name: "Education",
    description: "Từ vựng về trường học, học thuật",
    words: [
      {
        id: "w1",
        word: "curriculum",
        ipa: "/kəˈrɪkjələm/",
        meaning: "chương trình học",
        example: "The school updated its curriculum.",
        status: "known",
      },
      {
        id: "w2",
        word: "scholarship",
        ipa: "/ˈskɑːlərʃɪp/",
        meaning: "học bổng",
        example: "She won a scholarship.",
        status: "mastered",
      },
      {
        id: "w3",
        word: "tuition",
        ipa: "/tjuˈɪʃən/",
        meaning: "học phí",
        example: "Tuition fees are increasing.",
        status: "unknown",
      },
    ],
  },
  {
    id: "t2",
    name: "Technology",
    description: "AI, phần mềm, công nghệ",
    words: [
      {
        id: "w4",
        word: "scalable",
        ipa: "/ˈskeɪləbl/",
        meaning: "có thể mở rộng",
        example: "We need a scalable system.",
        status: "known",
      },
      {
        id: "w5",
        word: "latency",
        ipa: "/ˈleɪtənsi/",
        meaning: "độ trễ",
        example: "Lower latency improves UX.",
        status: "unknown",
      },
      {
        id: "w6",
        word: "deploy",
        ipa: "/dɪˈplɔɪ/",
        meaning: "triển khai",
        example: "Deploy the app to production.",
        status: "mastered",
      },
    ],
  },
];

function StatCard({ icon, label, value, chip }) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
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
                sx={{ fontWeight: 800, letterSpacing: -0.3 }}
              >
                {value}
              </Typography>
            </Box>
          </Stack>
          {chip}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function VocabularyPage() {
  const [topics, setTopics] = useState(() => {
    const saved = localStorage.getItem("voc_topics");
    return saved ? JSON.parse(saved) : mockTopics;
  });

  const [activeTopicId, setActiveTopicId] = useState(
    () => topics?.[0]?.id || "",
  );
  const activeTopic = useMemo(
    () => topics.find((t) => t.id === activeTopicId) || topics[0],
    [topics, activeTopicId],
  );

  // dialogs/drawers
  const [openAddTopic, setOpenAddTopic] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  // add topic form
  const [newTopicName, setNewTopicName] = useState("");
  const [newTopicDesc, setNewTopicDesc] = useState("");

  // search/filter
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // settings for table
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("voc_settings");
    return (
      (saved && JSON.parse(saved)) || {
        dense: false,
        showIPA: true,
        showExample: true,
        showMeaning: true,
        highlightUnknown: true,
      }
    );
  });

  useEffect(() => {
    localStorage.setItem("voc_topics", JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem("voc_settings", JSON.stringify(settings));
  }, [settings]);

  const allWords = useMemo(() => topics.flatMap((t) => t.words), [topics]);

  const totals = useMemo(() => {
    const total = allWords.length;
    const known = allWords.filter((w) => w.status === "known").length;
    const mastered = allWords.filter((w) => w.status === "mastered").length;
    const unknown = allWords.filter((w) => w.status === "unknown").length;
    return { total, known, mastered, unknown };
  }, [allWords]);

  const filteredWords = useMemo(() => {
    const words = activeTopic?.words || [];
    return words
      .filter((w) => {
        if (statusFilter === "all") return true;
        return w.status === statusFilter;
      })
      .filter((w) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q) ||
          w.example.toLowerCase().includes(q)
        );
      });
  }, [activeTopic, statusFilter, search]);

  const handleAddTopic = () => {
    const name = newTopicName.trim();
    if (!name) return;

    const newTopic = {
      id: `t_${Date.now()}`,
      name,
      description: newTopicDesc.trim(),
      words: [],
    };

    setTopics((prev) => [newTopic, ...prev]);
    setActiveTopicId(newTopic.id);

    setNewTopicName("");
    setNewTopicDesc("");
    setOpenAddTopic(false);
  };

  const updateWordStatus = (wordId, status) => {
    setTopics((prev) =>
      prev.map((t) => {
        if (t.id !== activeTopicId) return t;
        return {
          ...t,
          words: t.words.map((w) => (w.id === wordId ? { ...w, status } : w)),
        };
      }),
    );
  };

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#F8FAFC",
          py: { xs: 3, md: 5 },
        }}
      >
        <Container maxWidth="xl">
          {/* HEADER */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 3 }}
          >
            <Box>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Avatar
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "rgba(14,165,233,0.12)",
                    color: PRIMARY,
                    borderRadius: 3,
                  }}
                >
                  <LibraryBooksRoundedIcon />
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: -0.8,
                      lineHeight: 1.15,
                    }}
                  >
                    Vocabulary Workspace
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Học từ vựng theo topic — phong cách sạch sẽ như
                    Notion/Linear.
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Stack direction="row" spacing={1.2} alignItems="center">
              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => setOpenAddTopic(true)}
                sx={{
                  textTransform: "none",
                  fontWeight: 700,
                  borderRadius: 2.5,
                  bgcolor: PRIMARY,
                  color: "#FFFFFF",
                  boxShadow: "0 10px 25px rgba(14,165,233,0.25)",
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                Thêm topic
              </Button>

              <Tooltip title="Settings bảng từ vựng">
                <IconButton
                  onClick={() => setOpenSettings(true)}
                  sx={{
                    borderRadius: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "rgba(255,255,255,0.85)",
                  }}
                >
                  <SettingsRoundedIcon />
                </IconButton>
              </Tooltip>
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
              icon={<TopicRoundedIcon />}
              label="Tổng từ vựng đã học"
              value={totals.total}
              chip={
                <Chip
                  label="All topics"
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              }
            />

            <StatCard
              icon={STATUS_META.mastered.icon}
              label="Đã thuộc"
              value={totals.mastered}
              chip={
                <Chip
                  label="Mastered"
                  size="small"
                  color="primary"
                  sx={{ fontWeight: 800 }}
                />
              }
            />

            <StatCard
              icon={STATUS_META.known.icon}
              label="Đã biết"
              value={totals.known}
              chip={
                <Chip
                  label="Known"
                  size="small"
                  color="success"
                  sx={{ fontWeight: 800 }}
                />
              }
            />

            <StatCard
              icon={STATUS_META.unknown.icon}
              label="Chưa thuộc"
              value={totals.unknown}
              chip={
                <Chip
                  label="Need review"
                  size="small"
                  color="warning"
                  sx={{ fontWeight: 800 }}
                />
              }
            />
          </Box>

          {/* MAIN */}
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", lg: "340px 1fr" },
              alignItems: "start",
            }}
          >
            {/* LEFT: TOPICS */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Typography sx={{ fontWeight: 900, letterSpacing: -0.2 }}>
                    Topics
                  </Typography>
                  <Chip
                    size="small"
                    label={`${topics.length} topics`}
                    sx={{ fontWeight: 800 }}
                  />
                </Stack>

                <Divider sx={{ mb: 1.5 }} />

                <List dense disablePadding>
                  {topics.map((t) => {
                    const isActive = t.id === activeTopicId;
                    const count = t.words.length;

                    return (
                      <ListItem
                        key={t.id}
                        onClick={() => setActiveTopicId(t.id)}
                        sx={{
                          cursor: "pointer",
                          borderRadius: 2,
                          mb: 0.75,
                          border: "1px solid",
                          borderColor: isActive
                            ? "rgba(14,165,233,0.35)"
                            : "transparent",
                          bgcolor: isActive
                            ? "rgba(14,165,233,0.08)"
                            : "transparent",
                          "&:hover": {
                            bgcolor: isActive
                              ? "rgba(14,165,233,0.10)"
                              : "rgba(2,6,23,0.03)",
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              sx={{ fontWeight: 900, letterSpacing: -0.2 }}
                            >
                              {t.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {t.description || "No description"}
                            </Typography>
                          }
                        />
                        <ListItemSecondaryAction>
                          <Badge
                            badgeContent={count}
                            color={isActive ? "primary" : "default"}
                            sx={{
                              "& .MuiBadge-badge": {
                                fontWeight: 900,
                              },
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>

            {/* RIGHT: TABLE */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Stack
                  direction={{ xs: "column", md: "row" }}
                  alignItems={{ xs: "flex-start", md: "center" }}
                  justifyContent="space-between"
                  spacing={1.5}
                  sx={{ mb: 2 }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 900, letterSpacing: -0.2 }}>
                      {activeTopic?.name || "Topic"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {activeTopic?.description || "Chọn topic để bắt đầu học."}
                    </Typography>
                  </Box>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  >
                    <TextField
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Tìm từ, nghĩa, ví dụ..."
                      size="small"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <SearchRoundedIcon
                            fontSize="small"
                            style={{ marginRight: 8 }}
                          />
                        ),
                      }}
                      sx={{
                        minWidth: { xs: "100%", sm: 280 },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "rgba(248,250,252,0.9)",
                        },
                      }}
                    />

                    <FormControl size="small" sx={{ minWidth: 160 }}>
                      <InputLabel>Lọc</InputLabel>
                      <Select
                        value={statusFilter}
                        label="Lọc"
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{ borderRadius: 2 }}
                      >
                        <MenuItem value="all">Tất cả</MenuItem>
                        <MenuItem value="mastered">Đã thuộc</MenuItem>
                        <MenuItem value="known">Đã biết</MenuItem>
                        <MenuItem value="unknown">Chưa thuộc</MenuItem>
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
                  <Table size={settings.dense ? "small" : "medium"}>
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            bgcolor: "rgba(2,6,23,0.02)",
                            fontWeight: 900,
                            color: "text.secondary",
                          },
                        }}
                      >
                        <TableCell width={220}>Word</TableCell>
                        {settings.showIPA && (
                          <TableCell width={160}>IPA</TableCell>
                        )}
                        {settings.showMeaning && <TableCell>Meaning</TableCell>}
                        {settings.showExample && <TableCell>Example</TableCell>}
                        <TableCell width={180}>Status</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {filteredWords.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Box sx={{ py: 6, textAlign: "center" }}>
                              <Typography sx={{ fontWeight: 900, mb: 0.5 }}>
                                Không có từ vựng phù hợp
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: "text.secondary" }}
                              >
                                Thử đổi bộ lọc hoặc tìm kiếm từ khác.
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredWords.map((w) => {
                          const isUnknown = w.status === "unknown";
                          return (
                            <TableRow
                              key={w.id}
                              hover
                              sx={{
                                transition: "all 0.15s ease",
                                ...(settings.highlightUnknown &&
                                  isUnknown && {
                                    bgcolor: "rgba(245,158,11,0.08)",
                                  }),
                              }}
                            >
                              <TableCell>
                                <Typography
                                  sx={{
                                    fontWeight: 900,
                                    letterSpacing: -0.2,
                                    fontFamily:
                                      "Inter, system-ui, -apple-system, Segoe UI, Roboto",
                                  }}
                                >
                                  {w.word}
                                </Typography>
                              </TableCell>

                              {settings.showIPA && (
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      fontFamily:
                                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                                      color: "text.secondary",
                                    }}
                                  >
                                    {w.ipa}
                                  </Typography>
                                </TableCell>
                              )}

                              {settings.showMeaning && (
                                <TableCell>
                                  <Typography variant="body2">
                                    {w.meaning}
                                  </Typography>
                                </TableCell>
                              )}

                              {settings.showExample && (
                                <TableCell>
                                  <Typography
                                    variant="body2"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {w.example}
                                  </Typography>
                                </TableCell>
                              )}

                              <TableCell>
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <Chip
                                    icon={STATUS_META[w.status].icon}
                                    label={STATUS_META[w.status].label}
                                    color={STATUS_META[w.status].color}
                                    size="small"
                                    sx={{ fontWeight: 900 }}
                                  />

                                  <FormControl
                                    size="small"
                                    sx={{ minWidth: 150 }}
                                  >
                                    <Select
                                      value={w.status}
                                      onChange={(e) =>
                                        updateWordStatus(w.id, e.target.value)
                                      }
                                      displayEmpty
                                      MenuProps={{
                                        PaperProps: {
                                          sx: {
                                            mt: 1,
                                            borderRadius: 2,
                                            minWidth: 150, // width dropdown = width select
                                          },
                                        },
                                      }}
                                      sx={{
                                        width: 150, // fix width
                                        borderRadius: 2,
                                        "& .MuiSelect-select": {
                                          py: 0.75,
                                          display: "flex",
                                          alignItems: "center",
                                        },
                                      }}
                                    >
                                      <MenuItem
                                        value="mastered"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 22,
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {STATUS_META.mastered.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>Đã thuộc</Box>
                                      </MenuItem>

                                      <MenuItem
                                        value="known"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 22,
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {STATUS_META.known.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>Đã biết</Box>
                                      </MenuItem>

                                      <MenuItem
                                        value="unknown"
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <Box
                                          sx={{
                                            width: 22,
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          {STATUS_META.unknown.icon}
                                        </Box>
                                        <Box sx={{ flex: 1 }}>Chưa thuộc</Box>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>

          {/* ADD TOPIC DIALOG */}
          <Dialog
            open={openAddTopic}
            onClose={() => setOpenAddTopic(false)}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle sx={{ fontWeight: 900 }}>Thêm topic mới</DialogTitle>
            <DialogContent sx={{ pt: 1 }}>
              <Stack spacing={2} sx={{ mt: 1 }}>
                <TextField
                  label="Tên topic"
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                  placeholder="Ví dụ: Business, Health, Environment..."
                  autoFocus
                />
                <TextField
                  label="Mô tả (optional)"
                  value={newTopicDesc}
                  onChange={(e) => setNewTopicDesc(e.target.value)}
                  placeholder="Ví dụ: Từ vựng hay gặp trong IELTS Writing Task 2"
                  multiline
                  minRows={2}
                />
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button
                onClick={() => setOpenAddTopic(false)}
                sx={{ textTransform: "none" }}
              >
                Huỷ
              </Button>
              <Button
                variant="contained"
                onClick={handleAddTopic}
                sx={{
                  textTransform: "none",
                  fontWeight: 800,
                  color: "#FFFFFF",
                  bgcolor: PRIMARY,
                  "&:hover": { bgcolor: "#0284C7" },
                }}
              >
                Tạo topic
              </Button>
            </DialogActions>
          </Dialog>

          {/* SETTINGS DRAWER */}
          <Drawer
            anchor="right"
            open={openSettings}
            onClose={() => setOpenSettings(false)}
          >
            <Box sx={{ width: 360, p: 2 }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ fontWeight: 900 }}>Settings</Typography>
                <IconButton onClick={() => setOpenSettings(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                Điều chỉnh bảng từ vựng theo cách bạn học hiệu quả nhất.
              </Typography>

              <Divider sx={{ mb: 1.5 }} />

              <Stack spacing={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.dense}
                      onChange={(e) =>
                        setSettings((s) => ({ ...s, dense: e.target.checked }))
                      }
                    />
                  }
                  label="Dense mode (bảng gọn hơn)"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showIPA}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          showIPA: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Hiện cột IPA"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showMeaning}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          showMeaning: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Hiện cột Meaning"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showExample}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          showExample: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Hiện cột Example"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.highlightUnknown}
                      onChange={(e) =>
                        setSettings((s) => ({
                          ...s,
                          highlightUnknown: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="Highlight từ chưa thuộc"
                />
              </Stack>
            </Box>
          </Drawer>
        </Container>
      </Box>
    </Fade>
  );
}
