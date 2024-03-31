export class WebhookService {
  constructor(public webhook: string) {}

  triggerWebhook = async (message: string) => {
    const response = await fetch(this.webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    return response.json();
  };
}
