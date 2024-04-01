import { json, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";
import { Config, NtfyMessage } from "~/models";
import { useLoaderData } from "@remix-run/react";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DisplayState } from "~/enums";
import MessagesByTag from "~/containers/MessagesByTag.component";
import DisplayStateSwitch from "~/components/DisplayStateSwitch.component";
import AllMessages from "~/containers/AllMessages.component";
import MessagesByTopic from "~/containers/MessagesByTopic.component";

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
  const loaderData = useLoaderData<typeof loader>();

  const [topicMessageMap, setTopicMessageMap] = useState<
    Record<string, Array<NtfyMessage>>
  >({});
  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.All
  );

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
    if (displayState === DisplayState.All) {
      return <AllMessages topicMessageMap={topicMessageMap}></AllMessages>;
    }

    if (displayState === DisplayState.Topic) {
      return (
        <MessagesByTopic
          topicMessageMap={topicMessageMap}
          topics={loaderData.topics}
        ></MessagesByTopic>
      );
    }

    if (displayState === DisplayState.Tag) {
      return (
        <MessagesByTag
          topicMessageMap={topicMessageMap}
          topics={loaderData.topics}
          tags={loaderData.tags}
        ></MessagesByTag>
      );
    }

    return null;
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
    <div>
      <h1>Ntfy Workbench</h1>
      <DisplayStateSwitch
        displayState={displayState}
        setDisplayState={setDisplayState}
      ></DisplayStateSwitch>
      <div>{renderTopics()}</div>
    </div>
  );
}
