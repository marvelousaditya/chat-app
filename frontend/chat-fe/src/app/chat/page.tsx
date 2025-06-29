"use client";
import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

type Message = {
  receiver: boolean;
  msg: string;
};

export default function Chat() {
  const [msg, setMsg] = useState<string>("");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {
    const newSocket = io("http://localhost:8080/");
    setSocket(newSocket);

    newSocket.on("chat msg", (message) => {
      setMsgs((prevMsg) => [...prevMsg, message]);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  function sendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (socket) {
      socket.emit("chat msg", { receiver: false, msg });
      setMsgs((prevMsg) => [...prevMsg, { receiver: false, msg }]);
      setMsg("");
    }
  }

  return (
    <div>
      <div className="msgs-container">
        {msgs.map((message, index) => (
          <div
            key={index}
            className={`mt-4 ${message.receiver ? "text-left " : "text-right"}`}
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
      <div className="h-1/5 flex items-center justify-center">
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
  );
}
