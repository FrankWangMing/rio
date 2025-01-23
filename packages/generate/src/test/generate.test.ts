import { describe, it } from '@jest/globals';
import { generateRioFile } from '../index';

// 引入模拟后的 rioJson

describe('loader', () => {
  it('should resolve the basePath and call loader with the correct arguments', async () => {
    // 调用 loader 函数，传入模拟的 rioJson
    await generateRioFile({name:"JJ"});

  });
});
