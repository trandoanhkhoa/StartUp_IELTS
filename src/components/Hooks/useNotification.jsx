import { useState } from "react";
import Notification from "@/components/Hooks/Notification.jsx";

export function useNotification() {
  const [noti, setNoti] = useState(null);

  const show = ({ type, message, duration }) => {
    setNoti({ type, message, duration });
  };

  const NotificationRenderer = () =>
    noti ? <Notification {...noti} onClose={() => setNoti(null)} /> : null;

  return { show, NotificationRenderer };
}
