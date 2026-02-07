import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/api/AuthContext.jsx";

import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

function FadeIn({ children }) {
  return (
    <Box
      sx={{
        animation: "fadeIn .25s ease-out",
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(6px)" },
          to: { opacity: 1, transform: "translateY(0px)" },
        },
      }}
    >
      {children}
    </Box>
  );
}

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const from = useMemo(() => {
    return location.state?.from?.pathname || "/dashboard";
  }, [location.state]);

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email.trim() || !form.password.trim()) {
      setError("Vui lòng nhập đầy đủ Email và Mật khẩu.");
      return;
    }

    try {
      setLoading(true);
      const res = await signIn(form);

      if (res.status) {
        if (from !== "") {
          navigate("/dashboard", { replace: true });
        } else navigate(from, { replace: true });
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.",
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
      <FadeIn>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          sx={{ width: "100%", maxWidth: 980 }}
        >
          {/* Left branding panel */}
          {mdUp && (
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 4,
                borderRadius: 5,
                border: "1px solid rgba(15,23,42,0.10)",
                bgcolor: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: -120,
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(14,165,233,0.20), transparent 45%), radial-gradient(circle at 70% 60%, rgba(16,185,129,0.10), transparent 55%)",
                }}
              />

              <Stack spacing={2} sx={{ position: "relative" }}>
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
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
                    <Typography fontWeight={900} fontSize={16} lineHeight={1.2}>
                      IELTS Grader
                    </Typography>
                    <Typography fontSize={13} color="text.secondary">
                      Writing Task 1 · Task 2
                    </Typography>
                  </Box>
                </Stack>

                <Typography
                  fontWeight={950}
                  sx={{ fontSize: 32, letterSpacing: -0.6 }}
                >
                  Đăng nhập để chấm bài IELTS Writing
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{ fontSize: 14, maxWidth: 420 }}
                >
                  Giao diện sạch sẽ như Notion, trải nghiệm mượt như Linear,
                  feedback rõ ràng như Grammarly.
                </Typography>

                <Stack direction="row" spacing={1}>
                  <ChipBand label="Band 7.0+" type="good" />
                  <ChipBand label="Band 5.5" type="mid" />
                  <ChipBand label="Band 4.0" type="low" />
                </Stack>

                <Box sx={{ pt: 2 }}>
                  <Typography fontSize={12} color="text.secondary">
                    Tip: Dùng <b>monospace editor</b> để kiểm soát cấu trúc câu
                    dễ hơn.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          )}

          {/* Right form */}
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 420,
              p: { xs: 3, sm: 3.5 },
              borderRadius: 5,
              border: "1px solid rgba(15,23,42,0.10)",
              bgcolor: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Stack spacing={2.2}>
              <Box>
                <Typography
                  fontWeight={950}
                  sx={{ fontSize: 22, letterSpacing: -0.3 }}
                >
                  Đăng nhập
                </Typography>
                <Typography fontSize={13} color="text.secondary">
                  Nhập thông tin để tiếp tục
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={1.6}>
                  <TextField
                    value={form.email}
                    onChange={handleChange("email")}
                    label="Email"
                    placeholder="example@gmail.com"
                    autoComplete="off"
                    fullWidth
                    slotProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    value={form.password}
                    onChange={handleChange("password")}
                    label="Mật khẩu"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    autoComplete="new-password"
                    slotProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockRoundedIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? (
                              <VisibilityOffRoundedIcon fontSize="small" />
                            ) : (
                              <VisibilityRoundedIcon fontSize="small" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form.remember}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              remember: e.target.checked,
                            }))
                          }
                        />
                      }
                      label={
                        <Typography fontSize={13}>Ghi nhớ đăng nhập</Typography>
                      }
                    />

                    <Button
                      component={Link}
                      to="/forgot-password"
                      variant="text"
                      sx={{ fontWeight: 800 }}
                    >
                      Quên mật khẩu?
                    </Button>
                  </Stack>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      borderRadius: 4,
                      py: 1.3,
                      fontWeight: 900,
                      color: "#fff",
                      boxShadow: "none",
                      "&:hover": { boxShadow: "none" },
                    }}
                  >
                    {loading ? (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <CircularProgress size={18} />
                        <span>Đang đăng nhập...</span>
                      </Stack>
                    ) : (
                      "Đăng nhập"
                    )}
                  </Button>

                  <Divider sx={{ my: 0.5 }}>
                    <Typography fontSize={12} color="text.secondary">
                      hoặc
                    </Typography>
                  </Divider>

                  <Button
                    component={Link}
                    to="/register"
                    variant="outlined"
                    size="large"
                    sx={{
                      borderRadius: 4,
                      py: 1.2,
                      fontWeight: 900,
                    }}
                  >
                    Tạo tài khoản mới
                  </Button>

                  <Typography
                    fontSize={12}
                    color="text.secondary"
                    textAlign="center"
                  >
                    Bằng việc đăng nhập, bạn đồng ý với <b>Điều khoản</b> và{" "}
                    <b>Chính sách</b>.
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Stack>
      </FadeIn>
    </Box>
  );
}

function ChipBand({ label, type }) {
  let sx = {};
  if (type === "good")
    sx = { bgcolor: "rgba(16,185,129,0.12)", color: "#047857" };
  if (type === "mid")
    sx = { bgcolor: "rgba(245,158,11,0.14)", color: "#92400E" };
  if (type === "low")
    sx = { bgcolor: "rgba(244,63,94,0.12)", color: "#9F1239" };

  return (
    <Box
      sx={{
        px: 1.3,
        py: 0.6,
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 900,
        border: "1px solid rgba(15,23,42,0.08)",
        ...sx,
      }}
    >
      {label}
    </Box>
  );
}
