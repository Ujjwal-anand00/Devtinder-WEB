import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [targetUserName, setTargetUserName] = useState("Loading...");
  const [targetUserPhoto, setTargetUserPhoto] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const scrollContainerRef = useRef(null);
  const socketRef = useRef(null);

  const fetchChatMessages = async () => {
    const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
      withCredentials: true,
    });

    const target = chat.data.participants.find(
      (p) => String(p._id) !== String(userId)
    );
    if (target) {
      setTargetUserName(`${target.firstName} ${target.lastName || ""}`);
      setTargetUserPhoto(target.photoUrl || null);
    }

    const chatMessages = chat.data.messages.map((msg) => ({
      firstName: msg?.senderId?.firstName,
      lastName: msg?.senderId?.lastName,
      message: msg?.text,
      senderId: String(msg?.senderId?._id),
    }));

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, message }) => {
      setMessages((prev) => [
        ...prev,
        { firstName, lastName, message, senderId: targetUserId },
      ]);
    });
    socket.on("updateUserStatus", ({ userId: changedId, status }) => {
      if (String(changedId) === String(targetUserId)) {
        setIsOnline(status === "online");
      }
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center space-x-3 border-b border-slate-600 px-4 py-3 sm:px-6 mt-16">
        {targetUserPhoto ? (
          <img
            src={targetUserPhoto}
            alt={targetUserName}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-600" />
        )}
        <h1 className="text-base sm:text-lg font-semibold truncate max-w-[70%]">
          {targetUserName}
        </h1>
        <span
          className={`w-3 h-3 rounded-full ${
            isOnline ? "bg-green-500" : "bg-red-500"
          }`}
          title={isOnline ? "Online" : "Offline"}
        ></span>
        <span className="text-sm text-gray-600">
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800"
      >
        {messages.map((msg, index) => {
          const isSender = String(msg.senderId) === String(userId);
          return (
            <div
              key={index}
              className={`chat ${isSender ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header text-xs sm:text-sm">
                {`${msg.firstName} ${msg.lastName}`}
              </div>
              <div className="chat-bubble max-w-[80%] sm:max-w-[60%] break-words">
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 p-3 sm:p-4 border-t border-slate-600 bg-gray-900">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 sm:p-3 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Chat;
