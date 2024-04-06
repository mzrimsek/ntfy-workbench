export interface Topic {
  name: string;
  description?: string;
  tags?: Array<string>;
}

export interface NtfyConfig {
  url: string;
  apiKey: string;
}

export interface JsonConfig {
  topics: Array<Topic>;
  ntfy: NtfyConfig;
}

export interface ApplicationConfig extends JsonConfig {
  tags: Array<string>;
}
