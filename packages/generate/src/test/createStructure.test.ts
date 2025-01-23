
import fs from 'fs';
import path from 'path';
import { createStructure } from '../structure';  // 假设你的函数在这个文件中
import { FileNode } from '../types'; // 假设你的类型定义在这里
import { describe } from '@jest/globals';
import { jest } from '@jest/globals';
import { beforeEach } from '@jest/globals';
import { it } from '@jest/globals';
import { expect } from '@jest/globals';
import { createFileByFileNode } from '../utils';

// 使用 jest.mock 模拟 createFileByFileNode
jest.mock('../utils', () => ({
    createFileByFileNode: jest.fn(),
  }));

  describe('createStructure', () => {
    const basePath = '/mock/base/path';
    const structure:FileNode = {
        type:"file",
        name:"test.json",
        content: "{}"
    };

    it('should resolve the basePath and call createFileByFileNode with the correct arguments', async () => {
      // 调用函数
      await createStructure(basePath, structure);

      // 检查 createFileByFileNode 是否被调用
      expect(createFileByFileNode).toHaveBeenCalled();

      // 确保 createFileByFileNode 被调用时，传递的第一个参数是结构，第二个参数是绝对路径
      const expectedPath = path.resolve(basePath); // 模拟后的路径


      expect(createFileByFileNode).toHaveBeenCalledWith(structure, expectedPath);
    });

  });