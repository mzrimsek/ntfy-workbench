import React from "react";
import MessageCountIndicator from "./MessageCountIndicator.component";

type TopicMenuButtonProps = {
  topic: string;
  displayTopic?: string;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  messageCounter?: number;
};

const TopicMenuButton: React.FC<TopicMenuButtonProps> = ({
  topic,
  displayTopic,
  selectedTopic,
  setSelectedTopic,
  messageCounter,
}) => {
  const getButtonText = () => {
    return displayTopic || topic;
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-left font-medium flex items-center ${
        selectedTopic === topic
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-200 hover:text-gray-800"
      }`}
      onClick={() => setSelectedTopic(topic)}
    >
      {getButtonText()}
      <MessageCountIndicator
        messageCounter={messageCounter}
      ></MessageCountIndicator>
    </button>
  );
};

export default TopicMenuButton;
