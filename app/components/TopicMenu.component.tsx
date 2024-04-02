import React from "react";

type TopicMenuProps = {
  topics: Array<string>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
};

const TopicMenu: React.FC<TopicMenuProps> = ({
  topics,
  selectedTopic,
  setSelectedTopic,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <button
        className={`px-4 py-2 rounded-md text-left font-medium ${
          selectedTopic === "ALL_MESSAGES"
            ? "bg-blue-500 text-white"
            : "hover:bg-gray-200 hover:text-gray-800"
        }`}
        onClick={() => setSelectedTopic("ALL_MESSAGES")}
      >
        All
      </button>
      {topics.map((topic, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-md text-left font-medium ${
            selectedTopic === topic
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-200 hover:text-gray-800"
          }`}
          onClick={() => setSelectedTopic(topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicMenu;
