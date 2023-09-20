import path from 'path';
import { promises as fs } from 'fs';

export async function getFile(slug: string): Promise<string> {
  const jsonDirectory = path.join(process.cwd(), 'lib/data/');

  const fileContents = await fs.readFile(jsonDirectory + `${slug}.json`, 'utf8');
  return fileContents;
}