import { createContext, useState, useEffect, useContext } from "react";

const notificationMap = new Map<NotficationDirection, JSX.Element[]>([
  ["top left", []],
  ["top center", []],
  ["top right", []],
]);

type NotficationDirection = "top left" | "top center" | "top right";

type NotificationHandlerArgs = {
  element: JSX.Element;
  direction: NotficationDirection;
};

type NotificationContextType = {
  notificationHandler: ({
    element,
    direction,
  }: // direction
  NotificationHandlerArgs) => void;
  show: boolean;
  type: string;
  message: string;
  // direction: "top right"
};

const NotificationContext = createContext<NotificationContextType>({
  notificationHandler: () => {},
  show: false,
  type: "",
  message: "",
  // direction: "top right",
});

export const NotificationProvider = (props: { children: JSX.Element }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [map, setMap] = useState(notificationMap);

  const notificationHandler = (args: NotificationHandlerArgs) => {
    const copyMap = new Map(map);
    copyMap.set(args.direction, [...map.get(args.direction)!, args.element]);
    setMap(copyMap);
    setShow(true);
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 100000);

    return () => clearTimeout(time);
  }, [show]);

  return (
    <NotificationContext.Provider
      value={{ notificationHandler, show, type, message }}
    >
      <div className="fixed top-0 left-4">
        {map.get("top left")?.map((noti, i) => {
          return <div key={i}>{noti}</div>;
        })}
      </div>
      <div className="fixed top-0 right-4">
        {map.get("top right")?.map((noti, i) => {
          return <div key={i}>{noti}</div>;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
``;
