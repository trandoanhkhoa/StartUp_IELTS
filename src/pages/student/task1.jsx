import { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  TextField,
  Button,
  Chip,
  Fade,
} from "@mui/material";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";

const MIN_WORDS = 150;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

export default function SubmitTask1() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const wordCount = useMemo(() => countWords(content), [content]);
  const isValid = wordCount >= MIN_WORDS;

  return (
    <Fade in timeout={500}>
      <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC", py: 6 }}>
        <Container maxWidth="md">
          {/* HEADER */}
          <Box mb={4}>
            <Box display="flex" alignItems="center" gap={1}>
              <BarChartRoundedIcon sx={{ color: "#0EA5E9" }} />
              <Typography variant="h5" fontWeight={700}>
                Nộp bài Writing Task 1
              </Typography>
            </Box>

            <Typography color="text.secondary" mt={1}>
              Mô tả biểu đồ, bảng số liệu hoặc quy trình
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
                Task 1 yêu cầu tối thiểu <strong>{MIN_WORDS} từ</strong>. Bạn
                nên mô tả các xu hướng chính và so sánh dữ liệu.
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
                label="Đề bài / Chủ đề"
                placeholder="VD: The chart below shows the percentage of households..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 3 }}
              />

              {/* CONTENT */}
              <Box position="relative">
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
                  label={`${wordCount} / ${MIN_WORDS} từ`}
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
              </Box>

              <Typography fontSize={13} color="text.secondary" mt={1}>
                Sử dụng font monospace để dễ đọc và kiểm tra lỗi
              </Typography>

              {/* ACTION */}
              <Box mt={4} textAlign="right">
                <Button
                  variant="contained"
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
                  Nộp bài
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Fade>
  );
}
