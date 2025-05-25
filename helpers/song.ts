import { parseStream } from "music-metadata";
import * as http from "http";
import * as https from "https";

export const getDurationFromUrl = async (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    try {
      const parsedUrl = new URL(url);
      const client = parsedUrl.protocol === "https:" ? https : http;

      client.get(parsedUrl, async (response) => {
        try {
          const metadata = await parseStream(response, null, { duration: true });
          resolve(metadata.format.duration ?? 0);
        } catch (err) {
          reject(err);
        }
      }).on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
