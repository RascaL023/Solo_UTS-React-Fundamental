import {
  BellOff,
  Heart,
  MessageCircle,
  ReceiptText,
  RotateCcw,
  ShoppingCart,
  Tag,
} from "lucide-react";
import Modal from "./Modal.jsx";

const TYPE_ICONS = {
  favorite: Heart,
  comment: MessageCircle,
  cart: ShoppingCart,
  promo: Tag,
  order: ReceiptText,
  reset: RotateCcw,
};

export default function NotificationModal({ notifications, onClose }) {
  return (
    <Modal open title="Notifikasi" onClose={onClose}>
      {notifications.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <BellOff size={28} className="text-muted" aria-hidden="true" />
          <p className="text-sm text-muted">Belum ada notifikasi.</p>
        </div>
      ) : (
        <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
          {notifications.map((notification) => {
            const Icon = TYPE_ICONS[notification.type] ?? Heart;

            return (
              <li
                key={notification.id}
                className="rounded-2xl border border-line bg-surface p-3"
              >
                <div className="flex gap-2.5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong">
                    <Icon size={14} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{notification.title}</p>
                    <p className="mt-0.5 text-xs text-muted">{notification.message}</p>
                    <time
                      dateTime={notification.createdAt}
                      className="mt-1 block text-[10px] text-muted"
                    >
                      {new Date(notification.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Modal>
  );
}
