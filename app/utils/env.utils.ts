export const parseEnv = (key: string, value?: string) => {
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
};
