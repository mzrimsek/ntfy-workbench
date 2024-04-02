import React from "react";
import { NtfyMessage } from "~/models";
import { hashCode } from "~/utils";

interface TopicMessageProps {
  message: NtfyMessage;
  doTopicColoring?: boolean;
}

const pickTopicColor = (topic: string) => {
  const code = hashCode(topic);
  return `hsl(${code % 360}, 70%, 60%)`;
};

const getTextColor = (backgroundColor: string) => {
  // Calculate luminance to determine text color (black for light, white for dark)
  const rgb = backgroundColor.slice(4, -1).split(",").map(Number);
  const lum = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  return lum >= 128 ? "black" : "white";
};

const TopicMessage: React.FC<TopicMessageProps> = ({
  message,
  doTopicColoring,
}) => {
  const topicColor = doTopicColoring ? pickTopicColor(message.topic) : "";
  const textColor = doTopicColoring ? getTextColor(topicColor) : "";
  const formattedTime = new Date(message.time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-lg px-4 py-2 shadow-sm`}
      style={{ color: textColor, backgroundColor: topicColor }}
    >
      <div className="flex items-center justify-between">
        {message.title ? (
          <b className="text-lg mr-2">{message.title}</b>
        ) : (
          <span /> // Empty span to maintain spacing
        )}
        <span className="text-sm">{formattedTime}</span>
      </div>
      <p>{message.message}</p>
    </div>
  );
};

export default TopicMessage;
