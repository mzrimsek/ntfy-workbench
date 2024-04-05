import React from "react";
import Menu from "~/components/Menu.component";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";
import { NtfyMessage, Topic, TopicMessages, UNTAGGED } from "~/models";
import { getMessagesForTopic, getTopicConfig } from "~/utils";

type MessagesByTagProps = {
  messageMap: Record<string, NtfyMessage>;
  topics: Array<Topic>;
  tags: Array<string>;
  selectedTag: string;
  setSelectedTag: (index: string) => void;
};

const MessagesByTag: React.FC<MessagesByTagProps> = ({
  messageMap,
  topics,
  tags,
  selectedTag,
  setSelectedTag,
}) => {
  const topicNames = topics.map((topic) => topic.name);
  const sortedTopics = topicNames.sort((a, b) => a.localeCompare(b));
  const topicConfigs = sortedTopics.map((topic) =>
    getTopicConfig(topic, topics)
  );

  const topicConfigsWithNoTags = topicConfigs.filter((x) => !x?.tags?.length);
  const untaggedTopicMessagesList = topicConfigsWithNoTags.map(
    (topicConfig) => {
      const messages = getMessagesForTopic(messageMap, topicConfig?.name);
      return {
        topicConfig,
        messages,
      } as TopicMessages;
    }
  );

  const topicConfigsWithTags = topicConfigs.filter((x) => x?.tags?.length);
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
    return topicMessagesList.filter((x) => x.topicConfig?.tags?.includes(tag));
  };

  const tagNames = [UNTAGGED, ...tags];

  return (
    <div className="grid">
      <div className="w-1/5 border-r border-gray-200 fixed h-screen overflow-auto">
        <Menu
          options={tagNames}
          selectedOption={selectedTag}
          setSelectedOption={setSelectedTag}
          hideAllOption
        />
      </div>
      <div className="w-4/5 px-4 py-4 overflow-auto justify-self-end">
        <MergedTopicsMessageList
          tag={selectedTag}
          topicMessages={getMessagesForTag(selectedTag)}
          doTopicColoring
        ></MergedTopicsMessageList>
      </div>
    </div>
  );
};

export default MessagesByTag;
