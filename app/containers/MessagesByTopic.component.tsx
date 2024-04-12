import React from "react";
import TopicMessageList from "~/components/TopicMessageList.component";
import { ALL_OPTIONS, MessageMetadata, NtfyMessage, Topic } from "~/models";
import MessagesDisplay from "./MessagesDisplay.component";

type MessagesByTopicProps = {
  messageMap: Record<string, NtfyMessage>;
  messageMetadataMap: Record<string, MessageMetadata>;
  topics: Array<Topic>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  acknowledgeTopic?: (topic: string) => void;
  showMenu: boolean;
  screenSize: number;
};

const MessagesByTopic: React.FC<MessagesByTopicProps> = ({
  messageMap,
  messageMetadataMap,
  topics,
  selectedTopic,
  setSelectedTopic,
  acknowledgeTopic,
  showMenu,
  screenSize,
}) => {
  const getMessagesForSelectedTopic = () => {
    let messages: Array<NtfyMessage> = Object.values(messageMap);

    if (selectedTopic !== ALL_OPTIONS) {
      messages = messages.filter((message) => message.topic === selectedTopic);
    }

    messages = messages || [];
    return messages.sort((a, b) => a.time - b.time);
  };

  const getTopicNames = () => {
    return topics.map((topic) => topic.name);
  };

  const getTitle = () => {
    return selectedTopic === ALL_OPTIONS ? "All Messages" : selectedTopic;
  };

  const messages = getMessagesForSelectedTopic();
  const shouldRenderTopicAcknowledgementButton =
    selectedTopic !== ALL_OPTIONS && acknowledgeTopic !== undefined;
  const doTopicColoring = true; // selectedTopic === ALL_MESSAGES;

  const getMessageCountForTopic = (topic: string) => {
    const messageMetadata = Object.values(messageMetadataMap);
    const messagesForTopic = messageMetadata.filter(
      (metadata) => metadata.topic === topic
    );
    const unacknowledgedMessages = messagesForTopic.filter(
      (x) => !x.acknowledged
    );
    return unacknowledgedMessages.length;
  };

  return (
    <MessagesDisplay
      menuOptions={getTopicNames()}
      showMenu={showMenu}
      selectedOption={selectedTopic}
      setSelectedOption={setSelectedTopic}
      getMessageCountForSelectedOption={getMessageCountForTopic}
      title={getTitle()}
      shouldRenderTopicAcknowledgementButton={
        shouldRenderTopicAcknowledgementButton
      }
      acknowledgeSelectedOption={acknowledgeTopic}
      screenSize={screenSize}
    >
      <TopicMessageList messages={messages} doTopicColoring={doTopicColoring} />
    </MessagesDisplay>
  );
};

export default MessagesByTopic;
