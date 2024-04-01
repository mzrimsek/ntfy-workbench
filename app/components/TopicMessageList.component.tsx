import React from "react";
import { NtfyMessage, Topic } from "~/models";
import TopicMessage from "./TopicMessage.component";

interface TopicMessageListProps {
  topicConfig?: Topic;
  messages: NtfyMessage[];
  doTopicColoring?: boolean;
}

const TopicMessageList: React.FC<TopicMessageListProps> = ({
  topicConfig,
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
      {topicConfig && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">{topicConfig.name}</h2>
          {topicConfig.description && (
            <h3 className="text-gray-500">{topicConfig.description}</h3>
          )}
        </div>
      )}
      <ul>{renderMessages()}</ul>
    </div>
  );
};

export default TopicMessageList;
