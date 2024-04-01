import { NtfyMessage, Topic } from ".";

export interface TopicMessages {
  topicConfig?: Topic;
  messages: NtfyMessage[];
}

export interface TagTopicMessages extends TopicMessages {
  tag: string;
}
