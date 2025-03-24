import fs from 'fs';
import path from 'path';
import { createStructure } from '../structure';  // 假设你的函数在这个文件中
import { FileNode } from '../types'; // 假设你的类型定义在这里
import { describe, jest, beforeEach, it, expect } from '@jest/globals';



import { generateRioFile } from '../index';

// 引入模拟后的 rioJson
import rioJson from '../../schema/rio.json';  // 确保 rioJson 以模块导入的方式加载
import { createBasicFromDeploy } from '../createBasicFromDeploy';

describe('loader', () => {
  it('should resolve the basePath and call loader with the correct arguments', async () => {

    const srcFolder = path.resolve(__dirname,'../basicTemplate'); // 源文件夹路径
    const destFolder = path.resolve(__dirname,"../../../deploy"); // 目标文件夹路径

    await createBasicFromDeploy(srcFolder, destFolder);

    // 你可以验证目标文件夹是否存在
    const destExists = await fs.promises.stat(destFolder).then(() => true).catch(() => false);
    expect(destExists).toBe(true);

    // 也可以验证文件夹内容是否正确
    const items = await fs.promises.readdir(destFolder);
  });
});
