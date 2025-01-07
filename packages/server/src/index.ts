import express, { Request, Response, NextFunction } from 'express';
import { generateCode, dev } from './logic/generate';
// 创建 Express 应用
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// 中间件：解析 JSON 请求体
app.use(express.json());

// 路由：根路径
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

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
  generateCode(data)
  dev()
  res.status(201).json({
    id: Math.floor(Math.random() * 1000),
  });
});

// 全局错误处理
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});


// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
