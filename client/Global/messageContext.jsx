import React, { createContext, useContext } from "react";
import { message } from "antd";

const MessageContext = createContext(null);

export const MessageProvider = ({ children }) => {
  const [api, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={api}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
