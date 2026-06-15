import { readFile } from 'fs/promises';

export const readTextFile = async (path) => {
  try {
    const data = await readFile(path, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading file:', error);
    return {};
  }
}