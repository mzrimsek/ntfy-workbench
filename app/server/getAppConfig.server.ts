import { ApplicationConfig, JsonConfig } from "~/models";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const getAppConfig = async (): Promise<ApplicationConfig> => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const jsonDirectory = `${__dirname}/../../config`;
  const fileContents = await fs.readFile(
    `${jsonDirectory}/config.json`,
    "utf-8"
  );
  const jsonConfig = JSON.parse(fileContents) as JsonConfig;

  const tags = jsonConfig.topics.reduce((acc, topic) => {
    return [...acc, ...(topic.tags ?? [])];
  }, [] as string[]);
  const uniqueTags = Array.from(new Set(tags));

  const appConfig: ApplicationConfig = { ...jsonConfig, tags: uniqueTags };
  return appConfig;
};
