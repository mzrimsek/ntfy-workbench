import React from "react";
import { TopicMessages } from "~/models";
import TopicMessage from "./TopicMessage.component";

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

  const renderMessages = () => {
    return mergedMessages.map((message, index) => (
      <li key={index}>
        <TopicMessage message={message} doTopicColoring={doTopicColoring} />
      </li>
    ));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{tag}</h1>{" "}
        <h2 className="text-lg text-gray-500">{topics}</h2>{" "}
      </div>
      <hr className="border-gray-200" />
      <ul className="-ml-4 pl-4">{renderMessages()}</ul>
    </div>
  );
};

export default MergedTopicsMessageList;
