import React from "react";
import TopicMessageList from "~/components/TopicMessageList.component";
import { NtfyMessage } from "~/models";

type AllMessagesProps = {
  topicMessageMap: Record<string, Array<NtfyMessage>>;
};

const AllMessages: React.FC<AllMessagesProps> = ({ topicMessageMap }) => {
  const topics = Object.keys(topicMessageMap);
  const messages = topics.flatMap((topic) => topicMessageMap[topic]);
  const sortedMessages = messages.sort((a, b) => a.time - b.time);

  return (
    <div>
      <h1>All Messages</h1>
      <TopicMessageList
        messages={sortedMessages}
        doTopicColoring
      ></TopicMessageList>
    </div>
  );
};

export default AllMessages;
