import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/TrendingUp";

export default function WritingTabs({
  content,
  result,
  renderCorrectedContent,
  onUpgrade, // function gọi API upgrade
}) {
  const [tab, setTab] = useState(0);
  const [loadingUpgrade, setLoadingUpgrade] = useState(false);
  const [upgradeResult, setUpgradeResult] = useState(null);

  const handleUpgrade = async () => {
    setLoadingUpgrade(true);
    try {
      const data = await onUpgrade(); // gọi API từ parent
      setUpgradeResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUpgrade(false);
    }
  };

  return (
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
        <Tab label="Nâng cấp bài" />
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
            {renderCorrectedContent(content, result?.correct)}
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
                    <CircularProgress size={20} color="inherit" />
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
                {loadingUpgrade ? "Đang nâng cấp..." : "Nâng cấp bài"}
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
  );
}
