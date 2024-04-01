import { NtfyMessage, Topic } from "~/models";

export const getTopicConfig = (topic: string, topics: Array<Topic>) =>
  topics.find((x) => x.name === topic);

export const getMessagesForTopic = (
  topicMessageMap: Record<string, Array<NtfyMessage>>,
  topic?: string
) => (topic ? topicMessageMap[topic] ?? [] : []);
