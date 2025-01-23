import fs from 'fs'
import path  from 'path';
export const createBasicFromDeploy = (srcFolder,destFolder)=>{

    // 递归地复制文件夹及其内容
    async function   copyFolder(src: string, dest: string): Promise<void> {
      // 确保目标文件夹存在
      await fs.promises.mkdir(dest, { recursive: true });

      // 读取源文件夹中的所有文件/文件夹
      const items = await fs.promises.readdir(src);

      // 遍历并复制每个文件/文件夹
      for (const item of items) {
        const srcItem = path.join(src, item);
        const destItem = path.join(dest, item);

        const stat = await fs.promises.stat(srcItem);

        if (stat.isDirectory()) {
          // 如果是目录，递归调用
          await copyFolder(srcItem, destItem);
        } else {
          // 如果是文件，复制文件
          await fs.promises.copyFile(srcItem, destItem);
        }
      }
    }

    copyFolder(srcFolder, destFolder).catch(console.error);

}