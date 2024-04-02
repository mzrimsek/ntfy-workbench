import { NtfyMessage, Topic } from "~/models";

export const getTopicConfig = (topic: string, topics: Array<Topic>) =>
  topics.find((x) => x.name === topic);

export const getMessagesForTopic = (
  messageMap: Record<string, NtfyMessage>,
  topic?: string
) =>
  topic ? Object.values(messageMap).filter((x) => x.topic === topic) ?? [] : [];
