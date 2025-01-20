import fs from 'fs';
import path from 'path';
import { FileNode } from './types';
const createFile = (filePath: string, content = ''): void => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
};
function createFileByFileNode(fileNode: FileNode, _path) {
  if (!fileNode.children) {
    return;
  }
  for (const file of fileNode.children) {
    if (file.type === 'folder') {
      createFileByFileNode(file, path.join(_path, fileNode.name));
    } else {
      createFile(path.join(_path, fileNode.name, file.name));
    }
  }
}
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
