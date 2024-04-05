import React from "react";
import Menu from "~/components/Menu.component";
import TopicMessageList from "~/components/TopicMessageList.component";
import { ALL_OPTIONS, MessageMetadata, NtfyMessage, Topic } from "~/models";

type MessagesByTopicProps = {
  messageMap: Record<string, NtfyMessage>;
  messageMetadataMap: Record<string, MessageMetadata>;
  topics: Array<Topic>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  acknowledgeTopic: (topic: string) => void;
};

const MessagesByTopic: React.FC<MessagesByTopicProps> = ({
  messageMap,
  messageMetadataMap,
  topics,
  selectedTopic,
  setSelectedTopic,
  acknowledgeTopic,
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
  const shouldRenderTopicAcknowledgementButton = selectedTopic !== ALL_OPTIONS;
  const doTopicColoring = true; // selectedTopic === ALL_MESSAGES;

  const getMessageCountForTopic = (topic: string) => {
    const messageMetadata = Object.values(messageMetadataMap);
    const messagesForTopic = messageMetadata.filter((x) => x.topic === topic);
    const unacknowledgedMessages = messagesForTopic.filter(
      (x) => !x.acknowledged
    );
    return unacknowledgedMessages.length;
  };

  return (
    <div className="grid">
      <div className="w-1/5 border-r border-gray-200 fixed h-screen overflow-auto">
        <Menu
          options={getTopicNames()}
          selectedOption={selectedTopic}
          setSelectedOption={setSelectedTopic}
          getCountForOption={getMessageCountForTopic}
        />
      </div>
      <div className="w-4/5 px-4 py-4 overflow-auto justify-self-end">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold mb-0 mr-4">{getTitle()}</h1>
          {shouldRenderTopicAcknowledgementButton && (
            <button
              className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-gray-200 hover:text-gray-800"
              onClick={() => acknowledgeTopic(selectedTopic)}
            >
              Acknowledge Topic
            </button>
          )}
        </div>
        <TopicMessageList
          messages={messages}
          doTopicColoring={doTopicColoring}
        />
      </div>
    </div>
  );
};
// px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-gray-200 hover:text-gray-800
export default MessagesByTopic;
