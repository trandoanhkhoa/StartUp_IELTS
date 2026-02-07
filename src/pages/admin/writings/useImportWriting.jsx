import { useState } from "react";
import AdminImportWritingOverlay from "@/pages/admin/writings/importwriting.jsx";

export function useImportWritingOverlay({ onSuccess } = {}) {
  const [open, setOpen] = useState(false);

  const openImport = () => setOpen(true);
  const closeImport = () => setOpen(false);

  const ImportWritingRenderer = () => (
    <AdminImportWritingOverlay
      open={open}
      onClose={closeImport}
      onSuccess={() => {
        onSuccess?.();
        closeImport();
      }}
    />
  );

  return {
    openImport,
    ImportWritingRenderer,
  };
}
