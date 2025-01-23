import path from "path";
import { createFile } from "./createFile";
import {FileNode} from '../types'

export function createFileByFileNode(fileNode: FileNode, _path) {
    if(fileNode.type === "folder" && fileNode.children){
      for (const file of fileNode.children) {
          createFileByFileNode(file, path.join(_path, fileNode.name));
      }
    }
    if(fileNode.type === "file"){
      let content = fileNode?.content
      createFile(path.join(_path, fileNode.name),content);
    }
  }