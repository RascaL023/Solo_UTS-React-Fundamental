import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

const MAX_NOTIFICATIONS = 30;

export function useNotifications() {
  const [notifications, setNotifications] = useLocalStorage("waras:notifications", []);

  const addNotification = useCallback(
    ({ type, title, message }) => {
      const notification = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type,
        title,
        message,
        createdAt: new Date().toISOString(),
        read: false,
      };

      setNotifications((current) => [notification, ...current].slice(0, MAX_NOTIFICATIONS));
    },
    [setNotifications],
  );

  const markAllRead = useCallback(() => {
    setNotifications((current) =>
      current.some((notification) => !notification.read)
        ? current.map((notification) =>
            notification.read ? notification : { ...notification, read: true },
          )
        : current,
    );
  }, [setNotifications]);

  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return { notifications, unreadCount, addNotification, markAllRead };
}
