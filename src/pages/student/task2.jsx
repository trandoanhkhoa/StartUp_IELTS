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
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";

const MIN_WORDS = 250;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

export default function SubmitTask2() {
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
              <MenuBookRoundedIcon sx={{ color: "#0EA5E9" }} />
              <Typography variant="h5" fontWeight={700}>
                Nộp bài Writing Task 2
              </Typography>
            </Box>

            <Typography color="text.secondary" mt={1}>
              Viết bài luận học thuật (Opinion, Discussion, Problem–Solution…)
            </Typography>
          </Box>

          {/* INFO */}
          <Card sx={{ mb: 3, borderRadius: 3 }}>
            <CardContent>
              <Typography fontSize={14}>
                Task 2 yêu cầu tối thiểu <strong>{MIN_WORDS} từ</strong>. Bạn
                cần phát triển luận điểm rõ ràng, đưa ví dụ và kết luận hợp lý.
              </Typography>
            </CardContent>
          </Card>

          {/* FORM */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={600} mb={2}>
                Thông tin bài viết
              </Typography>

              {/* TOPIC */}
              <TextField
                fullWidth
                label="Đề bài / Topic"
                placeholder="Some people believe that governments should invest more in public transport..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 3 }}
              />

              {/* ESSAY */}
              <Box position="relative">
                <TextField
                  fullWidth
                  multiline
                  minRows={12}
                  placeholder="Write your essay here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  sx={{
                    "& textarea": {
                      fontFamily: "monospace",
                      fontSize: 14,
                      lineHeight: 1.6,
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
                Gợi ý: viết mở bài → thân bài → kết luận rõ ràng
              </Typography>

              {/* ACTION */}
              <Box mt={4} textAlign="right">
                <Button
                  variant="contained"
                  disabled={!isValid}
                  sx={{
                    bgcolor: "#0EA5E9",
                    textTransform: "none",
                    borderRadius: 2,
                    px: 4,
                    "&:hover": { bgcolor: "#0284C7" },
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
