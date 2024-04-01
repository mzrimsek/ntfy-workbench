import React from "react";
import { NtfyMessage, Topic } from "~/models";

interface TopicMessageListProps {
  topicConfig?: Topic;
  messages: NtfyMessage[];
}

const TopicMessageList: React.FC<TopicMessageListProps> = ({
  topicConfig,
  messages,
}) => {
  return (
    <div>
      {topicConfig && <h2>{topicConfig.name}</h2>}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{JSON.stringify(message)}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicMessageList;
