import * as React from "react";
import { Box, Button, Typography, Stack, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Forbidden403Page() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#F8FAFC", // off-white/slate nhẹ
        px: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 520,
          animation: `${fadeIn} 0.6s ease-out`,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: "16px",
            mx: "auto",
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(14,165,233,0.08)",
            color: "#0EA5E9",
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 36 }} />
        </Box>

        {/* 403 Label */}
        <Typography
          variant="caption"
          sx={{
            fontFamily: "monospace",
            letterSpacing: 2,
            color: "#64748B",
          }}
        >
          ERROR 403
        </Typography>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            mt: 1,
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            color: "#0F172A",
          }}
        >
          Bạn không có quyền truy cập trang này
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            mt: 2,
            color: "#64748B",
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          Có thể bạn chưa được cấp quyền hoặc phiên đăng nhập đã hết hạn. Vui
          lòng quay về trang chủ hoặc liên hệ quản trị viên nếu bạn nghĩ đây là
          sự nhầm lẫn.
        </Typography>

        {/* Status Accent Example */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              fontSize: 12,
              bgcolor: "rgba(34,197,94,0.1)",
              color: "#16A34A",
              fontWeight: 500,
            }}
          >
            Secure
          </Box>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: "6px",
              fontSize: 12,
              bgcolor: "rgba(245,158,11,0.1)",
              color: "#D97706",
              fontWeight: 500,
            }}
          >
            Restricted
          </Box>
        </Stack>

        {/* Button */}
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            mt: 4,
            px: 4,
            py: 1.4,
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
            backgroundColor: "#0EA5E9",
            boxShadow: "0 4px 14px rgba(14,165,233,0.25)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#0284C7",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(14,165,233,0.35)",
            },
          }}
        >
          Trở về trang chủ
        </Button>
      </Box>
    </Box>
  );
}
