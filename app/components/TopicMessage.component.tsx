import React from "react";
import { NtfyMessage } from "~/models";
import { hashCode } from "~/utils";

interface TopicMessageProps {
  message: NtfyMessage;
  doTopicColoring?: boolean;
}

// https://stackoverflow.com/a/49562686
const pickTopicColor = (topic: string) => {
  const code = hashCode(topic);
  return `hsl(${code % 360}, 100%, 80%)`;
};

const TopicMessage: React.FC<TopicMessageProps> = ({
  message,
  doTopicColoring,
}) => {
  const topicColor = pickTopicColor(message.topic);
  return (
    <div style={doTopicColoring ? { backgroundColor: topicColor } : {}}>
      {message.title && <b>{message.title}</b>}
      <p>{message.message}</p>
    </div>
  );
};

export default TopicMessage;
