import fs from "fs";
import path from "path";
import { FileNode, ProjectStructure } from "./types";
const createFile = (filePath: string, content = ""): void => {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
};
function createFileByFileNode(fileNode:FileNode,_path){
  if(!fileNode.children){
    return
  }
  for (const file of fileNode.children) {
    if(file.type === "folder"){
      createFileByFileNode(file,_path+fileNode.name)
    }else{
      createFile(file.name,path.join(_path, file.name))
    }
  }
}
export async function createStructure(basePath: string, structure: ProjectStructure): Promise<void> {


  const srcPath = path.join(basePath, "src");
  createFileByFileNode(structure.src,srcPath);


  // const publicPath = path.join(basePath, "public");
  // for (const file of structure.public) {
  //   createFile(path.join(publicPath, file), "<!-- Static File -->");
  // }

  // const nginxPath = path.join(basePath, "nginx");
  // for (const file of structure.nginx) {
  //   createFile(path.join(nginxPath, file), "<!-- Static File -->");
  // }
}
