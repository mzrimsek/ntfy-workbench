import React from "react";
import { TopicMessages } from "~/models";
import TopicMessageList from "./TopicMessageList.component";

interface MergedTopicsMessageListProps {
  tag: string;
  topicMessages: Array<TopicMessages>;
  doTopicColoring?: boolean;
}

const MergedTopicsMessageList: React.FC<MergedTopicsMessageListProps> = ({
  tag,
  topicMessages,
  doTopicColoring,
}) => {
  const mergedMessages = topicMessages
    .map((x) => x.messages)
    .flat()
    .sort((a, b) => a.time - b.time);

  const topics = topicMessages.map((x) => x.topicConfig?.name).join(", ");

  return (
    <div className="rounded-lg shadow-md px-4 py-4">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold">{tag}</h1>
        <h2 className="text-lg text-gray-400 ml-2">{topics}</h2>
      </div>
      <TopicMessageList
        messages={mergedMessages}
        doTopicColoring={doTopicColoring}
      ></TopicMessageList>
    </div>
  );
};

export default MergedTopicsMessageList;
