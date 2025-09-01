import React from "react";
import { NtfyMessage, Topic } from "~/models";
import TopicMessage from "./TopicMessage.component";

interface TopicMessageListProps {
  messages: NtfyMessage[];
  doTopicColoring?: boolean;
  topics?: Array<Topic>;
}

const TopicMessageList: React.FC<TopicMessageListProps> = ({
  messages,
  doTopicColoring,
  topics,
}) => {
  const getTopicConfig = (topicName: string): Topic | undefined => {
    return topics?.find((topic) => topic.name === topicName);
  };

  const renderMessages = () => {
    const sortedMessages = messages.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
    return sortedMessages.map((message, index) => (
      <li key={index} className="list-none my-2">
        <TopicMessage
          message={message}
          doTopicColoring={doTopicColoring}
          topicConfig={getTopicConfig(message.topic)}
        />
      </li>
    ));
  };

  const shouldRenderMessages = messages.length > 0;
  return (
    <ul>
      {shouldRenderMessages ? (
        renderMessages()
      ) : (
        <p className="text-gray-500 text-center mt-4 flex items-center justify-center">
          💀 No messages to display 💀
        </p>
      )}
    </ul>
  );
};

export default TopicMessageList;
