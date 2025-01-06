import fs from "fs";
import path from "path";
import { ProjectStructure } from "./types";

export async function createStructure(basePath: string, structure: ProjectStructure): Promise<void> {
  const createFile = (filePath: string, content = ""): void => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf8");
  };

  const srcPath = path.join(basePath, "src");
  for (const [folder, files] of Object.entries(structure.src)) {
    for (const file of files) {
      createFile(path.join(srcPath, folder, file));
    }
  }

  const publicPath = path.join(basePath, "public");
  for (const file of structure.public) {
    createFile(path.join(publicPath, file), "<!-- Static File -->");
  }

  const nginxPath = path.join(basePath, "nginx");
  for (const file of structure.nginx) {
    createFile(path.join(nginxPath, file), "<!-- Static File -->");
  }
}
