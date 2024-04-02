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
      <li key={index} className="list-none my-2">
        <TopicMessage message={message} doTopicColoring={doTopicColoring} />
      </li>
    ));
  };

  return <ul>{renderMessages()}</ul>;
};

export default TopicMessageList;
