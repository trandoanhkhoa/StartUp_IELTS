import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  Chip,
  Fade,
  CardMedia,
  LinearProgress,
  Paper,
  Grid,
  Stack,
  Tabs,
  Tab,
  IconButton,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Divider,
  CircularProgress,
} from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UpgradeIcon from "@mui/icons-material/TrendingUp";
import { styled } from "@mui/material/styles";

import userApi from "../../api/user_api/userApi";
import AnimatedScore from "@/components/Hooks/Animation/animatedScore.jsx";

import { useTypewriter } from "@/components/Hooks/Animation/animatedtypewriter.jsx";

const renderCorrectedContent = (text, corrections) => {
  if (!corrections || corrections.length === 0) return text;

  let elements = [text];

  const getColorByLevel = (level) => {
    switch (level) {
      case "red":
        return "#dc2626";
      case "yellow":
        return "#f59e0b";
      case "blue":
        return "#2563eb";
      default:
        return "#dc2626";
    }
  };

  corrections.forEach((correction, correctionIndex) => {
    const { wrong, fix, type, level } = correction;
    if (!wrong) return;

    elements = elements.flatMap((part) => {
      if (typeof part !== "string") return part;

      const pieces = part.split(wrong);
      if (pieces.length === 1) return part;

      return pieces.flatMap((piece, index) =>
        index < pieces.length - 1
          ? [
              piece,
              <span
                key={`${correctionIndex}-wrong-${index}`}
                style={{
                  padding: "2px 4px",
                  borderRadius: 4,
                  fontWeight: 600,
                  color: getColorByLevel(level),
                  textDecoration: level === "red" ? "line-through" : "none",
                  backgroundColor: level === "red" ? "#fee2e2" : "transparent",
                }}
              >
                {wrong}
              </span>,
              <span
                key={`${correctionIndex}-fix-${index}`}
                style={{
                  marginLeft: 6,
                  marginRight: 6,
                  color: "#16a34a",
                  fontWeight: 600,
                }}
              >
                ({fix})
              </span>,
            ]
          : piece,
      );
    });
  });

  return elements;
};

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;
const AnimatedDescription = ({ text }) => {
  const animatedText = useTypewriter(text, 20);

  return (
    <Typography color="text.secondary" mb={2}>
      {animatedText}
    </Typography>
  );
};
function ScoreNumber({ score, color }) {
  const animated = AnimatedScore({ value: score, duration: 2500 });

  return (
    <Typography fontSize={22} fontWeight={700} sx={{ color: color.text }}>
      {animated}
    </Typography>
  );
}
export default function SubmitTask1() {
  const [loading, setLoading] = useState(false);
  const [loadingVocabandStructure, setloadingVocabandStructure] =
    useState(false);
  // Score Result
  const [result, setResult] = useState(null);
  // Vocab & Structure
  const [resultImprove, setresultImprove] = useState(null);
  const [copied, setCopied] = useState(false);
  const [level, setLevel] = useState("6.0-7.0");
  //Upgrade Writing
  const [tab, setTab] = useState(0);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState(null);
  //ID from Writing Index
  const { id } = useParams();

  const [taskType, setTaskType] = useState("Task 1");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [minWords, setMinWords] = useState(150);

  const wordCount = useMemo(() => countWords(content), [content]);
  const isValid = wordCount >= minWords;

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const res = await userApi.getWritingById(id);
        setQuestion(res.data.question);
        setImage(res.data.imageUrl);
        setTaskType(res.data.taskType);
        setCategory(res.data.category);
        setType(res.data.type);
        if (res.data.taskType === "Task 2") {
          setMinWords(250);
        } else {
          setMinWords(150);
        }
      }
    };
    loadData();
  }, [id]);

  const handleScore = async () => {
    setLoading(true);
    setResult(null);
    try {
      // ✅ Clean content trước khi gửi
      const cleanedContent = content
        ?.replace(/\n+/g, " ") // bỏ xuống dòng
        ?.replace(/\s+/g, " ") // bỏ khoảng trắng dư
        ?.trim(); // bỏ space đầu cuối

      const data = {
        taskType: taskType,
        taskquestion: question?.trim(),
        taskcontent: cleanedContent,
      };
      const res = await userApi.getResult(data);

      if (res.status) {
        //console.log(res.data);
        setResult(res.data);
      } else {
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };
  // ================= GENERATE =================
  const handleGenerate = async () => {
    setloadingVocabandStructure(true);
    setresultImprove(null);

    try {
      const data = {
        category: category,
        question: question,
        level: level, // dùng state level
      };

      const res = await userApi.getvocabularyandstructure(data);
      setresultImprove(res.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setloadingVocabandStructure(false);
    }
  };

  // ================= COPY WORD =================
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  // ================= UPGRADE WRITING =================
  const handleUpgrade = async () => {
    setLoadingUpgrade(true);
    try {
      const data = {
        taskType: taskType,
        taskTopic: type,
        taskcontent: content,
        taskquestion: question,
      };
      const res = await userApi.getUpgradeWriting(data);
      setUpgradeResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUpgrade(false);
    }
  };
  const SectionCard = styled(Paper)(({ theme }) => ({
    padding: 24,
    borderRadius: 16,
    background: "#ffffff",
    border: "1px solid rgba(15,23,42,.06)",
    transition: "all .2s ease",
    "&:hover": {
      boxShadow: "0 8px 24px rgba(15,23,42,.08)",
    },
  }));
  const ScoreChip = styled(Chip)(({ score }) => ({
    fontWeight: 600,
    backgroundColor:
      score >= 7 ? "#16A34A" : score >= 5 ? "#F59E0B" : "#DC2626",
    color: "#fff",
  }));
  const getBandColor = (score) => {
    if (score >= 7) {
      return {
        bg: "#DCFCE7", // green-100
        text: "#166534", // green-800
      };
    }
    if (score >= 5) {
      return {
        bg: "#FEF9C3", // yellow-100
        text: "#854D0E", // yellow-800
      };
    }
    return {
      bg: "#FEE2E2", // red-100
      text: "#991B1B", // red-800
    };
  };
  return (
    <Fade in timeout={500}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 6 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4}>
            {/* ===== LEFT: WRITING AREA ===== */}
            <Grid
              size={{ xs: 12, md: 7 }}
              sx={{
                mx: { md: result ? 0 : "auto" },
              }}
            >
              {/* FORM CARD */}
              <Card
                sx={{
                  borderRadius: 4,
                  ...(result && {
                    position: { md: "sticky" },
                    top: 24,
                    height: { md: "calc(100vh - 48px)" },
                    overflowY: "auto",
                  }),
                }}
              >
                <CardContent>
                  {/* HEADER */}
                  <Box mb={4}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BarChartRoundedIcon sx={{ color: "#0EA5E9" }} />
                      <Typography variant="h5" fontWeight={700}>
                        {taskType === "Task 1"
                          ? "Nộp bài Writing Task 1"
                          : "Nộp bài Writing Task 2"}
                      </Typography>
                    </Box>

                    <Typography color="text.secondary" mt={1}>
                      {taskType === "Task 1"
                        ? "Mô tả biểu đồ, bảng số liệu hoặc quy trình"
                        : "Nếu ý kiến, thảo luận về đề tài"}
                    </Typography>
                  </Box>
                  {/* INFO */}
                  <Card
                    sx={{
                      mb: 3,
                      borderRadius: 4,
                      bgcolor: "#FFFFFF",
                    }}
                  >
                    <CardContent>
                      <Typography fontSize={14}>
                        Task 1 yêu cầu tối thiểu <strong>{minWords} từ</strong>.
                        Bạn nên mô tả các xu hướng chính và so sánh dữ liệu.
                      </Typography>
                    </CardContent>
                  </Card>
                  {/* FORM */}
                  <Card sx={{ borderRadius: 4 }}>
                    <CardContent>
                      <Typography fontWeight={600} mb={2}>
                        Thông tin bài viết
                      </Typography>

                      {/* TITLE */}
                      <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Đề bài / Chủ đề"
                        placeholder="VD: The chart below shows the percentage of households..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        sx={{ mb: 3 }}
                      />
                      {taskType === "Task 1" && (
                        <Box display="flex" justifyContent="center" mb={3}>
                          <CardMedia
                            component="img"
                            image={image}
                            alt="Lỗi hiển thị ảnh"
                            sx={{
                              maxWidth: "100%",
                              maxHeight: 500,
                              height: "auto",
                              objectFit: "contain",
                              borderRadius: 2,
                            }}
                          />
                        </Box>
                      )}

                      {/* CONTENT */}

                      <Box position="relative">
                        {!result ? (
                          <>
                            <TextField
                              fullWidth
                              multiline
                              minRows={12}
                              placeholder="Write your response here..."
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              sx={{
                                "& textarea": {
                                  fontFamily: "monospace",
                                  fontSize: 14,
                                },
                              }}
                            />
                            {/* WORD COUNT */}
                            <Chip
                              label={`${wordCount} / ${minWords} từ`}
                              color={
                                wordCount === 0
                                  ? "default"
                                  : isValid
                                    ? "success"
                                    : "warning"
                              }
                              size="small"
                              sx={{
                                position: "absolute",
                                right: 12,
                                bottom: 12,
                                fontWeight: 600,
                              }}
                            />
                          </>
                        ) : (
                          <Paper
                            elevation={0}
                            sx={{
                              border: "1px solid rgba(15,23,42,.08)",
                              borderRadius: 3,
                              overflow: "hidden",
                            }}
                          >
                            {/* ===== Tabs Header ===== */}
                            <Tabs
                              value={tab}
                              onChange={(e, newValue) => setTab(newValue)}
                              variant="fullWidth"
                              sx={{
                                borderBottom: "1px solid rgba(15,23,42,.08)",
                              }}
                            >
                              <Tab label="Chấm lỗi" />
                              <Tab
                                disabled
                                label="Nâng cấp bài (Coming soon)"
                              />
                            </Tabs>
                            {/* ================= TAB 1 ================= */}
                            {tab === 0 && (
                              <Box p={3}>
                                <Box
                                  sx={{
                                    whiteSpace: "pre-wrap",
                                    fontFamily: "monospace",
                                    fontSize: 14,
                                    lineHeight: 1.7,
                                    p: 2,
                                    border: "1px solid rgba(15,23,42,.1)",
                                    borderRadius: 2,
                                    bgcolor: "#fff",
                                  }}
                                >
                                  {renderCorrectedContent(
                                    content,
                                    result?.correct,
                                  )}
                                </Box>
                              </Box>
                            )}

                            {/* ================= TAB 2 ================= */}
                            {tab === 1 && (
                              <Box
                                p={4}
                                sx={{
                                  minHeight: 300,
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {!upgradeResult && (
                                  <>
                                    <Typography
                                      variant="h6"
                                      fontWeight={600}
                                      mb={3}
                                      textAlign="center"
                                    >
                                      Nâng cấp bài viết lên Band 7.0–8.0
                                    </Typography>

                                    <Button
                                      variant="contained"
                                      size="large"
                                      startIcon={
                                        loadingUpgrade ? (
                                          <CircularProgress
                                            size={20}
                                            color="inherit"
                                          />
                                        ) : (
                                          <UpgradeIcon />
                                        )
                                      }
                                      onClick={handleUpgrade}
                                      disabled={loadingUpgrade}
                                      sx={{
                                        px: 5,
                                        py: 1.5,
                                        borderRadius: 3,
                                        textTransform: "none",
                                        fontSize: 16,
                                      }}
                                    >
                                      {loadingUpgrade
                                        ? "Đang nâng cấp..."
                                        : "Nâng cấp bài"}
                                    </Button>
                                  </>
                                )}

                                {/* ===== Sau khi có kết quả ===== */}
                                {upgradeResult && (
                                  <Box
                                    sx={{
                                      width: "100%",
                                      whiteSpace: "pre-wrap",
                                      fontSize: 15,
                                      lineHeight: 1.8,
                                      p: 3,
                                      border: "1px solid rgba(15,23,42,.1)",
                                      borderRadius: 2,
                                      bgcolor: "#fff",
                                    }}
                                  >
                                    {upgradeResult.improvedEssay}
                                  </Box>
                                )}
                              </Box>
                            )}
                          </Paper>
                        )}
                      </Box>
                      <Typography fontSize={13} color="text.secondary" mt={1}>
                        Sử dụng font monospace để dễ đọc và kiểm tra lỗi
                      </Typography>

                      {/* ACTION */}
                      {result === null && (
                        <Box mt={4} textAlign="right">
                          <Button
                            variant="contained"
                            onClick={handleScore}
                            disabled={!isValid}
                            sx={{
                              bgcolor: "#0EA5E9",
                              textTransform: "none",
                              borderRadius: 3,
                              px: 4,
                              "&:hover": {
                                bgcolor: "#0284C7",
                              },
                            }}
                          >
                            {loading ? "🤖 AI đang chấm..." : " Nộp bài"}
                          </Button>
                        </Box>
                      )}

                      {loading && (
                        <Box mt={3}>
                          <LinearProgress />
                          <Typography mt={2} color="text.secondary">
                            AI is analyzing Task Response, Coherence, Vocabulary
                            and Grammar...
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
            {/* ===== RIGHT: RESULT PANEL ===== */}
            {result && (
              <>
                <Grid size={{ xs: 12, md: 5 }}>
                  {/* Score Result */}
                  {result && (
                    <Box
                      sx={{
                        position: { md: "sticky" },
                        top: 24,
                      }}
                    >
                      <Fade in={!!result}>
                        <Box>
                          {result && (
                            <>
                              {/* OVERALL SCORE */}
                              <SectionCard>
                                <Typography
                                  variant="h5"
                                  fontWeight={700}
                                  mb={3}
                                >
                                  Overall Band Score
                                </Typography>

                                <ScoreChip
                                  label={`Band ${result.overall}`}
                                  score={result.overall}
                                />

                                <Grid container spacing={2} mt={2}>
                                  {["tr", "cc", "lr", "gra"].map((key) => {
                                    const score = result[key];
                                    const color = getBandColor(score);

                                    return (
                                      <Grid size={{ xs: 6, md: 3 }} key={key}>
                                        <Paper
                                          sx={{
                                            p: 2,
                                            borderRadius: 3,
                                            bgcolor: color.bg,
                                            textAlign: "center",
                                            transition: "0.3s",
                                          }}
                                        >
                                          <Typography
                                            fontWeight={600}
                                            sx={{ color: color.text }}
                                          >
                                            {key.toUpperCase()}
                                          </Typography>

                                          <ScoreNumber
                                            score={score}
                                            color={color}
                                          />
                                        </Paper>
                                      </Grid>
                                    );
                                  })}
                                </Grid>
                              </SectionCard>

                              <SectionCard sx={{ mt: 3 }}>
                                {/* DETAIL SECTIONS */}
                                <Box mt={4}>
                                  {[
                                    {
                                      title: "Task Response",
                                      key: "tr",
                                      data: result.trDetail,
                                    },
                                    {
                                      title: "Coherence & Cohesion",
                                      key: "cc",
                                      data: result.ccDetail,
                                    },
                                    {
                                      title: "Lexical Resource",
                                      key: "lr",
                                      data: result.lrDetail,
                                    },
                                    {
                                      title: "Grammatical Range & Accuracy",
                                      key: "gra",
                                      data: result.graDetail,
                                    },
                                  ].map((section, index) => (
                                    <Box key={index} mb={4}>
                                      {/* ===== Title + Band ===== */}
                                      <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        mb={1}
                                      >
                                        <Typography
                                          fontWeight={700}
                                          fontSize={18}
                                        >
                                          {section.title}
                                        </Typography>

                                        {/* Band tổng của tiêu chí */}
                                        <Typography fontWeight={700}>
                                          Band{" "}
                                          {section.data.json?.[section.key]}
                                        </Typography>
                                      </Box>

                                      {/* ===== Description ===== */}
                                      {/* <Typography color="text.secondary" mb={2}>
                                      {section.data.description}
                                    </Typography> */}
                                      <AnimatedDescription
                                        text={section.data.description}
                                      />

                                      {/* ===== Table from json.detail ===== */}
                                      <Box
                                        sx={{
                                          border:
                                            "1px solid rgba(15,23,42,.08)",
                                          borderRadius: 2,
                                          overflow: "hidden",
                                        }}
                                      >
                                        {/* Header */}
                                        <Box
                                          sx={{
                                            display: "grid",
                                            gridTemplateColumns: "2fr 1fr",
                                            bgcolor: "#F8FAFC",
                                            fontWeight: 600,
                                          }}
                                        >
                                          <Box p={1}>Sub Criteria</Box>
                                          <Box p={1} textAlign="center">
                                            Score
                                          </Box>
                                        </Box>

                                        {/* Rows */}
                                        {Object.entries(
                                          section.data.json?.detail || {},
                                        ).map(([key, value], i) => (
                                          <Box
                                            key={i}
                                            sx={{
                                              display: "grid",
                                              gridTemplateColumns: "2fr 1fr",
                                              borderTop:
                                                "1px solid rgba(15,23,42,.08)",
                                            }}
                                          >
                                            <Box p={1}>
                                              {key.replace(/([A-Z])/g, " $1")}
                                            </Box>

                                            <Box
                                              p={1}
                                              textAlign="center"
                                              fontWeight={600}
                                            >
                                              {value}
                                            </Box>
                                          </Box>
                                        ))}
                                      </Box>
                                    </Box>
                                  ))}
                                </Box>
                              </SectionCard>
                              {/* CORRECT */}
                              <SectionCard sx={{ mt: 3 }}>
                                {renderCorrectTable(result.correct)}
                              </SectionCard>
                              {/* Vocab and Structure Generate */}
                              <SectionCard
                                elevation={0}
                                sx={{
                                  p: 3,
                                  borderRadius: 3,
                                  border: "1px solid rgba(15,23,42,.08)",

                                  mt: 3,
                                }}
                              >
                                {/* ================= TITLE ================= */}
                                <Typography
                                  variant="h6"
                                  fontWeight={600}
                                  gutterBottom
                                >
                                  📚 Học thêm từ vựng và ngữ pháp
                                </Typography>

                                {/* ================= CONTROLS ================= */}
                                <Stack spacing={2}>
                                  <FormControl fullWidth size="small">
                                    <InputLabel>Chọn Level</InputLabel>
                                    <Select
                                      value={level}
                                      label="Chọn Level"
                                      onChange={(e) => setLevel(e.target.value)}
                                    >
                                      <MenuItem value="5.0-6.0">
                                        5.0 - 6.0
                                      </MenuItem>
                                      <MenuItem value="6.0-7.0">
                                        6.0 - 7.0
                                      </MenuItem>
                                      <MenuItem value="7.0-8.0">
                                        7.0 - 8.0
                                      </MenuItem>
                                    </Select>
                                  </FormControl>

                                  <Button
                                    variant="contained"
                                    onClick={handleGenerate}
                                    disabled={loadingVocabandStructure}
                                  >
                                    {loadingVocabandStructure ? (
                                      <CircularProgress size={22} />
                                    ) : (
                                      "Generate"
                                    )}
                                  </Button>
                                </Stack>

                                {/* ================= RESULT - Vocab & Structure ================= */}

                                {resultImprove && (
                                  <>
                                    <Divider sx={{ my: 3 }} />

                                    <Typography
                                      variant="subtitle1"
                                      fontWeight={700}
                                    >
                                      Topic: {resultImprove.topic}
                                    </Typography>

                                    <Typography
                                      variant="subtitle2"
                                      color="primary"
                                      gutterBottom
                                    >
                                      Band: {resultImprove.band}
                                    </Typography>

                                    {/* ================= VOCABULARY ================= */}
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                      📘 Vocabulary
                                    </Typography>

                                    <Stack spacing={2} mt={1}>
                                      {resultImprove.vocabulary?.map(
                                        (item, index) => (
                                          <Box
                                            key={index}
                                            sx={{
                                              p: 2,
                                              borderRadius: 3,
                                              border: "1px solid #eee",
                                              bgcolor: "#ffffff",
                                              transition: "all 0.3s ease",
                                              cursor: "pointer",
                                              "&:hover": {
                                                transform:
                                                  "translateY(-4px) scale(1.02)",
                                                boxShadow:
                                                  "0 10px 25px rgba(0,0,0,0.08)",
                                              },
                                            }}
                                          >
                                            <Stack
                                              direction="row"
                                              justifyContent="space-between"
                                              alignItems="center"
                                            >
                                              <Typography
                                                fontWeight={700}
                                                fontSize={17}
                                              >
                                                {item.word} (
                                                {item.part_of_speech})
                                              </Typography>

                                              <IconButton
                                                size="small"
                                                onClick={() =>
                                                  handleCopy(item.word)
                                                }
                                              >
                                                <ContentCopyIcon fontSize="small" />
                                              </IconButton>
                                            </Stack>

                                            <Typography
                                              variant="body2"
                                              color="text.secondary"
                                            >
                                              🔊 {item.pronounce}
                                            </Typography>

                                            <Typography variant="body2" mt={1}>
                                              <strong>Meaning (EN):</strong>{" "}
                                              {item.meaning_en}
                                            </Typography>

                                            <Typography variant="body2">
                                              <strong>Meaning (VI):</strong>{" "}
                                              {item.meaning_vi}
                                            </Typography>

                                            <Typography
                                              variant="body2"
                                              mt={1}
                                              fontStyle="italic"
                                            >
                                              {item.example_sentence}
                                            </Typography>
                                          </Box>
                                        ),
                                      )}
                                    </Stack>

                                    {/* ================= STRUCTURES ================= */}
                                    <Typography variant="h6" sx={{ mt: 4 }}>
                                      🧠 Structures
                                    </Typography>

                                    <Stack spacing={2} mt={1}>
                                      {resultImprove.structures?.map(
                                        (item, index) => (
                                          <Box
                                            key={index}
                                            sx={{
                                              p: 2,
                                              borderRadius: 3,
                                              border: "1px solid #eee",
                                              bgcolor: "#f5f7ff",
                                            }}
                                          >
                                            <Typography fontWeight={700}>
                                              {item.structure_name}
                                            </Typography>

                                            <Typography variant="body2" mt={1}>
                                              <strong>Pattern:</strong>{" "}
                                              {item.pattern}
                                            </Typography>

                                            <Typography variant="body2">
                                              <strong>Meaning:</strong>{" "}
                                              {item.meaning}
                                            </Typography>

                                            <Typography variant="body2" mt={1}>
                                              <strong>Example:</strong>{" "}
                                              {item.example}
                                            </Typography>
                                          </Box>
                                        ),
                                      )}
                                    </Stack>
                                  </>
                                )}

                                {/* ================= SNACKBAR ================= */}
                                <Snackbar
                                  open={copied}
                                  autoHideDuration={1500}
                                  onClose={() => setCopied(false)}
                                  message="Copied to clipboard!"
                                />
                              </SectionCard>
                            </>
                          )}
                        </Box>
                      </Fade>
                    </Box>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
}

/* ================= HELPER COMPONENTS ================= */

const renderCorrectTable = (data) => {
  if (!data || data.length === 0) return null;

  const getLevelColor = (level) => {
    switch (level) {
      case "red":
        return { bg: "#fee2e2", color: "#dc2626" };
      case "yellow":
        return { bg: "#fef9c3", color: "#ca8a04" };
      case "blue":
        return { bg: "#dbeafe", color: "#2563eb" };
      default:
        return { bg: "#f1f5f9", color: "#334155" };
    }
  };

  return (
    <Box mb={4}>
      <Typography fontWeight={700} fontSize={18} mb={2}>
        Corrections
      </Typography>

      <Box
        sx={{
          border: "1px solid rgba(15,23,42,.08)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {data.map((item, index) => {
          const levelStyle = getLevelColor(item.level);

          return (
            <Box
              key={index}
              sx={{
                p: 2,
                borderTop:
                  index !== 0 ? "1px solid rgba(15,23,42,.08)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 1.2,
              }}
            >
              {/* Top Row: Type + Level */}
              <Box display="flex" gap={1} alignItems="center">
                <Box
                  sx={{
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 1,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: levelStyle.bg,
                    color: levelStyle.color,
                  }}
                >
                  {item.type}
                </Box>

                <Typography fontSize={12} color="text.secondary">
                  {item.level.toUpperCase()}
                </Typography>
              </Box>

              {/* Wrong */}
              <Box>
                <Typography fontSize={13} color="text.secondary">
                  Original
                </Typography>
                <Typography
                  sx={{
                    textDecoration:
                      item.level === "red" ? "line-through" : "none",
                    color: item.level === "red" ? "#dc2626" : "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {item.wrong}
                </Typography>
              </Box>

              {/* Fix */}
              <Box>
                <Typography fontSize={13} color="text.secondary">
                  Corrected
                </Typography>
                <Typography
                  sx={{
                    color: "#16a34a",
                    fontWeight: 600,
                  }}
                >
                  {item.fix}
                </Typography>
              </Box>

              {/* Explanation */}
              <Box>
                <Typography fontSize={13} color="text.secondary">
                  Explanation
                </Typography>
                <Typography fontSize={14} lineHeight={1.6}>
                  {item.explain}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
