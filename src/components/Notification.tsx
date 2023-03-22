import NotificationContext from "@/providers/NotificationProvider";
import { useContext } from "react";

type NotficationDirection = "top left" | "top right" | "top center";

const getDirection = (direction: NotficationDirection) => {
  switch (direction) {
    case "top left":
      return "top-16 left-4";
    case "top right":
      return "top-0 right-4";
    case "top center":
      return "top-0 left-1/2 -translate-x-1/2";
    default:
      return "top-0 right-4";
  }
};

function Notification(props: { direction: NotficationDirection }) {
  const { show, type, message, notificationHandler } =
    useContext(NotificationContext);

  return (
    <>
      {show && (
        <div className={`fixed ${getDirection(props.direction)} p-2 m-4`}>
          <div
            className={`${
              type === "success" ? "text-green-500" : "text-red-500"
            } w-fit bg-purple-500`}
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
