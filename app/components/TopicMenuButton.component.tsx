import React from "react";

type TopicMenuButtonProps = {
  topic: string;
  displayTopic?: string;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
};

const TopicMenuButton: React.FC<TopicMenuButtonProps> = ({
  topic,
  displayTopic,
  selectedTopic,
  setSelectedTopic,
}) => {
  const getButtonText = () => {
    return displayTopic || topic;
  };

  return (
    <button
      className={`px-4 py-2 rounded-md text-left font-medium ${
        selectedTopic === topic
          ? "bg-blue-500 text-white"
          : "hover:bg-gray-200 hover:text-gray-800"
      }`}
      onClick={() => setSelectedTopic(topic)}
    >
      {getButtonText()}
    </button>
  );
};

export default TopicMenuButton;
