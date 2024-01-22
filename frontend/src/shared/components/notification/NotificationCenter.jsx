import { useEffect } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";

const NotificationCenter = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const layout = useSelector((state) => state.layout);

  const openNotification = ({ type, message, description }) => {
    api[type]({ message, description, placement: "bottomRight" });
  };

  useEffect(() => {
    if (layout.notification.message) {
      openNotification(layout.notification);
    }
  }, [layout.notification]);

  return (
    <>
      {contextHolder}
      {children}
    </>
  );
};

export default NotificationCenter;
