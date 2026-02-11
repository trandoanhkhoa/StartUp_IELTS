import {
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Chip,
} from "@mui/material";
import * as XLSX from "xlsx";
import { useState } from "react";
import adminApi from "@/api/adminApi.jsx";

export default function AdminImportWritingOverlay({
  open,
  onClose,
  onSuccess,
}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===== Parse Excel ===== */
  const handleFile = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    const parsed = json.map((row, idx) => {
      const taskType = String(row.Task ?? "").trim();
      const question = String(row.Question ?? "").trim();
      const type = String(row.Type ?? "").trim();
      const source = String(row.Source ?? "").trim();
      const title = String(row.Title ?? "").trim();
      const category = String(row.Category ?? "").trim();
      const status = String(row.Status ?? "").toLowerCase();

      const valid =
        (taskType === "Task 1" || taskType === "Task 2") && !!question;
      return {
        id: idx,
        taskType,
        imageUrl: row.imageUrl ?? "",
        question,
        type,
        title,
        source,
        category,
        hide: status === "true",
        selected: valid,
        _valid: valid,
      };
    });

    setRows(parsed);
  };

  /* ===== Import ===== */
  const handleImport = async () => {
    const payload = rows
      .filter((r) => r.selected && r._valid)
      .map(({ selected, _valid, id, ...rest }) => rest);

    if (!payload.length) return;

    setLoading(true);
    try {
      await adminApi.importWriting(payload);
      onSuccess?.();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <AppBar position="relative" elevation={0}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6">
            Import Writing from Excel
          </Typography>
          <Button color="inherit" disabled={loading} onClick={handleImport}>
            Import
          </Button>
        </Toolbar>
      </AppBar>

      <Box p={3}>
        {/* Upload */}
        <Button variant="outlined" component="label">
          Upload Excel
          <input
            hidden
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </Button>

        {/* Preview */}
        {rows.length > 0 && (
          <Table sx={{ mt: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Task</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valid</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Checkbox
                      checked={row.selected}
                      disabled={!row._valid}
                      onChange={(e) =>
                        setRows((prev) =>
                          prev.map((r) =>
                            r.id === row.id
                              ? { ...r, selected: e.target.checked }
                              : r,
                          ),
                        )
                      }
                    />
                  </TableCell>

                  <TableCell>{row.taskType}</TableCell>

                  <TableCell>{row.title}</TableCell>

                  <TableCell>{row.type}</TableCell>

                  <TableCell>{row.category}</TableCell>

                  <TableCell>{row.source}</TableCell>

                  <TableCell>{row.question?.slice(0, 80)}</TableCell>

                  <TableCell>{row.hide ? "Hidden" : "Active"}</TableCell>
                  <TableCell>
                    {!row._valid && (
                      <Chip
                        label="Invalid"
                        size="small"
                        color="error"
                        sx={{ ml: 1 }}
                      />
                    )}
                    {row._valid && (
                      <Chip
                        label="valid"
                        size="small"
                        color="success"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Dialog>
  );
}
