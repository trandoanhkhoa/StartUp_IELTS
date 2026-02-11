import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
  Fade,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import adminApi from "@/api/adminApi.jsx";

import { useAddWritingOverlay } from "@/pages/admin/writings/useAddWriting.jsx";
import { useUpdateWritingOverlay } from "@/pages/admin/writings/useUpdateWriting.jsx";
import { useImportWritingOverlay } from "@/pages/admin/writings/useImportWriting.jsx";

import { useEffect, useState } from "react";

import { useConfirm } from "@/components/Hooks/useConfirm.jsx";
import { useNotification } from "@/components/Hooks/useNotification.jsx";

export default function AdminWritingList() {
  //Data
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  //filter page
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  //Confirm dialog
  const { confirm, ConfirmRenderer } = useConfirm();

  // Notification
  const { show, NotificationRenderer } = useNotification();

  //Add Writing Logic
  const { openAddWriting, AddWritingRenderer } = useAddWritingOverlay({
    onSuccess: () => {
      show({
        severity: "success",
        message: "Writing added successfully!",
      });
      loadData();
    },
    onError: () => {
      show({
        severity: "error",
        message: "Failed to add writing.",
      });
    },
  });
  //Update Writing Logic
  const { openUpdateWriting, UpdateWritingRenderer } = useUpdateWritingOverlay({
    onSuccess: () => {
      show({
        severity: "success",
        message: "Writing updated successfully!",
      });
      loadData();
    },
    onError: () => {
      show({
        severity: "error",
        message: "Failed to update writing.",
      });
    },
  });
  // Import Writing Logic
  const { openImport, ImportWritingRenderer } = useImportWritingOverlay({
    onSuccess: () => {
      show({
        severity: "success",
        message: "Imported successfully!",
      });
      loadData(); // reload danh sách
    },
  });

  const task1Types = [
    "Line Chart",
    "Bar Chart",
    "Map",
    "Process",
    "Mixed Chart",
    "Table",
  ];

  const task2Types = [
    "Agree or Disagree",
    "Discussion",
    "Advantages and Disadvantages",
    "Causes Problems and Solutions",
    "Part Question",
  ];

  const typeOptions =
    taskFilter === "Task 1"
      ? task1Types
      : taskFilter === "Task 2"
        ? task2Types
        : [];
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getWritings({
        page,
        pageSize,
        includeHidden: statusFilter === "all",
        taskType: taskFilter === "all" ? undefined : taskFilter,
        type: typeFilter === "all" ? undefined : typeFilter,
        source: sourceFilter === "all" ? undefined : sourceFilter,
      });

      setRows(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadData();
  }, [page, statusFilter]);

  const handleDelete = async (writingId) => {
    const ok = await confirm({
      title: "Xóa bài Writing?",
      message: "Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa?",
    });

    if (!ok) return;

    const res = await adminApi.deleteWriting(writingId);
    if (res.status === 200) {
      await loadData();
      show({
        message: "Xóa bài viết thành công!",
        severity: "success",
      });
    } else {
      show({
        message: "Xóa bài viết thất bại!",
        severity: "error",
      });
    }
  };
  // ===== FILTER LOGIC =====
  const filteredRows = rows.filter((row) => {
    const matchSearch = row.question
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchTask = taskFilter === "all" || row.taskType === taskFilter;

    const matchType = typeFilter === "all" || row.type === typeFilter;

    const matchSource = sourceFilter === "all" || row.source === sourceFilter;

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "visible" && !row.hide) ||
      (statusFilter === "hidden" && row.hide);

    return matchSearch && matchTask && matchType && matchSource && matchStatus;
  });

  return (
    <>
      <ConfirmRenderer />
      <NotificationRenderer />
      <AddWritingRenderer />
      <UpdateWritingRenderer />
      <ImportWritingRenderer />
      <Fade in timeout={400}>
        <Box sx={{ p: 4 }}>
          {/* ===== Header ===== */}
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Writings</Typography>
            <Typography color="text.secondary">
              Manage IELTS writing questions
            </Typography>
          </Stack>

          {/* ===== Toolbar ===== */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={openAddWriting}
                startIcon={<AddIcon />}
              >
                Add writing
              </Button>

              <Button
                variant="outlined"
                onClick={openImport}
                startIcon={<UploadFileIcon />}
              >
                Import Excel
              </Button>
            </Stack>
          </Stack>

          {/* ===== Filter Bar ===== */}
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              p: 1.5,
              border: "1px solid rgba(15,23,42,.08)",
              bgcolor: "background.paper",
            }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              alignItems="center"
              flexWrap="wrap"
            >
              <TextField
                size="small"
                placeholder="Search question…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ minWidth: 220 }}
              />

              {/* Task Filter */}
              <TextField
                select
                size="small"
                value={taskFilter}
                onChange={(e) => {
                  setTaskFilter(e.target.value);
                  setTypeFilter("all"); // reset type khi đổi task
                }}
                sx={{ minWidth: 140 }}
              >
                <MenuItem value="all">All tasks</MenuItem>
                <MenuItem value="Task 1">Task 1</MenuItem>
                <MenuItem value="Task 2">Task 2</MenuItem>
              </TextField>

              {/* Type Filter (dynamic) */}
              <TextField
                select
                size="small"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                sx={{ minWidth: 220 }}
                disabled={taskFilter === "all"}
              >
                <MenuItem value="all">All types</MenuItem>
                {typeOptions.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              {/* Source Filter */}
              <TextField
                select
                size="small"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                sx={{ minWidth: 180 }}
              >
                <MenuItem value="all">All sources</MenuItem>
                <MenuItem value="Cambridge">Cambridge</MenuItem>
                <MenuItem value="IELTS Collection">IELTS Collection</MenuItem>
              </TextField>

              {/* Status Filter */}
              <TextField
                select
                size="small"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 140 }}
              >
                <MenuItem value="all">All status</MenuItem>
                <MenuItem value="visible">Visible</MenuItem>
                <MenuItem value="hidden">Hidden</MenuItem>
              </TextField>

              <Box flex={1} />

              <Typography variant="caption" color="text.secondary">
                {filteredRows.length} results
              </Typography>
            </Stack>
          </Paper>

          {/* ===== Table ===== */}

          <Paper
            elevation={0}
            sx={{
              border: "1px solid rgba(15,23,42,.08)",
              overflow: "hidden",
            }}
          >
            <Box
              component="table"
              sx={{ width: "100%", borderCollapse: "collapse" }}
            >
              <Box component="thead" sx={{ bgcolor: "#F8FAFC" }}>
                <Box component="tr">
                  {["ID", "Task", "Question", "Status", "Actions"].map((h) => (
                    <Box
                      key={h}
                      component="th"
                      sx={{
                        textAlign: "left",
                        px: 2,
                        py: 1.5,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "text.secondary",
                        borderBottom: "1px solid rgba(15,23,42,.08)",
                      }}
                    >
                      {h}
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box component="tbody">
                {loading && (
                  <Box component="tr">
                    <Box component="td" colSpan={5}>
                      <LoadingState />
                    </Box>
                  </Box>
                )}

                {!loading && filteredRows.length === 0 && (
                  <Box component="tr">
                    <Box component="td" colSpan={5}>
                      <EmptyState />
                    </Box>
                  </Box>
                )}

                {!loading &&
                  filteredRows.map((row) => (
                    <Box
                      component="tr"
                      key={row.id}
                      sx={{
                        transition: "background .15s ease",
                        "&:hover": { bgcolor: "rgba(14,165,233,.04)" },
                      }}
                    >
                      <Cell>{row.id}</Cell>

                      <Cell>
                        <Chip
                          size="small"
                          label={row.taskType}
                          sx={{
                            bgcolor: "rgba(14,165,233,.1)",
                            color: "#0369A1",
                            fontWeight: 600,
                          }}
                        />
                      </Cell>

                      <Cell sx={{ maxWidth: 520 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {row.question}
                        </Typography>
                      </Cell>

                      <Cell>
                        {row.hide ? (
                          <Chip size="small" label="Hidden" color="warning" />
                        ) : (
                          <Chip size="small" label="Visible" color="success" />
                        )}
                      </Cell>

                      <Cell>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          sx={{
                            opacity: 0,
                            transition: "opacity .15s ease",
                            "tr:hover &": {
                              opacity: 1,
                            },
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => {
                              openUpdateWriting(row.id);
                            }}
                          >
                            <EditOutlinedIcon fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteOutlineIcon
                              onClick={() => handleDelete(row.id)}
                              fontSize="small"
                            />
                          </IconButton>
                        </Stack>
                      </Cell>
                    </Box>
                  ))}
              </Box>
            </Box>
          </Paper>
          {/* ===== Pagination ===== */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ p: 2 }}
          >
            <Typography variant="caption" color="text.secondary">
              Page {page} / {totalPages}
            </Typography>

            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
            />
          </Stack>
        </Box>
      </Fade>
    </>
  );
}

// ===== Reusable Cells & States =====

function Cell({ children, sx }) {
  return (
    <Box
      component="td"
      sx={{
        px: 2,
        py: 1.5,
        borderBottom: "1px solid rgba(15,23,42,.06)",
        fontSize: 14,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function EmptyState() {
  return (
    <Box sx={{ textAlign: "center", py: 10, color: "text.secondary" }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        No writings yet
      </Typography>
      <Typography variant="body2">
        Start by adding a new writing or import from Excel
      </Typography>
    </Box>
  );
}

function LoadingState() {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="body2" color="text.secondary">
        Loading writings…
      </Typography>
    </Box>
  );
}
