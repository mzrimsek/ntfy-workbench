import React from "react";
import TopicMenuButton from "./TopicMenuButton.component";
import { ALL_MESSAGES } from "~/models";

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
      <TopicMenuButton
        topic={ALL_MESSAGES}
        displayTopic="All"
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      ></TopicMenuButton>
      {topics.map((topic, index) => (
        <TopicMenuButton
          key={index}
          topic={topic}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        ></TopicMenuButton>
      ))}
    </div>
  );
};

export default TopicMenu;
