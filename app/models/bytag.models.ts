import { TopicMessages } from ".";

export interface MessagesByTagListProps {
  tag: string;
  messages: Array<TopicMessages>;
}

export interface MessageByTagRender extends MessagesByTagListProps {
  component: JSX.Element;
}
