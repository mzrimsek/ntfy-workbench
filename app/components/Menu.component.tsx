import React from "react";
import MenuButton from "./MenuButton.component";
import { ALL_MESSAGES, MessageMetadata } from "~/models";

type MenuProps = {
  messageMetadataMap: Record<string, MessageMetadata>;
  options: Array<string>;
  selectedOption: string;
  setSelectedTopic: (topic: string) => void;
};

const Menu: React.FC<MenuProps> = ({
  messageMetadataMap,
  options: topics,
  selectedOption: selectedTopic,
  setSelectedTopic,
}) => {
  const getMessageCountForSelection = (topic: string) => {
    const messageMetadata = Object.values(messageMetadataMap);
    const messagesForTopic = messageMetadata.filter((x) => x.topic === topic);
    const unacknowledgedMessages = messagesForTopic.filter(
      (x) => !x.acknowledged
    );
    return unacknowledgedMessages.length;
  };

  return (
    <div className="flex flex-col space-y-2">
      <MenuButton
        value={ALL_MESSAGES}
        display="All"
        selectedOption={selectedTopic}
        setSelectedOption={setSelectedTopic}
      ></MenuButton>
      {topics.map((topic, index) => (
        <MenuButton
          key={index}
          value={topic}
          selectedOption={selectedTopic}
          setSelectedOption={setSelectedTopic}
          messageCounter={getMessageCountForSelection(topic)}
        ></MenuButton>
      ))}
    </div>
  );
};

export default Menu;
