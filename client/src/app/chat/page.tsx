"use client";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../zustand/useAuthStore";
import { useUsersStore } from "../zustand/useUsersStore";
import { useChatReceiver } from "../zustand/useChatReceiver";
import ChatUsers from "../_components/ChatUsers";
type Message = {
  receiver: boolean;
  msg: string;
};

export default function Chat() {
  const [msg, setMsg] = useState<string>("");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>();
  const { authName } = useAuthStore();
  const { receiver } = useChatReceiver();
  const { updateUsersStore } = useUsersStore();
  async function getUserData() {
    try {
      const res = await axios.get("http://localhost:5000/users", {
        withCredentials: true,
      });
      updateUsersStore(res.data);
    } catch (err) {
      console.log("some error occured");
    }
  }
  useEffect(() => {
    const newSocket = io("http://localhost:8080/", {
      query: {
        username: authName,
      },
    });
    setSocket(newSocket);
    newSocket.on("chat msg", (msg) => {
      console.log(msg);
      const currMessage = { receiver: true, msg: msg.textMsg };
      setMsgs((prevMsg) => [...prevMsg, currMessage]);
    });

    getUserData();

    return () => {
      newSocket.close();
    };
  }, []);

  function sendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (socket) {
      const msgToBeSent = {
        textMsg: msg,
        sender: authName,
        receiver,
      };
      socket.emit("chat msg", msgToBeSent);
      setMsgs((prevMsg) => [...prevMsg, { receiver: false, msg }]);
      setMsg("");
    }
  }

  return (
    <div className="h-screen flex divide-x-4">
      <div className="w-1/5 ">
        <ChatUsers />
      </div>
      <div className="w-4/5">
        <div className="w-1/5">
          <h1>
            {authName} is chatting with {receiver}
          </h1>
        </div>
        <div className="msgs-container 3/5">
          {msgs.map((message, index) => (
            <div
              key={index}
              className={`mt-4 ${
                message.receiver ? "text-left " : "text-right"
              }`}
            >
              <span
                className={`rounded-2xl p-2 ${
                  message.receiver ? "bg-gray-600" : "bg-green-600"
                }`}
              >
                {message.msg}
              </span>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 w-full h-1/5  flex items-center justify-center  z-50">
          <form onSubmit={sendMsg} className="w-1/2">
            <div className="relative">
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your text here"
                required
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
