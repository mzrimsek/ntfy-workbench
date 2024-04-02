/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";
import {
  MessageByTagRender,
  MessagesByTagListProps,
  NtfyMessage,
  Topic,
  TopicMessages,
} from "~/models";
import { getMessagesForTopic, getTopicConfig } from "~/utils";

type MessagesByTagProps = {
  topicMessageMap: Record<string, Array<NtfyMessage>>;
  topics: Array<Topic>;
  tags: Array<string>;
  selectedTagIndex: number;
  setSelectedTagIndex: (index: number) => void;
};

const MessagesByTag: React.FC<MessagesByTagProps> = ({
  topicMessageMap,
  topics,
  tags,
  selectedTagIndex,
  setSelectedTagIndex,
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

  const untaggedMessageByTagProps: MessagesByTagListProps = {
    tag: "untagged",
    messages: untaggedMessages,
  };

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

  const taggedMessageByTagProps: Array<MessagesByTagListProps> = tags.map(
    (tag) => {
      return {
        tag,
        messages: getTopicMessagesForTag(tag),
      };
    }
  );

  const doAnyTopicConfigsHaveNoTags =
    topicConfigsWithNoTags.filter((x) => x).length > 0;
  const allByTagProps = doAnyTopicConfigsHaveNoTags
    ? [untaggedMessageByTagProps, ...taggedMessageByTagProps]
    : taggedMessageByTagProps;

  const allMessageLists: Array<MessageByTagRender> = allByTagProps.map(
    (data, index) => {
      const component = (
        <MergedTopicsMessageList
          key={index}
          tag={data.tag}
          topicMessages={data.messages}
          doTopicColoring
        ></MergedTopicsMessageList>
      );

      return {
        ...data,
        component,
      };
    }
  );

  const handleClick = (index: number) => {
    setSelectedTagIndex(index);
  };

  return (
    <div className="flex flex-col">
      <ul className="flex mb-4 border-b border-gray-200">
        {allMessageLists.map((_, index) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            key={index}
            className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
              selectedTagIndex === index
                ? "border-b border-red-500 text-red-500"
                : ""
            }`}
            onClick={() => handleClick(index)}
          >
            {allMessageLists[index].tag}
          </li>
        ))}
      </ul>
      <div>{allMessageLists[selectedTagIndex].component}</div>
    </div>
  );
};

export default MessagesByTag;
