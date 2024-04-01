export interface Topic {
  name: string;
  description?: string;
  tags?: Array<string>;
}

export interface NtfyConfig {
  url: string;
  apiKey: string;
}

export interface Config {
  tags: Array<string>;
  topics: Array<Topic>;
  ntfy: NtfyConfig;
}
