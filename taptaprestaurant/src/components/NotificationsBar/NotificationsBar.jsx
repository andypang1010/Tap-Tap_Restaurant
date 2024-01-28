import { useNotification } from "../NotificationContext";
import "./NotificationsBar.css";

export default function NotificationsBar() {
  const { notifications } = useNotification();

  return (
    <ul className="notifications-bar">
      {notifications.map((notification, i) => (
        <Notificiation
          key={i}
          type={notification.type}
          text={notification.message}
        />
      ))}
    </ul>
  );
}

function Notificiation({ type, text }) {
  return (
    <span className={`notification notification--${type}`}>
      {type === "info" && <i className="bx bx-info-circle"></i>}
      {type === "success" && <i className="bx bx-check"></i>}
      {type === "error" && <i className="bx bx-error"></i>}
      {text}
    </span>
  );
}
