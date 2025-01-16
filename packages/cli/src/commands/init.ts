import path from "path";
import fs from "fs";
import {generateRioFile} from "@rioe/generate"
const createFile = (filePath: string, content = ""): void => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf8");
  };

const init = ({name}:{name:string})=>{
    generateRioFile({name})
}
export {
    init
}