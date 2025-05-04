import { parseStream } from "music-metadata";
import * as https from 'https';

export const getDurationFromUrl = async (url: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    https.get(url, async (response) => {
      try {
        const metadata = await parseStream(response, null, { duration: true });
        resolve(metadata.format.duration ?? 0);
      } catch (err) {
        reject(err);
      }
    }).on('error', reject);
  });
};

export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};