import React from "react";
import { NtfyMessage } from "~/models";
import TopicMessage from "./TopicMessage.component";

interface TopicMessageListProps {
  messages: NtfyMessage[];
  doTopicColoring?: boolean;
}

const TopicMessageList: React.FC<TopicMessageListProps> = ({
  messages,
  doTopicColoring,
}) => {
  const renderMessages = () => {
    return messages.map((message, index) => (
      <li key={index}>
        <TopicMessage message={message} doTopicColoring={doTopicColoring} />
      </li>
    ));
  };

  return (
    <div>
      <ul>{renderMessages()}</ul>
    </div>
  );
};

export default TopicMessageList;
