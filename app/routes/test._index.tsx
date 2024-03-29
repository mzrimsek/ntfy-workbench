import type { MetaFunction } from "@remix-run/node";
import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

export const meta: MetaFunction = () => {
  return [
    { title: "ntfy.sh: EventSource Example" },
    { name: "description", content: "ntfy.sh: EventSource Example" },
  ];
};

const nftyUrl = "";
const ntfyApiKey = "";
const ntfyTopic = "";
const webhook = "";

const getNtfyUrl = (topic: string) => `https://${nftyUrl}/${topic}`;

let eventList: Array<string> = [];

const subscribeToNftyTopic = async (
  topic: string,
  eventHandler: (event: unknown) => unknown
) => {
  const url = `${getNtfyUrl(topic)}/sse`;
  await fetchEventSource(url, {
    headers: {
      Authorization: `Bearer ${ntfyApiKey}`,
    },
    onopen: async () => {
      console.log(`EventSource connected to ${url}`);
      eventList = [...eventList, `EventSource connected to ${url}`];
    },
    onmessage: (event) => {
      console.log(event);
      eventList = [...eventList, JSON.stringify(event)];
      eventHandler(event);
    },
    onerror: () => {
      console.error(`EventSource error: Failed to connect to ${url}`);
      eventList = [
        ...eventList,
        `EventSource error: Failed to connect to ${url}`,
      ];
    },
  });
};

interface NtfyMessage {
  title: string;
  message: string;
}

const publishToNftyTopic = async (topic: string, messageData: NtfyMessage) => {
  const url = getNtfyUrl(topic);
  const { message, title } = messageData;
  const response = await fetch(url, {
    method: "POST",
    body: message,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ntfyApiKey}`,
      Title: title,
    },
  });

  return response.json();
};

// const triggerWebhook = async (webhook: string) => {
//   const response = await fetch(webhook, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       message: "Hello, World!",
//     }),
//   });

//   return response.json();
// };

// subscribeToNftyTopic(ntfyTopic, async (event) => {
//   const data = JSON.parse((event as EventSourceMessage).data);
//   console.log(data);

//   let title = "";
//   let message = "";

//   try {
//     await triggerWebhook(webhook);
//     title = "Webhook triggered!";
//     message = "Successfully triggered the webhook!";
//   } catch (error) {
//     console.error(error);
//     title = "Webhook failed!";
//     message = "Failed to trigger the webhook!";
//   } finally {
//     console.log("Webhook triggered!");
//     publishToNftyTopic(ntfyTopic, { title, message });
//   }
// });

const onPublishClick = async () => {
  publishToNftyTopic(ntfyTopic, {
    title: "Hello, World!",
    message: "Hello, World!",
  });
};

const renderEventsList = () => {
  return eventList.map((event, index) => <p key={index}>{event}</p>);
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>ntfy.sh: EventSource Example</h1>
      <p>
        This is an example showing how to use{" "}
        <a href="https://ntfy.sh">ntfy.sh</a> with
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventSource">
          EventSource
        </a>
        .<br />
        This example doesn&apos;t need a server. You can just save the HTML page
        and run it from anywhere.
      </p>
      <button id="publishButton" onClick={onPublishClick}>
        Send test notification
      </button>
      <p>
        <b>Log:</b>
      </p>
      <div id="events">{renderEventsList()}</div>
    </div>
  );
}
