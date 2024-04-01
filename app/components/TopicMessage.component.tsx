import React from "react";
import { NtfyMessage } from "~/models";

interface TopicMessageProps {
  message: NtfyMessage;
}

const TopicMessage: React.FC<TopicMessageProps> = ({ message }) => {
  return (
    <div>
      {message.title && <b>{message.title}</b>}
      <p>{message.message}</p>
    </div>
  );
};

export default TopicMessage;
