export interface NtfyMessage {
  id: string;
  time: number;
  expires: number;
  event: string;
  topic: string;
  message: string;
  title?: string;
  tags?: Array<string>;
  priority?: number;
  click?: string;
  actions?: Array<object>;
  attachments?: object;
}
