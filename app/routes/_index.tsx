import { json, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";
import { ALL_MESSAGES, Config, MessageMetadata, NtfyMessage } from "~/models";
import { useLoaderData } from "@remix-run/react";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { DisplayState } from "~/enums";
import MessagesByTag from "~/containers/MessagesByTag.component";
import DisplayStateSwitch from "~/components/DisplayStateSwitch.component";
import MessagesByTopic from "~/containers/MessagesByTopic.component";

export const meta: MetaFunction = () => {
  return [
    { title: "Ntfy Workbench" },
    { name: "description", content: "Ntfy Workbench" },
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

  const [messageMap, setMessageMap] = useState<Record<string, NtfyMessage>>({});
  const [messageMetadataMap, setMessageMetadataMap] = useState<
    Record<string, MessageMetadata>
  >({});
  const [displayState, setDisplayState] = useState<DisplayState>(
    DisplayState.Topic
  );
  const [selectedTopic, setSelectedTopic] = useState<string>(ALL_MESSAGES);
  const [selectedTagIndex, setSelectedTagIndex] = useState<number>(0);

  const processMessage = (message: NtfyMessage) => {
    console.log(message);

    const { id, topic, event } = message;

    if (event !== "message") {
      return;
    }

    setMessageMap((prev) => {
      return { ...prev, [id]: message };
    });

    const metadata = messageMetadataMap[id];
    if (!metadata) {
      setMessageMetadataMap((prev) => {
        return { ...prev, [id]: { id, topic, acknowledged: false } };
      });
    }
  };

  const renderTopics = () => {
    if (displayState === DisplayState.Topic) {
      return (
        <MessagesByTopic
          messageMap={messageMap}
          messageMetadataMap={messageMetadataMap}
          topics={loaderData.topics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        ></MessagesByTopic>
      );
    }

    if (displayState === DisplayState.Tag) {
      return (
        <MessagesByTag
          messageMap={messageMap}
          messageMetadataMap={messageMetadataMap}
          topics={loaderData.topics}
          tags={loaderData.tags}
          selectedTagIndex={selectedTagIndex}
          setSelectedTagIndex={setSelectedTagIndex}
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
    ntfyService.subscribeToNftyTopics(ntfyTopics, async (event) => {
      const data = JSON.parse(event.data) as NtfyMessage;
      processMessage(data);
    });
  }, [loaderData]);

  return (
    <div>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 shadow-md dark:bg-slate-700 bg-white">
        <h1 className="text-xl font-bold">Ntfy Workbench</h1>
        <DisplayStateSwitch
          displayState={displayState}
          setDisplayState={setDisplayState}
        />
      </header>
      <div>{renderTopics()}</div>
    </div>
  );
}
