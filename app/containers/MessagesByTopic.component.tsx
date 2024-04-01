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

    return messages.sort((a, b) => a.time - b.time);
  };

  const getTopicNames = () => {
    return topics.map((topic) => topic.name);
  };

  const getTitle = () => {
    return selectedTopic === ALL_MESSAGES ? "All Messages" : selectedTopic;
  };

  const messages = getMessagesForSelectedTopic();
  const doTopicColoring = selectedTopic === ALL_MESSAGES;
  return (
    <div>
      <div>
        <TopicMenu
          topics={getTopicNames()}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        ></TopicMenu>
      </div>
      <h1>{getTitle()}</h1>
      <TopicMessageList
        messages={messages}
        doTopicColoring={doTopicColoring}
      ></TopicMessageList>
    </div>
  );
};

export default MessagesByTopic;
