interface NotificationProps {
  message: string | null;
}

// 21: the reason the backend gave has to reach the user
const Notification = ({ message }: NotificationProps) => {
  if (!message) {
    return null;
  }

  return <p style={{ color: 'red' }}>{message}</p>;
};

export default Notification;
