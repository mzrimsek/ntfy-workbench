import React from "react";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";
import { NtfyMessage, Topic, TopicMessages } from "~/models";
import { getMessagesForTopic, getTopicConfig } from "~/utils";

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
  const topicNames = Object.keys(topicMessageMap);
  const sortedTopics = topicNames.sort((a, b) => a.localeCompare(b));
  const topicConfigs = sortedTopics.map((topic) =>
    getTopicConfig(topic, topics)
  );

  const topicConfigsWithNoTags = topicConfigs.filter((x) => !x?.tags?.length);
  const untaggedTopicMessagesList = topicConfigsWithNoTags.map(
    (topicConfig) => {
      const messages = getMessagesForTopic(topicMessageMap, topicConfig?.name);
      return {
        topicConfig,
        messages,
      } as TopicMessages;
    }
  );

  const untaggedMessages = untaggedTopicMessagesList.filter(
    (x) => x.topicConfig?.tags === undefined || x.topicConfig?.tags.length === 0
  );
  const unTaggedMessageList = (
    <MergedTopicsMessageList
      tag="untagged"
      topicMessages={untaggedMessages}
      doTopicColoring
    ></MergedTopicsMessageList>
  );

  const topicConfigsWithTags = topicConfigs.filter((x) => x?.tags?.length);
  const topicMessagesList = topicConfigsWithTags.map((topicConfig) => {
    const messages = getMessagesForTopic(topicMessageMap, topicConfig?.name);
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
      {unTaggedMessageList}
      {taggedMessageLists}
    </div>
  );
};

export default MessagesByTag;
