import React from "react";
import TopicMenu from "~/components/TopicMenu.component";
import TopicMessageList from "~/components/TopicMessageList.component";
import { ALL_MESSAGES, NtfyMessage, Topic } from "~/models";

type MessagesByTopicProps = {
  topicMessageMap: Record<string, Array<NtfyMessage>>;
  topics: Array<Topic>;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
};

const MessagesByTopic: React.FC<MessagesByTopicProps> = ({
  topicMessageMap,
  topics,
  selectedTopic,
  setSelectedTopic,
}) => {
  const getMessagesForSelectedTopic = () => {
    let messages: Array<NtfyMessage> = [];

    if (selectedTopic === ALL_MESSAGES) {
      const topics = Object.keys(topicMessageMap);
      messages = topics.flatMap((topic) => topicMessageMap[topic]);
    } else {
      messages = topicMessageMap[selectedTopic];
    }

    messages = messages || [];
    return messages.sort((a, b) => a.time - b.time);
  };

  const getTopicNames = () => {
    return topics.map((topic) => topic.name);
  };

  const getTitle = () => {
    return selectedTopic === ALL_MESSAGES ? "All Messages" : selectedTopic;
  };

  const messages = getMessagesForSelectedTopic();
  const doTopicColoring = true; // selectedTopic === ALL_MESSAGES;

  return (
    <div className="flex">
      <div className="w-64 border-r border-gray-200">
        <TopicMenu
          topics={getTopicNames()}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
      </div>
      <div className="flex-grow px-4 py-4">
        <h1 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">
          {getTitle()}
        </h1>
        <TopicMessageList
          messages={messages}
          doTopicColoring={doTopicColoring}
        />
      </div>
    </div>
  );
};

export default MessagesByTopic;
