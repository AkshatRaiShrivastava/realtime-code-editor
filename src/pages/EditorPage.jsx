import React, { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import logo from "../assets/akshat_logo.png";
import Clients from "../components/clients";
import Editor from "../components/editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { toast } from "sonner";

const EditorPage = () => {
  const location = useLocation();
  const { roomId } = useParams();
  const socketRef = useRef(null);
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);
  const codeRef = useRef(null)
  useEffect(() => {
    const init = async () => {
      socketRef.current = initSocket();
      socketRef.current.on("connect_err", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(e) {
        console.log("socket error", e);
        toast.error("Socket connection failed, try again later");
        reactNavigator("/");
      }

      socketRef.current.emit(ACTIONS.JOIN, {  
        roomId,
        username: location.state?.username,
      });

      // Listening for joined event
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room`);
            console.log(`${username} joined`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });

        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);
  const [isOpen, setIsOpen] = useState(true);

  if (!location.state) {
    return <Navigate to="/" />;
  }
  function leaveRoom() {
    reactNavigator('/');
}

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied to clipboard!");
    } catch {
      toast.error("Failed to copy Room ID!");
    }
  };
  return (
    <>
      {/* <div className="w-full h-screen flex ">
        <div className="h-screen basis-4/10 bg-[#24292e] py-5 flex flex-col items-center">
          <div className="flex justify-between w-full px-4 flex-row items-center ">
            <img src={logo} width={70} />
            <h3 className="text-sm">
              Realtime <br></br>collaboration
            </h3>
          </div>
          <hr className="w-full"/>
          <h3 className="text-[#41df7b] mt-2">Connected</h3>
        </div>
        <div className="h-screen basis-6/10 bg-red-500"></div>
      </div> */}
      <div className="flex h-screen ">
        {/* Sidebar */}
        <div
          className={`${
            isOpen ? "visible" : "collapse"
          } bg-[#24292e] text-white duration-300 relative transition animation-spin flex flex-col`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="w-full justify-end flex p-3"
          >
            <IoIosCloseCircle className="text-2xl" />
          </button>
          <nav className="flex-1">
            <div className="flex justify-between w-full px-4 gap-5 items-center ">
              <img src={logo} width={70} />
              <h3 className="text-sm">Collaborate</h3>
            </div>
            <hr className="h-1" />
            <h3 className="text-[#41df7b] justify-center w-full flex">
              Connected
            </h3>
            <div className="grid grid-cols-3 gap-3 px-2 py-4">
              {clients.map((client) => (
                <Clients key={client.socketId} username={client.username} />
              ))}
            </div>
            <div className="bottom-0 absolute w-full  p-2">
              <button
                className=" w-full font-bold bg-neutral-100 text-black rounded-lg py-2 text-base"
                onClick={copyRoomId}
              >
                Copy Room ID
              </button>
              <button className=" mt-2 font-bold w-full bg-[#41df7b] text-black rounded-lg py-2 text-base" onClick={leaveRoom}>
                Leave
              </button>
            </div>
          </nav>
        </div>
        <button
          className={`top-0 absolute mx-3 my-5 duration-500 transition ${
            isOpen ? "collapse" : "visible"
          }`}
          onClick={() => setIsOpen(true)}
        >
          <IoMenu className="text-3xl" />
        </button>
       
        <div className="flex-1 p-6">
          <Editor socketRef={socketRef} roomId={roomId} onCodeChange={(code)=>{codeRef.current = code}} />
        </div>
      </div>
    </>
  );
};
export default EditorPage;
