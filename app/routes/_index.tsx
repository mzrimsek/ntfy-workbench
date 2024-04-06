import { json, type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";
import {
  ALL_OPTIONS,
  Config,
  MessageMetadata,
  NtfyMessage,
  UNTAGGED,
} from "~/models";
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
  const jsonDirectory = `${__dirname}/../../config`;
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
  const [selectedTopic, setSelectedTopic] = useState<string>(ALL_OPTIONS);
  const [selectedTag, setSelectedTag] = useState<string>(UNTAGGED);

  // const acknowledgeMessage = (id: string) => {
  //   const metadata = messageMetadataMap[id];
  //   const updatedMetadata = { ...metadata, acknowledged: true };
  //   setMessageMetadataMap((prev) => {
  //     return { ...prev, [id]: updatedMetadata };
  //   });
  // };

  // const acknowledgeAllMessages = () => {
  //   const messageIds = Object.keys(messageMetadataMap);

  //   const updatedMessageMetadataMap = messageIds.reduce((acc, id) => {
  //     const metadata = messageMetadataMap[id];
  //     const updatedMetadata = { ...metadata, acknowledged: true };
  //     return { ...acc, [id]: updatedMetadata };
  //   }, {} as Record<string, MessageMetadata>);

  //   setMessageMetadataMap(updatedMessageMetadataMap);
  // };

  // const acknowledgeAllMessagesForTopic = (topic: string) => {
  //   const allMetadata = Object.values(messageMetadataMap);
  //   const metadataForTopic = allMetadata.filter((x) => x.topic === topic);

  //   const updatedMetadata = metadataForTopic.reduce((acc, messageMetadata) => {
  //     const metadata = messageMetadataMap[messageMetadata.id];
  //     const updatedMetadata = { ...metadata, acknowledged: true };
  //     return { ...acc, [metadata.id]: updatedMetadata };
  //   }, {} as Record<string, MessageMetadata>);

  //   setMessageMetadataMap((prev) => {
  //     return { ...prev, ...updatedMetadata };
  //   });
  // };

  const renderTopics = () => {
    if (displayState === DisplayState.Topic) {
      return (
        <MessagesByTopic
          messageMap={messageMap}
          messageMetadataMap={messageMetadataMap}
          topics={loaderData.topics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          // acknowledgeTopic={acknowledgeAllMessagesForTopic}
        ></MessagesByTopic>
      );
    }

    if (displayState === DisplayState.Tag) {
      return (
        <MessagesByTag
          messageMap={messageMap}
          topics={loaderData.topics}
          tags={loaderData.tags}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        ></MessagesByTag>
      );
    }

    return null;
  };

  useEffect(() => {
    const ntfyUrl = loaderData.ntfy.url;
    const ntfyApiKey = loaderData.ntfy.apiKey;
    const ntfyService = new NtfyService(ntfyUrl, ntfyApiKey);

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

    const ntfyTopics = loaderData.topics.map((x) => x.name);
    ntfyService.subscribeToNftyTopics(ntfyTopics, async (event) => {
      const data = JSON.parse(event.data) as NtfyMessage;
      processMessage(data);
    });
  }, [loaderData, messageMetadataMap]);

  return (
    <div>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 shadow-md dark:bg-slate-700 bg-white">
        <h1 className="text-xl font-bold">Ntfy Workbench</h1>
        {/* <button
          className="px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-gray-200 hover:text-gray-800"
          onClick={() => acknowledgeAllMessages()}
        >
          Acknowledge All
        </button> */}
        <DisplayStateSwitch
          displayState={displayState}
          setDisplayState={setDisplayState}
        />
      </header>
      <div>{renderTopics()}</div>
    </div>
  );
}
