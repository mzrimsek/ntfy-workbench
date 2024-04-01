import React from "react";
import { NtfyMessage } from "~/models";

interface TopicMessageListProps {
  topic?: string;
  messages: NtfyMessage[];
}

const TopicMessageList: React.FC<TopicMessageListProps> = ({
  topic,
  messages,
}) => {
  return (
    <div>
      {topic && <h2>{topic}</h2>}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicMessageList;
