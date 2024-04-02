import React from "react";
import TopicMenuButton from "./TopicMenuButton.component";
import { ALL_MESSAGES, MessageMetadata } from "~/models";

type TopicMenuProps = {
  messageMetadataMap: Record<string, MessageMetadata>;
  topics: Array<string>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
};

const TopicMenu: React.FC<TopicMenuProps> = ({
  messageMetadataMap,
  topics,
  selectedTopic,
  setSelectedTopic,
}) => {
  const getMessageCountForTopic = (topic: string) => {
    const messageMetadata = Object.values(messageMetadataMap);
    const messagesForTopic = messageMetadata.filter((x) => x.topic === topic);
    const acknowledgedMessages = messagesForTopic.filter((x) => x.acknowledged);
    return acknowledgedMessages.length;
  };

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
          messageCounter={getMessageCountForTopic(topic)}
        ></TopicMenuButton>
      ))}
    </div>
  );
};

export default TopicMenu;
