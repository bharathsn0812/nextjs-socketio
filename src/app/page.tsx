"use client";

import { useEffect, useState } from "react";
import socket from "./socket";
import { randomName } from './utils/randomName';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setName(randomName());
  },[]);

  useEffect(() => {
    socket.on("message", (data: string) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (inputMessage.trim()) {
      socket.emit("message", `${name}: ${inputMessage}`);
      setInputMessage("");
    }
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Real-time Chat</h1>
      <h2 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">Name: {name}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={inputMessage}
        placeholder="Enter Message...."
        onChange={(e) => setInputMessage(e.target.value)}
      />
      <br />
      <br />
      <button 
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={sendMessage}>Send</button>
    </div>
  );
}
