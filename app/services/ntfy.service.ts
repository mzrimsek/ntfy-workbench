import { fetchEventSource } from "@microsoft/fetch-event-source";
import { NtfyMessage } from "~/models";

export class NtfyService {
  constructor(public nftyUrl: string, public ntfyApiKey: string) {}

  getNtfyUrl = (topic: string) => `https://${this.nftyUrl}/${topic}`;

  subscribeToNftyTopic = async (
    topic: string,
    eventHandler: (event: unknown) => unknown
  ) => {
    const url = `${this.getNtfyUrl(topic)}/sse`;
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
    const url = this.getNtfyUrl(topic);
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
