export interface NtfyMessage {
  event: string;
  expires: number;
  id: string;
  message: string;
  time: number;
  topic: string;
  title?: string;
}
