import { useState } from "react";
import ConfirmDialog from "@/components/Hooks/confirmDialog.jsx";

export function useConfirm() {
  const [state, setState] = useState({
    open: false,
    title: "",
    message: "",
    resolve: null,
  });

  const confirm = ({ title, message }) => {
    return new Promise((resolve) => {
      setState({
        open: true,
        title,
        message,
        resolve,
      });
    });
  };

  const handleConfirm = () => {
    state.resolve(true);
    setState({ ...state, open: false });
  };

  const handleCancel = () => {
    state.resolve(false);
    setState({ ...state, open: false });
  };

  const ConfirmRenderer = () => (
    <ConfirmDialog
      open={state.open}
      title={state.title}
      message={state.message}
      confirmText="Xóa"
      cancelText="Hủy"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, ConfirmRenderer };
}
