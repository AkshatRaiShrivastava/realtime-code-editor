import { io } from "socket.io-client";

export const initSocket = () => {
  const options = {
    transports: ["websocket"],
    upgrade: false,
  };
  return io("/", options);
};
