import React from "react";
import MessageCountIndicator from "./MessageCountIndicator.component";

type MenuButtonProps = {
  value: string;
  display?: string;
  selectedOption: string;
  setSelectedOption: (topic: string) => void;
  messageCounter?: number;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  value: topic,
  display: displayTopic,
  selectedOption: selectedTopic,
  setSelectedOption: setSelectedTopic,
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

export default MenuButton;
