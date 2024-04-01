import { fetchEventSource } from "@microsoft/fetch-event-source";
import { NtfyMessage } from "~/models";

export class NtfyService {
  constructor(public nftyUrl: string, public ntfyApiKey: string) {}

  private getNtfyUrl = (topics: string[]) => {
    if (topics.length === 0) {
      throw new Error("No topics provided");
    }

    if (topics.length === 1) {
      const topic = topics[0];
      return `https://${this.nftyUrl}/${topic}`;
    }

    const topicsString = topics.join(",");
    return `https://${this.nftyUrl}/${topicsString}`;
  };

  subscribeToNftyTopic = async (
    topics: string[],
    eventHandler: (event: unknown) => unknown
  ) => {
    const url = `${this.getNtfyUrl(topics)}/sse`;
    await fetchEventSource(url, {
      headers: {
        Authorization: `Bearer ${this.ntfyApiKey}`,
      },
      onopen: async () => {
        console.log(`EventSource connected to ${url}`);
      },
      onmessage: (event) => {
        eventHandler(event);
      },
      onerror: () => {
        console.error(`EventSource error: Failed to connect to ${url}`);
      },
    });
  };

  publishToNftyTopic = async (topic: string, messageData: NtfyMessage) => {
    const url = this.getNtfyUrl([topic]);
    const { message, title } = messageData;
    const response = await fetch(url, {
      method: "POST",
      body: message,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.ntfyApiKey}`,
        Title: title ?? "",
      },
    });

    return response.json();
  };
}
