import React, { useState } from "react";
import logo from "../assets/akshat_logo.png";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id);
    toast("Created new room");
  };
  const joinRoom = () => {
    if (!roomId || !username) {
      toast("Room ID and Username is required !");
      return;
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code == "Enter") {
      console.log(e.code);
      joinRoom();
    }
  };
  return (
    <>
      <div className="bg-[#232432] lg:w-1/2 md:w-1/2 mt-48 rounded-xl p-3 mx-auto flex items-center justify-center items-center flex flex-col">
        <div className="flex w-full px-10 flex-row items-center justify-between">
          <img src={logo} className="" width={90} />
          <h1 className="">Realtime collaboration</h1>
        </div>
        <div className="w-full">
          <h3>Paste invitation Room ID</h3>
          <input
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mt-2 rounded-lg p-1 outline-none text-black"
            placeholder="ROOM ID"
            onKeyUp={handleInputEnter}
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mt-2 rounded-lg p-1 outline-none text-black"
            placeholder="USERNAME"
            onKeyUp={handleInputEnter}
          />
          <div className="justify-end flex">
            <button
              onClick={joinRoom}
              className="bg-[#41df7b] font-bold rounded-lg mt-2 text-black  px-4 py-1"
            >
              Join
            </button>
          </div>
          <h3 className="justify-center flex gap-1 mt-2 text-sm">
            If you don't have an invite then create{" "}
            <Link className="text-[#41df7b] underline" onClick={createNewRoom}>
              new room
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
};
export default Home;
