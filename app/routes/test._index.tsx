import type { MetaFunction } from "@remix-run/node";
import { EventSourceMessage } from "@microsoft/fetch-event-source";
import { useEffect, useState } from "react";
import { NtfyService } from "~/services";

export const meta: MetaFunction = () => {
  return [
    { title: "ntfy.sh: EventSource Example" },
    { name: "description", content: "ntfy.sh: EventSource Example" },
  ];
};


const ntfyService = new NtfyService(nftyUrl, ntfyApiKey);

export default function Index() {
  const [eventList, setEventList] = useState<string[]>([]);

  const renderEventsList = () => {
    return eventList.map((event, index) => <p key={index}>{event}</p>);
  };

  useEffect(() => {
    ntfyService.subscribeToNftyTopic(ntfyTopic, async (event) => {
      const data = JSON.parse((event as EventSourceMessage).data);
      setEventList((prev) => [...prev, JSON.stringify(data)]);
      console.log(data);
    });
  });

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
      <p>
        <b>Log:</b>
      </p>
      <div id="events">{renderEventsList()}</div>
    </div>
  );
}
