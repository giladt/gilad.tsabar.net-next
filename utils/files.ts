import path from 'path';
import { promises as fs } from 'fs';

/**
 * Return the content of a file from the file system as a string.
 * @param slug File name to retrieve
 * @param localPath Local path for file. Default: 'lib/data'
 * @returns string
 */
export async function getFile(slug: string, localPath: string = "lib/data/"): Promise<string> {
  const jsonDirectory = path.join(process.cwd(), 'lib/data/');

  const fileContents = await fs.readFile(jsonDirectory + `${slug}.json`, 'utf8');
  return fileContents;
}