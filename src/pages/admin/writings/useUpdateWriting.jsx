import { useState } from "react";
import AdminUpdateWritingOverlay from "@/pages/admin/writings/updatewriting.jsx";

export function useUpdateWritingOverlay({ onSuccess, onError } = {}) {
  const [open, setOpen] = useState(false);
  const [writingId, setWritingId] = useState(null);

  const openUpdateWriting = (id) => {
    setWritingId(id);
    setOpen(true);
  };

  const closeUpdateWriting = () => {
    setOpen(false);
    setWritingId(null);
  };

  const UpdateWritingRenderer = () => (
    <AdminUpdateWritingOverlay
      open={open}
      onClose={closeUpdateWriting}
      writingId={writingId}
      onSuccess={() => {
        onSuccess?.();
        closeUpdateWriting();
      }}
      onError={onError}
    />
  );

  return {
    openUpdateWriting,
    closeUpdateWriting,
    UpdateWritingRenderer,
  };
}
