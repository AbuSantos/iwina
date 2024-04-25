import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(url);

    // Clean up socket connection when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [url]);
  return socketRef.current;
};
export default useSocket;
