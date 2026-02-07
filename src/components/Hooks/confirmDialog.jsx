import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Fade,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  title = "Xác nhận",
  message = "Bạn có chắc chắn không?",
  confirmText = "OK",
  cancelText = "Hủy",
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Fade}
      transitionDuration={150}
      PaperProps={{
        sx: {
          width: 380,
          borderRadius: 3,
          boxShadow: "0 25px 50px rgba(0,0,0,.15), 0 10px 20px rgba(0,0,0,.08)",
          fontFamily: "Inter, system-ui, sans-serif",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(15,23,42,0.35)",
          backdropFilter: "blur(4px)",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 16,
          fontWeight: 600,
          color: "#0f172a",
          pb: 1,
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent sx={{ pt: 0 }}>
        <Typography
          sx={{
            fontSize: 14,
            color: "#475569",
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            color: "#334155",
            borderColor: "#e2e8f0",
            "&:hover": {
              borderColor: "#cbd5f5",
              background: "#f8fafc",
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 2,
            background: "#ef4444",
            "&:hover": {
              background: "#dc2626",
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
