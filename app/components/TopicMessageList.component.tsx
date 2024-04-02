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
