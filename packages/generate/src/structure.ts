import path from 'path';
import { FileNode } from './types';
import {createFileByFileNode} from './utils'
export async function createStructure(
  basePath: string,
  structure: FileNode
): Promise<void> {
  const srcPath = path.resolve(basePath);

  createFileByFileNode(structure, srcPath);

  // const nginxPath = path.join(basePath, "nginx");
  // for (const file of structure.nginx) {
  //   createFile(path.join(nginxPath, file), "<!-- Static File -->");
  // }
}
