"use client";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState<String>("");
  const [msgs, setMsgs] = useState<String[]>([]);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io("http://localhost:8080/");
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  function sendMsg(e: React.FormEvent) {
    e.preventDefault();
    if (socket) {
      socket.emit("message", msg);
      setMsgs([...msgs, msg]);
      setMsg("");
    }
  }

  return (
    <div>
      <div className="msgs-container">
        {msgs.map((msg, index) => (
          <div key={index} className="msg text-right m-5">
            {msg}
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
