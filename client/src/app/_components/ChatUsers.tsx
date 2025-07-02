import { useUsersStore } from "../zustand/useUsersStore";
import { useAuthStore } from "../zustand/useAuthStore";
import { useChatReceiver } from "../zustand/useChatReceiver";
import { useChatMsgsStore } from "../zustand/useChatMsgsStore";
import axios from "axios";
import { useEffect } from "react";

function ChatUsers() {
  const { receiver, updateReceiver } = useChatReceiver();
  const { authName } = useAuthStore();
  const { users } = useUsersStore();
  const { chatMsgs, updateChatMsgs } = useChatMsgsStore();
  useEffect(() => {
    const getMsgs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/msgs", {
          params: {
            sender: authName,
            receiver,
          },
          withCredentials: true,
        });
        if (res.data.length != 0) {
          console.log(res.data);
          updateChatMsgs(res.data);
          console.log(chatMsgs);
        } else {
          updateChatMsgs([]);
        }
      } catch (err: any) {
        console.log("error : ", err.message);
      }
    };
    getMsgs();
  }, [receiver]);
  async function setChatReceiver(user: string) {
    updateReceiver(user);
  }
  return (
    <div>
      <div>
        {users.map((user, index) => {
          if (user.username !== authName)
            return (
              <div
                key={index}
                className="bg-slate-400 rounded-xl m-3 p-5"
                onClick={() => setChatReceiver(user.username)}
              >
                {user.username}
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default ChatUsers;
