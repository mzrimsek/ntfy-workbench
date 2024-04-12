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
  showMenu: boolean;
};

const MessagesByTag: React.FC<MessagesByTagProps> = ({
  messageMap,
  topics,
  tags,
  selectedTag,
  setSelectedTag,
  showMenu,
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

  const tagNames = [UNTAGGED, ...tags];

  return (
    <div className="grid">
      {showMenu && (
        <div className="w-1/5 border-r border-gray-200 fixed overflow-y-auto top-20 bottom-0">
          <Menu
            options={tagNames}
            selectedOption={selectedTag}
            setSelectedOption={setSelectedTag}
            hideAllOption
          />
        </div>
      )}
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
