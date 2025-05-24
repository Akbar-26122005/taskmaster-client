// messageManager.js
import React, { createRef, useState, useEffect } from 'react';

const messageListRef = createRef();

export const MessageSystem = () => {
  const [messages, setMessages] = useState([]);

  // Автоматическое удаление через 5 секунд
  useEffect(() => {
    const timer = setInterval(() => {
      if (messages.length > 0) {
        const now = Date.now();
        setMessages(prev => 
          prev.filter(msg => now - msg.id < 5000)
        );
      }
    }, 1000); // Проверяем каждую секунду

    return () => clearInterval(timer);
  }, [messages]);

  // Регистрируем API в ref
  messageListRef.current = {
    addMessage: (text, type) => {
      const id = Date.now();
      setMessages(prev => [...prev, { id, text, type }]);
      
      // Автоудаление через 5 сек (альтернативный вариант)
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      }, 5000);
    },
    clearMessages: () => setMessages([])
  };

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="message-list no-copy">
      {messages.map(msg => (
        <div 
          key={msg.id} 
          className={`message-tile ${msg.type}`}
          onClick={() => handleDelete(msg.id)}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

// Экспортируем функцию для добавления сообщений
export const showMessage = (text, type) => {
  messageListRef.current?.addMessage(text, type);
};