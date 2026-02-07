import * as React from "react";
import {
  AppBar,
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Fade,
} from "@mui/material";

import HeadphonesRoundedIcon from "@mui/icons-material/HeadphonesRounded";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";

const ui = {
  primary: "#0EA5E9",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "rgba(15,23,42,.6)",
  border: "rgba(15,23,42,.08)",
};

const questions = [
  {
    type: "gap",
    content: "He is a (5) ______ engineer working for a tech company.",
  },
  {
    type: "map",
    content: "Label the map below.",
    labels: ["A", "B", "C"],
  },
  {
    type: "matching",
    left: ["Speaker 1", "Speaker 2", "Speaker 3"],
    right: ["Tourism", "Environment", "Technology"],
  },
  {
    type: "mcq-single",
    options: [
      "To explain a process",
      "To compare two theories",
      "To give an opinion",
      "To describe a place",
    ],
  },
  {
    type: "mcq-multiple",
    options: [
      "Lower cost",
      "Faster delivery",
      "Better quality",
      "More flexibility",
    ],
  },
];

export default function ListeningAllTypes() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, pb: 8 }}>
      {/* TOP BAR */}
      <AppBar
        elevation={0}
        position="sticky"
        sx={{
          bgcolor: "rgba(248,250,252,.9)",
          borderBottom: "1px solid",
          borderColor: ui.border,
          color: ui.text,
          backdropFilter: "blur(10px)",
        }}
      >
        <Container maxWidth="md">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 1.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <HeadphonesRoundedIcon sx={{ color: ui.primary }} />
              <Typography sx={{ fontWeight: 1000 }}>
                Listening – Full Question Types
              </Typography>
            </Stack>
            <Chip
              label="Demo UI"
              sx={{
                bgcolor: "rgba(14,165,233,.12)",
                color: ui.primary,
                fontWeight: 1000,
              }}
            />
          </Stack>
        </Container>
      </AppBar>

      {/* QUESTIONS */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Fade in>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: ui.card,
              border: "1px solid",
              borderColor: ui.border,
            }}
          >
            <Stack spacing={4}>
              {/* GAP FILLING */}
              <Box>
                <Typography sx={{ fontWeight: 1000 }}>Gap filling</Typography>

                {/* ⚠️ component="div" vì có Chip + TextField */}
                <Typography component="div" sx={{ mt: 1 }}>
                  He is a{" "}
                  <Chip
                    label="(5)"
                    size="small"
                    sx={{
                      mx: 0.5,
                      fontWeight: 1000,
                      bgcolor: "rgba(15,23,42,.06)",
                    }}
                  />
                  <TextField size="small" sx={{ width: 140, mx: 0.5 }} />
                  engineer working for a tech company.
                </Typography>
              </Box>

              <Divider />

              {/* MAP / DIAGRAM */}
              <Box>
                <Typography sx={{ fontWeight: 1000 }}>
                  Map / Diagram label
                </Typography>
                <Typography sx={{ mt: 0.5, color: ui.muted }}>
                  Look at the map and label the locations.
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    height: 220,
                    borderRadius: 3,
                    bgcolor: "#F1F5F9",
                    display: "grid",
                    placeItems: "center",
                    color: ui.muted,
                    fontWeight: 900,
                  }}
                >
                  [ Map / Diagram image ]
                </Box>

                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  {["A", "B", "C"].map((l) => (
                    <TextField key={l} size="small" label={`Label ${l}`} />
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* MATCHING */}
              <Box>
                <Typography sx={{ fontWeight: 1000 }}>
                  Matching information
                </Typography>

                <Stack direction="row" spacing={4} sx={{ mt: 2 }}>
                  <Stack spacing={1}>
                    {questions[2].left.map((s) => (
                      <Paper
                        key={s}
                        variant="outlined"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 3,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <DragIndicatorRoundedIcon sx={{ color: ui.muted }} />
                        <Typography>{s}</Typography>
                      </Paper>
                    ))}
                  </Stack>

                  <Stack spacing={1}>
                    {questions[2].right.map((t) => (
                      <Paper
                        key={t}
                        variant="outlined"
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 3,
                          bgcolor: "rgba(14,165,233,.05)",
                        }}
                      >
                        <Typography>{t}</Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Stack>
              </Box>

              <Divider />

              {/* MCQ SINGLE */}
              <Box>
                <Typography sx={{ fontWeight: 1000 }}>
                  Multiple choice – one answer
                </Typography>

                <Stack spacing={1} sx={{ mt: 1 }}>
                  {questions[3].options.map((op) => (
                    <Paper
                      key={op}
                      variant="outlined"
                      sx={{
                        px: 2,
                        py: 1.2,
                        borderRadius: 3,
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "rgba(14,165,233,.06)",
                        },
                      }}
                    >
                      <Typography>{op}</Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* MCQ MULTIPLE */}
              <Box>
                <Typography sx={{ fontWeight: 1000 }}>
                  Multiple choice – multiple answers
                </Typography>

                <Stack spacing={0.5} sx={{ mt: 1 }}>
                  {questions[4].options.map((op) => (
                    <FormControlLabel
                      key={op}
                      control={<Checkbox />}
                      label={op}
                    />
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
