// src/test/fileStructure.test.ts
import fs from 'fs';
import path from 'path';
import { createStructure } from '../structure';  // 假设你的函数在这个文件中
import { FileNode } from '../types'; // 假设你的类型定义在这里
import { describe } from '@jest/globals';
import { jest } from '@jest/globals';
import { beforeEach } from '@jest/globals';
import { it } from '@jest/globals';
import { expect } from '@jest/globals';

// 模拟 fs 模块的相关方法
jest.mock('fs');
jest.mock('path');

// 测试 createStructure 函数
describe('createStructure', () => {
  let mockFileNode: FileNode;

  beforeEach(() => {
    mockFileNode = {
      type: 'folder',
      name: 'root',
      children: [
        {
          type: 'folder',
          name: 'folder1',
          children: [
            { type: 'file', name: 'file1.txt' },
            { type: 'file', name: 'file2.txt' }
          ]
        },
        {
          type: 'file',
          name: 'file3.txt'
        }
      ]
    };

    // 模拟 path 的 join 方法
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });

  it('should create the folder structure and files', async () => {
    // 模拟 fs.existsSync 和 fs.mkdirSync 方法
    (fs.existsSync as jest.Mock).mockReturnValue(false); // 假设目录不存在
    const writeFileSyncMock = fs.writeFileSync as jest.Mock;

    // 调用 createStructure
    await createStructure('/test', mockFileNode);

    // 检查目录是否被创建
    expect(fs.mkdirSync).toHaveBeenCalledWith('./', { recursive: true });
    expect(fs.mkdirSync).toHaveBeenCalledWith('./', { recursive: true });

    // 检查文件是否被创建
    expect(writeFileSyncMock).toHaveBeenCalledWith('./', '', 'utf8');
    expect(writeFileSyncMock).toHaveBeenCalledWith('./', '', 'utf8');
    expect(writeFileSyncMock).toHaveBeenCalledWith('./', '', 'utf8');
  });

  it('should create the data folder and file', async () => {
    // 模拟 fs.existsSync 和 fs.mkdirSync 方法
    (fs.existsSync as jest.Mock).mockReturnValue(false); // 假设目录不存在
    const writeFileSyncMock = fs.writeFileSync as jest.Mock;

    // 调用 createStructure
    await createStructure('/test', mockFileNode);

    // 检查 data 目录和 data.json 文件是否被创建
    expect(fs.mkdirSync).toHaveBeenCalledWith('/test/root/data', { recursive: true });
    expect(writeFileSyncMock).toHaveBeenCalledWith('/test/root/data/data.json', '', 'utf8');
  });

  it('should not create file if fileNode.children is empty', async () => {
    // 测试没有子节点的情况
    const fileNodeWithoutChildren: FileNode = { type: 'folder', name: 'emptyFolder', children: [] };
    await createStructure('/test', fileNodeWithoutChildren);

    // 不应该调用写文件操作
    expect(fs.writeFileSync).not.toHaveBeenCalled();
  });
});
