import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";
import { NtfyMessage } from "~/models";
import TopicMessageList from "~/components/TopicMessageList.component";

export const meta: MetaFunction = () => {
  return [
    { title: "ntfy.sh: EventSource Example" },
    { name: "description", content: "ntfy.sh: EventSource Example" },
  ];
};


const ntfyService = new NtfyService(nftyUrl, ntfyApiKey);

export default function Index() {
  const [topicMessageMap, setTopicMessageMap] = useState<
    Record<string, Array<NtfyMessage>>
  >({});

  const getMessagesForTopic = (topic: string) => topicMessageMap[topic] ?? [];

  const updateEventMap = (message: NtfyMessage) => {
    console.log(message);

    const { topic, event } = message;

    if (event !== "message") {
      return;
    }

    setTopicMessageMap((prev) => {
      const messages = prev[topic] ?? [];
      const shouldAddMessage = !messages.some((x) => x.id === message.id);
      const nextMessages = shouldAddMessage ? [...messages, message] : messages;

      return { ...prev, [topic]: nextMessages };
    });
  };

  const renderEventsList = () => {
    const topics = Object.keys(topicMessageMap);
    const sortedTopics = topics.sort((a, b) => a.localeCompare(b));

    return sortedTopics.map((topic, index) => (
      <TopicMessageList
        key={index}
        topic={topic}
        messages={getMessagesForTopic(topic)}
      ></TopicMessageList>
    ));
  };

  useEffect(() => {
    ntfyService.subscribeToNftyTopic(ntfyTopics, async (event) => {
      const data = JSON.parse(event.data) as NtfyMessage;
      updateEventMap(data);
    });
  }, []);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>ntfy.sh: EventSource Example</h1>
      <p>
        This is an example showing how to use{" "}
        <a href="https://ntfy.sh">ntfy.sh</a> with&nbsp;
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource">
          EventSource
        </a>
        .<br />
        This example doesn&apos;t need a server. You can just save the HTML page
        and run it from anywhere.
      </p>
      <p>
        <b>Log:</b>
      </p>
      <div id="events">{renderEventsList()}</div>
    </div>
  );
}
