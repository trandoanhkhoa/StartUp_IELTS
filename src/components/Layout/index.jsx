import { useMemo, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/api/AuthContext.jsx";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
const drawerWidth = 280;

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: <DashboardRoundedIcon /> },

  {
    name: "Writing",
    icon: <MenuBookRoundedIcon />,
    children: [
      {
        name: "Danh sách Topic",
        href: "/writing",
        icon: <EditNoteRoundedIcon />,
      },
      {
        name: "Topic của bạn",
        href: "/writingtest",
        icon: <DescriptionRoundedIcon />,
      },
      { name: "Lịch sử", href: "/history", icon: <HistoryRoundedIcon /> },
    ],
  },

  { name: "Reading", href: "/reading", icon: <AutoStoriesIcon /> },
  { name: "Listening", href: "/listening", icon: <HeadphonesIcon /> },
  { name: "Từ vựng", href: "/vocabulary", icon: <BookmarksIcon /> },
];

function getInitials(name, email) {
  if (name?.trim()) {
    return name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return (email || "U").slice(0, 2).toUpperCase();
}

function BandChip({ band = 0 }) {
  const v = Number(band || 0);

  let color = "default";
  let sx = {};
  if (v >= 7) {
    sx = { bgcolor: "rgba(16,185,129,0.12)", color: "#047857" };
  } else if (v >= 5.5) {
    sx = { bgcolor: "rgba(245,158,11,0.14)", color: "#92400E" };
  } else {
    sx = { bgcolor: "rgba(244,63,94,0.12)", color: "#9F1239" };
  }

  return (
    <Chip
      size="small"
      label={`Band ${v ? v.toFixed(1) : "--"}`}
      sx={{
        borderRadius: 999,
        fontWeight: 700,
        ...sx,
      }}
    />
  );
}

export default function AppLayout({ children }) {
  const { profile, signOut, isAdmin } = useAuth();
  const [openDocs, setOpenDocs] = useState(true);
  const isChildActive = (children) =>
    children?.some((c) => location.pathname === c.href);
  const location = useLocation();
  const navigate = useNavigate();

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const initials = useMemo(
    () => getInitials(profile?.name, profile?.email),
    [profile?.name, profile?.email],
  );

  const isActivePath = (href) => location.pathname === href;
  const activeWriting = useMemo(() => {
    return ["/task1", "/task2", "/history"].some((p) =>
      location.pathname.startsWith(p),
    );
  }, [location.pathname]);

  const [openWriting, setOpenWriting] = useState(activeWriting);

  // Khi reload ở /task1 /task2 /history thì tự mở group
  useEffect(() => {
    if (activeWriting) setOpenWriting(true);
  }, [activeWriting]);
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Brand */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 2, height: 64 }}
      >
        <Stack
          component={Link}
          to="/dashboard"
          direction="row"
          alignItems="center"
          spacing={1.2}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 3,
              bgcolor: "rgba(14,165,233,0.12)",
              display: "grid",
              placeItems: "center",
              border: "1px solid rgba(14,165,233,0.20)",
            }}
          >
            <EditNoteRoundedIcon sx={{ color: "primary.main" }} />
          </Box>

          <Box>
            <Typography fontWeight={800} fontSize={14} lineHeight={1.2}>
              IELTS Grader
            </Typography>
            <Typography fontSize={12} color="text.secondary">
              Task 1 · Task 2
            </Typography>
          </Box>
        </Stack>

        {!isLgUp && (
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        )}
      </Stack>

      <Divider />

      {/* Nav */}
      <Box sx={{ px: 1.5, py: 2, flex: 1, overflow: "auto" }}>
        <Typography
          sx={{
            px: 1.5,
            pb: 1,
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.8,
            color: "text.secondary",
          }}
        >
          WORKSPACE
        </Typography>

        <List disablePadding sx={{ display: "grid", gap: 0.5 }}>
          {navigation.map((item) => {
            const active = location.pathname === item.href;
            const childActive = isChildActive(item.children);

            // ===== MENU CÓ CON =====
            if (item.children) {
              return (
                <Box key={item.name}>
                  <ListItemButton
                    onClick={() => setOpenDocs(!openDocs)}
                    sx={{
                      borderRadius: 3,
                      px: 1.5,
                      py: 1.2,
                      bgcolor: childActive
                        ? "rgba(14,165,233,0.08)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: "rgba(15,23,42,0.04)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: childActive ? "primary.main" : "text.secondary",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.name}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: childActive ? 800 : 600,
                      }}
                    />

                    <Box
                      sx={{
                        transform: openDocs ? "rotate(90deg)" : "rotate(0deg)",
                        transition: "transform .15s ease",
                        color: "text.secondary",
                      }}
                    >
                      ▶
                    </Box>
                  </ListItemButton>

                  {/* ===== MENU CON ===== */}
                  <Collapse in={openDocs} timeout="auto" unmountOnExit>
                    <List disablePadding sx={{ pl: 2, mt: 0.5 }}>
                      {item.children.map((child) => {
                        const activeChild = location.pathname === child.href;

                        return (
                          <ListItemButton
                            key={child.href}
                            component={Link}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            sx={{
                              borderRadius: 2.5,
                              px: 1.5,
                              py: 1,
                              mb: 0.5,
                              bgcolor: activeChild
                                ? "rgba(14,165,233,0.10)"
                                : "transparent",
                              border: activeChild
                                ? "1px solid rgba(14,165,233,0.18)"
                                : "1px solid transparent",
                              "&:hover": {
                                bgcolor: activeChild
                                  ? "rgba(14,165,233,0.12)"
                                  : "rgba(15,23,42,0.04)",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 32,
                                color: activeChild
                                  ? "primary.main"
                                  : "text.secondary",
                              }}
                            >
                              {child.icon}
                            </ListItemIcon>

                            <ListItemText
                              primary={child.name}
                              primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: activeChild ? 700 : 500,
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            // ===== MENU THƯỜNG =====
            return (
              <ListItemButton
                key={item.href}
                component={Link}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: 3,
                  px: 1.5,
                  py: 1.2,
                  bgcolor: active ? "rgba(14,165,233,0.10)" : "transparent",
                  border: active
                    ? "1px solid rgba(14,165,233,0.18)"
                    : "1px solid transparent",
                  "&:hover": {
                    bgcolor: active
                      ? "rgba(14,165,233,0.12)"
                      : "rgba(15,23,42,0.04)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: active ? 800 : 600,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* User Card */}
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.5}
          sx={{
            p: 1.5,
            borderRadius: 4,
            bgcolor: "rgba(15,23,42,0.03)",
            border: "1px solid rgba(15,23,42,0.08)",
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: "rgba(14,165,233,0.12)",
              color: "primary.main",
              fontWeight: 900,
            }}
          >
            {initials}
          </Avatar>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography fontWeight={800} fontSize={13} noWrap>
              {profile?.fullname || "Người dùng"}
            </Typography>
            <Typography fontSize={12} color="text.secondary" noWrap>
              {profile?.email}
            </Typography>
          </Box>

          <Tooltip title="Đăng xuất">
            <IconButton onClick={handleSignOut}>
              <LogoutRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* AppBar */}
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          bgcolor: "rgba(255,255,255,0.70)",
        }}
      >
        <Toolbar sx={{ px: { xs: 1.5, lg: 4 } }}>
          {!isLgUp && (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ mr: 1 }}>
              <MenuRoundedIcon />
            </IconButton>
          )}

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography fontSize={12} color="text.secondary" fontWeight={700}>
              IELTS Writing
            </Typography>
            {/* <Typography fontSize={14} fontWeight={900} noWrap>
              {navigation.find((n) => n.href === location.pathname)?.name ||
                (location.pathname === "/admin" ? "Quản lý" : "Trang")}
            </Typography> */}
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            <BandChip band={profile?.avgBand ?? 0} />

            <Tooltip title="Tài khoản">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Badge
                  variant="dot"
                  overlap="circular"
                  color="primary"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: "rgba(14,165,233,0.12)",
                      color: "primary.main",
                      fontWeight: 900,
                    }}
                  >
                    {initials}
                  </Avatar>
                </Badge>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorEl}
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 4,
                  minWidth: 220,
                  border: "1px solid rgba(15,23,42,0.10)",
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography fontWeight={900} fontSize={13} noWrap>
                  {profile?.name || "Người dùng"}
                </Typography>
                <Typography fontSize={12} color="text.secondary" noWrap>
                  {profile?.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem
                component={Link}
                to="/dashboard"
                onClick={() => setAnchorEl(null)}
              >
                Dashboard
              </MenuItem>
              <MenuItem
                component={Link}
                to="/history"
                onClick={() => setAnchorEl(null)}
              >
                Lịch sử
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleSignOut}
                sx={{ color: "error.main", fontWeight: 800 }}
              >
                Đăng xuất
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box sx={{ display: "flex" }}>
        {/* Desktop drawer */}
        {isLgUp && (
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(12px)",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Mobile drawer */}
        {!isLgUp && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                bgcolor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(12px)",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            px: { xs: 2, lg: 0 },
            py: { xs: 2, lg: 0 },
            width: "100%",
            // mx: "10%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
/** item cấp 1 */
function NavItem({ name, href, icon, active, setMobileOpen }) {
  return (
    <ListItemButton
      component={Link}
      to={href}
      onClick={() => setMobileOpen?.(false)}
      sx={{
        borderRadius: 3,
        px: 1.5,
        py: 1.2,
        bgcolor: active ? "rgba(14,165,233,0.10)" : "transparent",
        border: active
          ? "1px solid rgba(14,165,233,0.18)"
          : "1px solid transparent",
        "&:hover": {
          bgcolor: active ? "rgba(14,165,233,0.12)" : "rgba(15,23,42,0.04)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 36,
          color: active ? "primary.main" : "text.secondary",
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={name}
        primaryTypographyProps={{
          fontSize: 14,
          fontWeight: active ? 800 : 600,
        }}
      />
    </ListItemButton>
  );
}

/** item con (indent + line dọc) */
function NavChildItem({ name, href, icon, active, setMobileOpen }) {
  return (
    <ListItemButton
      component={Link}
      to={href}
      onClick={() => setMobileOpen?.(false)}
      sx={{
        borderRadius: 3,
        px: 1.5,
        py: 1.05,
        ml: 1.25,
        position: "relative",
        "&:before": {
          content: '""',
          position: "absolute",
          left: 14,
          top: 10,
          bottom: 10,
          width: 2,
          borderRadius: 99,
          bgcolor: active ? "rgba(14,165,233,0.45)" : "rgba(15,23,42,0.08)",
        },
        bgcolor: active ? "rgba(14,165,233,0.10)" : "transparent",
        "&:hover": {
          bgcolor: active ? "rgba(14,165,233,0.12)" : "rgba(15,23,42,0.04)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 36,
          color: active ? "primary.main" : "text.secondary",
        }}
      >
        {icon}
      </ListItemIcon>

      <ListItemText
        primary={name}
        primaryTypographyProps={{
          fontSize: 13.5,
          fontWeight: active ? 800 : 600,
        }}
      />
    </ListItemButton>
  );
}
