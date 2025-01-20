import express, { Request, Response, NextFunction } from 'express';
import { generateCode, dev } from './logic/generate';
import path from 'path';
export const runServer = () => {
  console.log('runServer');

  // 创建 Express 应用
  const app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  // 中间件：解析 JSON 请求体
  app.use(express.json());

  app.use(
    express.static(path.resolve(__dirname, './web'), {
      setHeaders: setCustomCacheControl,
    })
  );

  // 路由：获取用户信息
  app.get('/users/:id', (req: Request, res: Response) => {
    const userId = req.params.id;
    res.json({
      id: userId,
      name: 'John Doe',
      email: 'johndoe@example.com',
    });
  });

  // 路由：创建用户
  app.post('/generate', (req: Request, res: Response) => {
    const { data } = req.body;
    // console.log(JSON.parse(data))
    generateCode(data);
    dev();
    res.status(201).json({
      id: Math.floor(Math.random() * 1000),
    });
  });

  // 全局错误处理
  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: err.message });
    }
  );

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../web', 'index.html'));
  });
  // 启动服务器
  const PORT = 3000;
  app.listen(PORT || 3002, function () {
    console.log(`已经启动服务： http://127.0.0.1:${PORT || 3002}`);
  });
};

// 缓存控制
function setCustomCacheControl(
  res: { setHeader: (arg0: string, arg1: string) => void },
  path: string
) {
  // 对html格式文件不设置缓存
  if (express.static.mime.lookup(path) == 'text/html') {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    // 其他静态资源使用强缓存
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
}
