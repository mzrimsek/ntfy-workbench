import React from "react";
import TopicMessageList from "~/components/TopicMessageList.component";
import { NtfyMessage, Topic } from "~/models";
import { getMessagesForTopic, getTopicConfig } from "~/utils";

type MessagesByTopicProps = {
  topicMessageMap: Record<string, Array<NtfyMessage>>;
  topics: Array<Topic>;
};

const MessagesByTopic: React.FC<MessagesByTopicProps> = ({
  topicMessageMap,
  topics,
}) => {
  const topicNames = Object.keys(topicMessageMap);
  const sortedTopics = topicNames.sort((a, b) => a.localeCompare(b));
  const topicConfigs = sortedTopics.map((topic) =>
    getTopicConfig(topic, topics)
  );

  const messageLists = topicConfigs.map((topicConfig, index) => (
    <TopicMessageList
      key={index}
      topicConfig={topicConfig}
      messages={getMessagesForTopic(topicMessageMap, topicConfig?.name)}
    ></TopicMessageList>
  ));

  return <div>{messageLists}</div>;
};

export default MessagesByTopic;
