import { useState } from "react";
import AdminAddWritingOverlay from "@/pages/admin/writings/addwriting.jsx";

export function useAddWritingOverlay({ onSuccess, onError } = {}) {
  const [open, setOpen] = useState(false);

  const openAddWriting = () => setOpen(true);
  const closeAddWriting = () => setOpen(false);

  const AddWritingRenderer = () => (
    <AdminAddWritingOverlay
      open={open}
      onClose={closeAddWriting}
      onSuccess={() => {
        onSuccess?.();
        closeAddWriting();
      }}
      onError={onError}
    />
  );

  return {
    openAddWriting,
    closeAddWriting,
    AddWritingRenderer,
  };
}
