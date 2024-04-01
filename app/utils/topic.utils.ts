import { Topic } from "~/models";

export const getTopicConfig = (topic: string, topics: Array<Topic>) =>
  topics.find((x) => x.name === topic);
