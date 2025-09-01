export interface Topic {
  name: string;
  description?: string;
  tags?: Array<string>;
}

export interface NtfyConfig {
  url: string;
  apiKey: string;
}

export interface UserProvidedConfig {
  topics: Array<Topic>;
  ntfy: NtfyConfig;
}

export interface ApplicationConfig extends UserProvidedConfig {
  tags: Array<string>;
}
