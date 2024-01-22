import React, { useState, useRef, useEffect } from "react";
import { Input, Button, Space, List } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { AiOutlineSend } from "react-icons/ai";

const Chat = ({ user, onClose, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef({});

  useEffect(() => {
    // Al cambiar de usuario, establece el historial de mensajes para el usuario actual
    setMessages(messagesRef.current[user.id] || []);
  }, [user]);

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    // Agrega el mensaje al historial del usuario actual
    const newMessages = [
      ...(messagesRef.current[user.id] || []),
      { user: "You", text: message },
    ];
    messagesRef.current = { ...messagesRef.current, [user.id]: newMessages };

    // Actualiza el estado para mostrar el nuevo historial de mensajes
    setMessages(newMessages);

    // Limpia el campo de mensaje
    setMessage("");

    // Llama a la función para enviar el mensaje
    onSendMessage(user.id, message);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container bg-white text-black">
      <div className="chat-header flex justify-between p-5 border-b-4">
        <span className="text-2xl text-bold">{`Chat con ${user.firstName} ${user.lastName}`}</span>
        <Button icon={<CloseOutlined />} onClick={onClose} />
      </div>
      <div className="chat-messages">
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <div>{`${item.user}: ${item.text}`}</div>
            </List.Item>
          )}
        />
      </div>
      <div className="chat-input flex justify-around">
        <Input
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Space>
          <AiOutlineSend
            type="primary"
            className="text-black h-7 w-7"
            onClick={handleSendMessage}
          ></AiOutlineSend>
        </Space>
      </div>
    </div>
  );
};

export default Chat;
