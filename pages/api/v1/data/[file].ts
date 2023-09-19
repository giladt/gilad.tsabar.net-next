import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonDirectory = path.join(process.cwd(), 'lib/data/');

  const { file } = req.query;
  const fileContents = await fs.readFile(jsonDirectory + `${file}.json`, 'utf8');
  return res.status(200).json(fileContents);
}