import React from "react";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";
import { NtfyMessage, Topic, TopicMessages, UNTAGGED } from "~/models";
import { getMessagesForTopic, getTopicConfig } from "~/utils";
import MessagesDisplay from "./MessagesDisplay.component";

type MessagesByTagProps = {
  messageMap: Record<string, NtfyMessage>;
  topics: Array<Topic>;
  tags: Array<string>;
  selectedTag: string;
  setSelectedTag: (index: string) => void;
  showMenu: boolean;
  screenSize: number;
};

const MessagesByTag: React.FC<MessagesByTagProps> = ({
  messageMap,
  topics,
  tags,
  selectedTag,
  setSelectedTag,
  showMenu,
  screenSize,
}) => {
  const topicNames = topics.map((topic) => topic.name);
  const sortedTopics = topicNames.sort((a, b) => a.localeCompare(b));
  const topicConfigs = sortedTopics.map((topic) =>
    getTopicConfig(topic, topics)
  );

  const topicConfigsWithNoTags = topicConfigs.filter(
    (topic) => !topic?.tags?.length
  );
  const untaggedTopicMessagesList = topicConfigsWithNoTags.map(
    (topicConfig) => {
      const messages = getMessagesForTopic(messageMap, topicConfig?.name);
      return {
        topicConfig,
        messages,
      } as TopicMessages;
    }
  );

  const topicConfigsWithTags = topicConfigs.filter(
    (topic) => topic?.tags?.length
  );
  const topicMessagesList = topicConfigsWithTags.map((topicConfig) => {
    const messages = getMessagesForTopic(messageMap, topicConfig?.name);
    return {
      topicConfig,
      messages,
    } as TopicMessages;
  });

  const getMessagesForTag = (tag: string) => {
    if (tag === UNTAGGED) {
      return untaggedTopicMessagesList;
    }
    return topicMessagesList.filter((messages) =>
      messages.topicConfig?.tags?.includes(tag)
    );
  };

  const getMessageCountForTag = (tag: string) => {
    return getMessagesForTag(tag).reduce(
      (acc, messages) => acc + messages.messages.length,
      0
    );
  };

  const tagNames = [UNTAGGED, ...tags];

  return (
    <MessagesDisplay
      menuOptions={tagNames}
      showMenu={showMenu}
      hideAllOption
      selectedOption={selectedTag}
      setSelectedOption={setSelectedTag}
      getMessageCountForSelectedOption={getMessageCountForTag}
      screenSize={screenSize}
    >
      <MergedTopicsMessageList
        tag={selectedTag}
        topicMessages={getMessagesForTag(selectedTag)}
        doTopicColoring
      ></MergedTopicsMessageList>
    </MessagesDisplay>
  );
};

export default MessagesByTag;
