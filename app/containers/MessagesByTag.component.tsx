import React from "react";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";
import TopicMessageList from "~/components/TopicMessageList.component";
import { NtfyMessage, Topic, TopicMessages } from "~/models";
import { getTopicConfig } from "~/utils";

type MessagesByTagProps = {
  topicMessageMap: Record<string, Array<NtfyMessage>>;
  topics: Array<Topic>;
  tags: Array<string>;
};

const MessagesByTag: React.FC<MessagesByTagProps> = ({
  topicMessageMap,
  topics,
  tags,
}) => {
  const getMessagesForTopic = (topic?: string) =>
    topic ? topicMessageMap[topic] ?? [] : [];

  const topicNames = Object.keys(topicMessageMap);
  const sortedTopics = topicNames.sort((a, b) => a.localeCompare(b));
  const topicConfigs = sortedTopics.map((topic) =>
    getTopicConfig(topic, topics)
  );

  const topicConfigsWithNoTags = topicConfigs.filter((x) => !x?.tags?.length);
  const unTaggedMessageList = topicConfigsWithNoTags.map(
    (topicConfig, index) => (
      <TopicMessageList
        key={index}
        doTopicColoring
        topicConfig={topicConfig}
        messages={getMessagesForTopic(topicConfig?.name)}
      ></TopicMessageList>
    )
  );

  const topicConfigsWithTags = topicConfigs.filter((x) => x?.tags?.length);
  const topicMessagesList = topicConfigsWithTags.map((topicConfig) => {
    const messages = getMessagesForTopic(topicConfig?.name);
    return {
      topicConfig,
      messages,
    } as TopicMessages;
  });

  const getTopicMessagesForTag = (tag: string) => {
    return topicMessagesList.filter((x) => x.topicConfig?.tags?.includes(tag));
  };
  const taggedMessageLists = tags.map((tag, index) => {
    const topicMessages = getTopicMessagesForTag(tag);
    return (
      <MergedTopicsMessageList
        key={index}
        tag={tag}
        topicMessages={topicMessages}
        doTopicColoring
      ></MergedTopicsMessageList>
    );
  });

  return (
    <div>
      <h1>ungrouped</h1>
      {unTaggedMessageList}
      {taggedMessageLists}
    </div>
  );
};

export default MessagesByTag;
