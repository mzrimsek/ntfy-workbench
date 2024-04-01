import { json, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";
import { Config, NtfyMessage, TopicMessages } from "~/models";
import TopicMessageList from "~/components/TopicMessageList.component";
import { useLoaderData } from "@remix-run/react";

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MergedTopicsMessageList from "~/components/MergedTopicsMessageList.component";

export const meta: MetaFunction = () => {
  return [
    { title: "ntfy.sh: EventSource Example" },
    { name: "description", content: "ntfy.sh: EventSource Example" },
  ];
};

export async function loader() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const jsonDirectory = `${__dirname}/../../json`;
  const fileContents = await fs.readFile(
    `${jsonDirectory}/config.json`,
    "utf-8"
  );
  const config = JSON.parse(fileContents) as Config;
  return json(config);
}

export default function Index() {
  const [topicMessageMap, setTopicMessageMap] = useState<
    Record<string, Array<NtfyMessage>>
  >({});

  const loaderData = useLoaderData<typeof loader>();

  const getMessagesForTopic = (topic?: string) =>
    topic ? topicMessageMap[topic] ?? [] : [];

  const getTopicConfig = (topic: string) =>
    loaderData.topics.find((x) => x.name === topic);

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

  const renderTopics = () => {
    const topics = Object.keys(topicMessageMap);
    const sortedTopics = topics.sort((a, b) => a.localeCompare(b));
    const topicConfigs = sortedTopics.map((topic) => getTopicConfig(topic));

    const topicConfigsWithNoTags = topicConfigs.filter((x) => !x?.tags?.length);
    const unTaggedMessageList = topicConfigsWithNoTags.map(
      (topicConfig, index) => (
        <TopicMessageList
          key={index}
          doTopicColoring
          topicConfig={topicConfig}
          messages={getMessagesForTopic(topicConfig?.name)}
        ></TopicMessageList>
      )
    );

    const tags = loaderData.tags;
    const topicConfigsWithTags = topicConfigs.filter((x) => x?.tags?.length);
    const topicMessagesList = topicConfigsWithTags.map((topicConfig) => {
      const messages = getMessagesForTopic(topicConfig?.name);
      return {
        topicConfig,
        messages,
      } as TopicMessages;
    });

    const getTopicMessagesForTag = (tag: string) => {
      return topicMessagesList.filter((x) =>
        x.topicConfig?.tags?.includes(tag)
      );
    };
    const taggedMessageLists = tags.map((tag, index) => {
      const topicMessages = getTopicMessagesForTag(tag);
      return (
        <MergedTopicsMessageList
          key={index}
          tag={tag}
          topicMessages={topicMessages}
          doTopicColoring
        ></MergedTopicsMessageList>
      );
    });

    return (
      <div>
        <h1>ungrouped</h1>
        {unTaggedMessageList}
        {taggedMessageLists}
      </div>
    );
  };

  useEffect(() => {
    const ntfyUrl = loaderData.ntfy.url;
    const ntfyApiKey = loaderData.ntfy.apiKey;
    const ntfyService = new NtfyService(ntfyUrl, ntfyApiKey);

    const ntfyTopics = loaderData.topics.map((x) => x.name);
    ntfyService.subscribeToNftyTopic(ntfyTopics, async (event) => {
      const data = JSON.parse(event.data) as NtfyMessage;
      updateEventMap(data);
    });
  }, [loaderData]);

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Ntfy Workbench</h1>
      <div id="events">{renderTopics()}</div>
    </div>
  );
}
