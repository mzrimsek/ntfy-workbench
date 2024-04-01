import React from "react";

type TopicMenuProps = {
  topics: Array<string>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
};

const TopicMenu: React.FC<TopicMenuProps> = ({
  topics,
  // selectedTopic,
  setSelectedTopic,
}) => {
  return (
    <div>
      <button onClick={() => setSelectedTopic("ALL_MESSAGES")}>All</button>
      {topics.map((topic, index) => (
        <button key={index} onClick={() => setSelectedTopic(topic)}>
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicMenu;
