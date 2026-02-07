import { useEffect, useState } from "react";

const COLORS = {
  success: {
    border: "#22c55e",
    bg: "#f0fdf4",
    text: "#166534",
  },
  warning: {
    border: "#f59e0b",
    bg: "#fffbeb",
    text: "#92400e",
  },
  error: {
    border: "#ef4444",
    bg: "#fef2f2",
    text: "#991b1b",
  },
  info: {
    border: "#0ea5e9",
    bg: "#f0f9ff",
    text: "#075985",
  },
};

export default function Notification({
  type = "info",
  message = "",
  duration = 2000,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 200); // chờ fade-out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const style = COLORS[type] || COLORS.info;

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        minWidth: 280,
        maxWidth: 360,
        padding: "14px 16px",
        background: style.bg,
        borderLeft: `4px solid ${style.border}`,
        color: style.text,
        borderRadius: 10,
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: 14,
        lineHeight: 1.5,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
        transition: "all 0.2s ease",
      }}
    >
      {message}
    </div>
  );
}
