import { createContext, ReactNode, useContext, useRef } from "react";
import { io } from "socket.io-client";

export interface ContextType {
  socket: any;
}

export const SocketContext = createContext<ContextType>({} as ContextType);

export const useSocketContext = () => useContext(SocketContext);

const SocketContextProvider = (props: { children?: ReactNode }) => {
  const socketRef = useRef<any>(
    io(process.env.NEXT_PUBLIC_API_HOST ?? "", { autoConnect: false })
  );

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
