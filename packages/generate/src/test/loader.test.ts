import fs from 'fs';
import path from 'path';
import { createStructure } from '../structure';  // 假设你的函数在这个文件中
import { FileNode } from '../types'; // 假设你的类型定义在这里
import { describe, jest, beforeEach, it, expect } from '@jest/globals';



import { loader } from '../loader';

// 引入模拟后的 rioJson
import rioJson from '../../schema/rio.json';  // 确保 rioJson 以模块导入的方式加载

describe('loader', () => {
  it('should resolve the basePath and call loader with the correct arguments', async () => {
    // 调用 loader 函数，传入模拟的 rioJson
    const result = await loader(rioJson);

    const mockData = { id: '123', name: 'John Dode' };
    expect(result).toEqual(mockData);
  });
});
