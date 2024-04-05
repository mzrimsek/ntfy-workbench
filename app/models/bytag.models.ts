import { TopicMessages } from ".";

export interface MessagesByTagListProps {
  tag: string;
  messages: Array<TopicMessages>;
  topics: Array<string>;
}
