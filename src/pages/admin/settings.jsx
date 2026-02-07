import * as React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Fade,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Checkbox,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";

const ui = {
  primary: "#0EA5E9",
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  muted: "rgba(15,23,42,.62)",
  border: "rgba(15,23,42,.08)",
};

function LinearCard({ children, sx }) {
  return (
    <Box
      sx={{
        borderRadius: 4,
        bgcolor: ui.card,
        border: "1px solid",
        borderColor: ui.border,
        overflow: "hidden",
        transition: "all .18s ease",
        "&:hover": { boxShadow: "0 14px 40px rgba(2,6,23,.06)" },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

const ACTIONS = ["view", "create", "edit", "delete"];

const PERMISSION_GROUPS = [
  {
    group: "Classes",
    items: [
      { key: "classes.view", label: "Xem lớp học" },
      { key: "classes.create", label: "Thêm lớp học" },
      { key: "classes.edit", label: "Sửa lớp học" },
      { key: "classes.delete", label: "Xóa lớp học" },
    ],
  },
  {
    group: "Students",
    items: [
      { key: "students.view", label: "Xem học sinh" },
      { key: "students.create", label: "Thêm học sinh" },
      { key: "students.edit", label: "Sửa học sinh" },
      { key: "students.delete", label: "Xóa học sinh" },
      { key: "students.changeClass", label: "Đổi lớp học sinh" },
    ],
  },
  {
    group: "Teachers",
    items: [
      { key: "teachers.view", label: "Xem giáo viên" },
      { key: "teachers.create", label: "Thêm giáo viên" },
      { key: "teachers.edit", label: "Sửa giáo viên" },
      { key: "teachers.delete", label: "Xóa giáo viên" },
    ],
  },
  {
    group: "Writing / Band",
    items: [
      { key: "writing.view", label: "Xem bài viết" },
      { key: "writing.grade", label: "Chấm điểm bài viết" },
      { key: "writing.feedback", label: "Gửi feedback" },
      { key: "band.manage", label: "Quản lý band scores" },
    ],
  },
];

function buildPermissionMapFromKeys(keys = []) {
  const map = {};
  keys.forEach((k) => (map[k] = true));
  return map;
}

function PermissionRow({ label, value, onChange }) {
  return (
    <TableRow
      hover
      sx={{
        transition: "all .15s ease",
        "&:hover": { bgcolor: "rgba(14,165,233,.05)" },
      }}
    >
      <TableCell sx={{ fontWeight: 900, color: ui.text }}>{label}</TableCell>
      <TableCell align="center">
        <Checkbox
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
        />
      </TableCell>
    </TableRow>
  );
}

function PermissionMatrix({
  title,
  description,
  permissions,
  setPermissions,
  showBulkHeader = true,
}) {
  const allKeys = React.useMemo(() => {
    const keys = [];
    PERMISSION_GROUPS.forEach((g) => g.items.forEach((i) => keys.push(i.key)));
    return keys;
  }, []);

  const setAll = (checked) => {
    const next = { ...permissions };
    allKeys.forEach((k) => (next[k] = checked));
    setPermissions(next);
  };

  const countEnabled = allKeys.filter((k) => permissions[k]).length;

  return (
    <LinearCard>
      <Box sx={{ px: 3, py: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Box>
            <Typography sx={{ fontWeight: 1000, color: ui.text }}>
              {title}
            </Typography>
            <Typography sx={{ fontSize: 13, color: ui.muted, mt: 0.5 }}>
              {description}
            </Typography>
          </Box>

          <Chip
            icon={<DoneAllRoundedIcon />}
            label={`${countEnabled} quyền bật`}
            sx={{
              borderRadius: 999,
              fontWeight: 1000,
              bgcolor: "rgba(2,132,199,.10)",
              color: "#0284C7",
            }}
          />
        </Stack>
      </Box>

      <Divider sx={{ borderColor: ui.border }} />

      {showBulkHeader && (
        <>
          <Box sx={{ px: 3, py: 1.5 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Typography
                sx={{ fontSize: 13, color: ui.muted, fontWeight: 900 }}
              >
                Bulk:
              </Typography>
              <Button
                size="small"
                onClick={() => setAll(true)}
                sx={{ fontWeight: 950, borderRadius: 3 }}
              >
                Tick all
              </Button>
              <Button
                size="small"
                onClick={() => setAll(false)}
                sx={{ fontWeight: 950, borderRadius: 3 }}
              >
                Untick all
              </Button>
            </Stack>
          </Box>
          <Divider sx={{ borderColor: ui.border }} />
        </>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
              Chức năng
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 1000, color: ui.text }}>
              Cho phép
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {PERMISSION_GROUPS.map((group) => (
            <React.Fragment key={group.group}>
              <TableRow>
                <TableCell
                  colSpan={2}
                  sx={{
                    bgcolor: "rgba(15,23,42,.03)",
                    fontWeight: 1000,
                    color: ui.text,
                  }}
                >
                  {group.group}
                </TableCell>
              </TableRow>

              {group.items.map((item) => (
                <PermissionRow
                  key={item.key}
                  label={item.label}
                  value={permissions[item.key]}
                  onChange={(checked) =>
                    setPermissions((prev) => ({ ...prev, [item.key]: checked }))
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </LinearCard>
  );
}

/**
 * 3-state checkbox for override:
 * - null: inherit
 * - true: allow
 * - false: deny
 */
function TriStateCheckbox({ value, onChange }) {
  const checked = value === true;
  const indeterminate = value === null;

  return (
    <Checkbox
      checked={checked}
      indeterminate={indeterminate}
      onClick={() => {
        // cycle: inherit(null) -> allow(true) -> deny(false) -> inherit(null)
        if (value === null) onChange(true);
        else if (value === true) onChange(false);
        else onChange(null);
      }}
    />
  );
}

export default function PermissionsPage() {
  // ===== Role-based permissions =====
  const [tab, setTab] = React.useState(0);
  const [role, setRole] = React.useState("teacher");

  const [rolePermissions, setRolePermissions] = React.useState({
    teacher: buildPermissionMapFromKeys([
      "classes.view",
      "students.view",
      "students.edit",
      "writing.view",
      "writing.grade",
      "writing.feedback",
    ]),
    student: buildPermissionMapFromKeys(["writing.view"]),
  });

  // ===== Per-user overrides =====
  const users = React.useMemo(
    () => [
      {
        id: "t1",
        type: "teacher",
        name: "Nguyễn Minh Anh",
        email: "minhanh@gmail.com",
      },
      {
        id: "t2",
        type: "teacher",
        name: "Trần Quốc Bảo",
        email: "bao@gmail.com",
      },
      { id: "s1", type: "student", name: "Nguyễn Văn A", email: "a@gmail.com" },
      { id: "s2", type: "student", name: "Trần Thị B", email: "b@gmail.com" },
    ],
    [],
  );

  const [qUser, setQUser] = React.useState("");
  const [selectedUserId, setSelectedUserId] = React.useState(users[0].id);

  // overrides: { [userId]: { [permissionKey]: null|true|false } }
  const [overrides, setOverrides] = React.useState({
    t1: {
      "classes.view": true,
      "teachers.delete": false, // deny
      "band.manage": null, // inherit
    },
  });

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const filteredUsers = users.filter((u) => {
    const k = qUser.toLowerCase();
    return (
      !qUser ||
      u.name.toLowerCase().includes(k) ||
      u.email.toLowerCase().includes(k)
    );
  });

  const currentRolePerms = rolePermissions[role] || {};
  const setCurrentRolePerms = (next) => {
    setRolePermissions((prev) => ({ ...prev, [role]: next }));
  };

  const currentOverrides = overrides[selectedUserId] || {};
  const setCurrentOverrides = (next) => {
    setOverrides((prev) => ({ ...prev, [selectedUserId]: next }));
  };

  const resetRole = () => {
    // demo reset
    setRolePermissions((prev) => ({
      ...prev,
      [role]: {},
    }));
  };

  const saveRole = () => {
    console.log("SAVE ROLE PERMISSIONS", role, currentRolePerms);
    alert("Đã lưu phân quyền theo role (demo).");
  };

  const saveOverrides = () => {
    console.log("SAVE OVERRIDES", selectedUserId, currentOverrides);
    alert("Đã lưu override theo user (demo).");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: ui.bg, py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Fade in timeout={450}>
          <Box>
            {/* Header */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontSize: { xs: 22, md: 28 },
                  fontWeight: 1000,
                  color: ui.text,
                  letterSpacing: -0.5,
                }}
              >
                Phân quyền
              </Typography>
              <Typography sx={{ fontSize: 14, color: ui.muted }}>
                Thêm / xóa / sửa quyền cho role <b>Teacher</b> và <b>Student</b>
                , hoặc tùy chỉnh riêng cho từng user.
              </Typography>

              <Divider sx={{ borderColor: ui.border }} />
            </Stack>

            {/* Tabs */}
            <LinearCard sx={{ mb: 2 }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                sx={{
                  px: 2,
                  "& .MuiTab-root": { fontWeight: 1000, textTransform: "none" },
                  "& .Mui-selected": { color: ui.primary },
                  "& .MuiTabs-indicator": { bgcolor: ui.primary },
                }}
              >
                <Tab label="Theo Role" />
                <Tab label="Tùy chỉnh theo User" />
              </Tabs>
            </LinearCard>

            {/* Content */}
            {tab === 0 && (
              <Stack spacing={2}>
                {/* Role selector */}
                <LinearCard>
                  <Box sx={{ px: 3, py: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                          Chọn role
                        </Typography>
                        <Typography
                          sx={{ fontSize: 13, color: ui.muted, mt: 0.5 }}
                        >
                          Quyền áp dụng mặc định cho toàn bộ user thuộc role.
                        </Typography>
                      </Grid>

                      <Grid size={{ xs: 12, md: 6 }}>
                        <FormControl fullWidth size="small">
                          <Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            sx={{ borderRadius: 3, bgcolor: "#fff" }}
                          >
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="student">Student</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>

                  <Divider sx={{ borderColor: ui.border }} />

                  <Box sx={{ px: 3, py: 2 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      justifyContent="flex-end"
                    >
                      <Button
                        startIcon={<RestartAltRoundedIcon />}
                        onClick={resetRole}
                        sx={{ fontWeight: 1000, borderRadius: 3 }}
                      >
                        Reset
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<SaveRoundedIcon />}
                        onClick={saveRole}
                        sx={{
                          fontWeight: 1000,
                          borderRadius: 3,
                          bgcolor: ui.primary,
                          "&:hover": { bgcolor: "#0284C7" },
                        }}
                      >
                        Lưu thay đổi
                      </Button>
                    </Stack>
                  </Box>
                </LinearCard>

                <PermissionMatrix
                  title={`Permission Matrix - ${role === "teacher" ? "Teacher" : "Student"}`}
                  description="Tick để bật/tắt quyền."
                  permissions={currentRolePerms}
                  setPermissions={setCurrentRolePerms}
                />
              </Stack>
            )}

            {tab === 1 && (
              <Grid container spacing={2}>
                {/* Left: user list */}
                <Grid size={{ xs: 12, md: 4 }}>
                  <LinearCard>
                    <Box sx={{ px: 3, py: 2 }}>
                      <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                        Chọn user
                      </Typography>
                      <Typography
                        sx={{ fontSize: 13, color: ui.muted, mt: 0.5 }}
                      >
                        Override sẽ ghi đè quyền theo role.
                      </Typography>

                      <TextField
                        value={qUser}
                        onChange={(e) => setQUser(e.target.value)}
                        placeholder="Tìm teacher/student..."
                        size="small"
                        fullWidth
                        sx={{
                          mt: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 3,
                            bgcolor: "#fff",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchRoundedIcon
                                sx={{ color: "rgba(15,23,42,.45)" }}
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>

                    <Divider sx={{ borderColor: ui.border }} />

                    <Box sx={{ p: 1.2 }}>
                      <Stack spacing={0.8}>
                        {filteredUsers.map((u) => {
                          const active = u.id === selectedUserId;
                          return (
                            <Box
                              key={u.id}
                              onClick={() => setSelectedUserId(u.id)}
                              sx={{
                                px: 2,
                                py: 1.2,
                                borderRadius: 3,
                                cursor: "pointer",
                                border: "1px solid",
                                borderColor: active
                                  ? "rgba(14,165,233,.30)"
                                  : "transparent",
                                bgcolor: active
                                  ? "rgba(14,165,233,.08)"
                                  : "transparent",
                                transition: "all .15s ease",
                                "&:hover": { bgcolor: "rgba(15,23,42,.04)" },
                              }}
                            >
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                spacing={1}
                              >
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography
                                    noWrap
                                    sx={{ fontWeight: 1000, color: ui.text }}
                                  >
                                    {u.name}
                                  </Typography>
                                  <Typography
                                    noWrap
                                    sx={{ fontSize: 12.5, color: ui.muted }}
                                  >
                                    {u.email}
                                  </Typography>
                                </Box>

                                <Chip
                                  size="small"
                                  label={u.type}
                                  sx={{
                                    borderRadius: 999,
                                    fontWeight: 1000,
                                    bgcolor:
                                      u.type === "teacher"
                                        ? "rgba(2,132,199,.10)"
                                        : "rgba(34,197,94,.12)",
                                    color:
                                      u.type === "teacher"
                                        ? "#0284C7"
                                        : "#16A34A",
                                  }}
                                />
                              </Stack>
                            </Box>
                          );
                        })}
                      </Stack>
                    </Box>
                  </LinearCard>
                </Grid>

                {/* Right: override matrix */}
                <Grid size={{ xs: 12, md: 8 }}>
                  <LinearCard>
                    <Box sx={{ px: 3, py: 2 }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 1000, color: ui.text }}>
                            Override quyền theo user
                          </Typography>
                          <Typography
                            sx={{ fontSize: 13, color: ui.muted, mt: 0.5 }}
                          >
                            User: <b>{selectedUser?.name}</b> — click checkbox
                            để đổi trạng thái:
                            <b> Inherit → Allow → Deny → Inherit</b>
                          </Typography>
                        </Box>

                        <Button
                          variant="contained"
                          startIcon={<SaveRoundedIcon />}
                          onClick={saveOverrides}
                          sx={{
                            fontWeight: 1000,
                            borderRadius: 3,
                            bgcolor: ui.primary,
                            "&:hover": { bgcolor: "#0284C7" },
                            height: 40,
                          }}
                        >
                          Lưu override
                        </Button>
                      </Stack>
                    </Box>

                    <Divider sx={{ borderColor: ui.border }} />

                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 1000, color: ui.text }}>
                            Chức năng
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontWeight: 1000, color: ui.text }}
                          >
                            Override
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ fontWeight: 1000, color: ui.text }}
                          >
                            Trạng thái
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {PERMISSION_GROUPS.map((group) => (
                          <React.Fragment key={group.group}>
                            <TableRow>
                              <TableCell
                                colSpan={3}
                                sx={{
                                  bgcolor: "rgba(15,23,42,.03)",
                                  fontWeight: 1000,
                                  color: ui.text,
                                }}
                              >
                                {group.group}
                              </TableCell>
                            </TableRow>

                            {group.items.map((item) => {
                              const v =
                                currentOverrides[item.key] === undefined
                                  ? null
                                  : currentOverrides[item.key];

                              return (
                                <TableRow
                                  key={item.key}
                                  hover
                                  sx={{
                                    transition: "all .15s ease",
                                    "&:hover": {
                                      bgcolor: "rgba(14,165,233,.05)",
                                    },
                                  }}
                                >
                                  <TableCell
                                    sx={{ fontWeight: 900, color: ui.text }}
                                  >
                                    {item.label}
                                  </TableCell>

                                  <TableCell align="center">
                                    <TriStateCheckbox
                                      value={v}
                                      onChange={(next) =>
                                        setCurrentOverrides((prev) => ({
                                          ...prev,
                                          [item.key]: next,
                                        }))
                                      }
                                    />
                                  </TableCell>

                                  <TableCell align="center">
                                    {v === null && (
                                      <Chip
                                        size="small"
                                        label="Inherit"
                                        sx={{
                                          borderRadius: 999,
                                          fontWeight: 1000,
                                          bgcolor: "rgba(15,23,42,.08)",
                                          color: "rgba(15,23,42,.75)",
                                        }}
                                      />
                                    )}
                                    {v === true && (
                                      <Chip
                                        size="small"
                                        label="Allow"
                                        sx={{
                                          borderRadius: 999,
                                          fontWeight: 1000,
                                          bgcolor: "rgba(34,197,94,.12)",
                                          color: "#16A34A",
                                        }}
                                      />
                                    )}
                                    {v === false && (
                                      <Chip
                                        size="small"
                                        label="Deny"
                                        sx={{
                                          borderRadius: 999,
                                          fontWeight: 1000,
                                          bgcolor: "rgba(239,68,68,.12)",
                                          color: "#DC2626",
                                        }}
                                      />
                                    )}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </LinearCard>
                </Grid>
              </Grid>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
