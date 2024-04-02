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
    <div>
      <div>
        <h1>{tag}</h1>
        <h2>{topics}</h2>
      </div>
      <ul>{renderMessages()}</ul>
    </div>
  );
};

export default MergedTopicsMessageList;
