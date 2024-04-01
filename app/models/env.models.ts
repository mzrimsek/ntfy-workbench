export interface Topic {
  name: string;
  description?: string;
  tags?: Array<string>;
}

export interface Config {
  tags: Array<string>;
  topics: Array<Topic>;
}
