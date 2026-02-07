import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/api/AuthContext";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOk("");

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (form.password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      setLoading(true);
      await signUp(form);
      setOk("Tạo tài khoản thành công! Đang chuyển sang đăng nhập...");
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // bgcolor: "background.default",
        backgroundImage:
          "radial-gradient(1200px 500px at 15% 0%, rgba(14,165,233,0.14), transparent 60%), radial-gradient(900px 500px at 85% 10%, rgba(16,185,129,0.10), transparent 60%)",
        display: "grid",
        placeItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 480,
          p: { xs: 3, sm: 3.5 },
          borderRadius: 5,
          border: "1px solid rgba(15,23,42,0.10)",
          bgcolor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Stack spacing={2.2}>
          {/* header */}
          <Stack direction="row" spacing={1.2} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 3,
                bgcolor: "rgba(14,165,233,0.12)",
                border: "1px solid rgba(14,165,233,0.20)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <EditNoteRoundedIcon sx={{ color: "primary.main" }} />
            </Box>
            <Box>
              <Typography
                fontWeight={950}
                sx={{ fontSize: 20, letterSpacing: -0.3 }}
              >
                Tạo tài khoản
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                Bắt đầu chấm bài IELTS Writing ngay
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Alert severity="error" sx={{ borderRadius: 3 }}>
              {error}
            </Alert>
          )}
          {ok && (
            <Alert severity="success" sx={{ borderRadius: 3 }}>
              {ok}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={1.6}>
              <TextField
                value={form.name}
                onChange={handleChange("name")}
                label="Họ và tên"
                placeholder="Nguyễn Văn A"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                value={form.email}
                onChange={handleChange("email")}
                label="Email"
                placeholder="example@gmail.com"
                autoComplete="new-password"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                value={form.password}
                onChange={handleChange("password")}
                label="Mật khẩu"
                placeholder="••••••••"
                type={showPass ? "text" : "password"}
                autoComplete="new-password"
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPass((s) => !s)}
                          size="small"
                        >
                          {showPass ? (
                            <VisibilityOffRoundedIcon fontSize="small" />
                          ) : (
                            <VisibilityRoundedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                label="Xác nhận mật khẩu"
                placeholder="••••••••"
                type={showConfirm ? "text" : "password"}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockRoundedIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm((s) => !s)}
                          size="small"
                        >
                          {showConfirm ? (
                            <VisibilityOffRoundedIcon fontSize="small" />
                          ) : (
                            <VisibilityRoundedIcon fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: 4,
                  py: 1.3,
                  fontWeight: 950,
                  boxShadow: "none",
                  color: "#fff",
                  "&:hover": { boxShadow: "none" },
                }}
              >
                {loading ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={18} />
                    <span>Đang tạo tài khoản...</span>
                  </Stack>
                ) : (
                  "Đăng ký"
                )}
              </Button>

              <Typography
                fontSize={13}
                color="text.secondary"
                textAlign="center"
              >
                Đã có tài khoản?{" "}
                <Typography
                  component={Link}
                  to="/login"
                  sx={{
                    fontWeight: 900,
                    color: "primary.main",
                    textDecoration: "none",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Đăng nhập
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
