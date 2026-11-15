import { useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

export default function ToastStack({ toasts, onDismiss }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:items-end"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3200);
    return () => clearTimeout(timer);
  }, [onDismiss, toast.id]);

  const Icon = toast.tone === "info" ? Info : CheckCircle2;

  return (
    <div className="pointer-events-auto flex w-full items-start gap-2 rounded-2xl border border-line bg-surface-2 px-3 py-2.5 shadow-lg sm:max-w-sm">
      <Icon
        size={16}
        className={toast.tone === "info" ? "mt-0.5 text-brand" : "mt-0.5 text-leaf"}
        aria-hidden="true"
      />
      <p className="flex-1 text-sm">{toast.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Tutup notifikasi singkat"
        className="text-muted transition hover:text-ink"
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
