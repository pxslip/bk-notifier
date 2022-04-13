import { readFile } from 'fs/promises';

/**
 *
 * @param {import('fs').PathLike} filepath
 */
export default async function (filepath) {
  const json = JSON.parse(await readFile(new URL(filepath, import.meta.url)));
  return json;
}
