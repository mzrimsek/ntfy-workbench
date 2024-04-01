import React from "react";
import { NtfyMessage, Topic } from "~/models";
import TopicMessage from "./TopicMessage.component";

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
      {topicConfig && topicConfig.description && (
        <p>{topicConfig.description}</p>
      )}
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <TopicMessage message={message}></TopicMessage>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicMessageList;
