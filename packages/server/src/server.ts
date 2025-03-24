import express, { Request, Response, NextFunction } from 'express';
import { generateCode } from './logic/generate';
import { dev } from './logic/dev';
import { update } from './logic/update';
import path from 'path';

export const runServer = () => {
    console.log('runServer');

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
    app.use(express.json());
    app.use(
      express.static(path.resolve(__dirname, './web'), {
        setHeaders: setCustomCacheControl,
      })
    );


    app.post('/update', (req: Request, res: Response) => {

      update(req.body)
      res.status(201).json({
        id: Math.floor(Math.random() * 1000),
      });
    });

    app.get('/data', (req: Request, res: Response) => {
      res.json({

      });
    });

    app.post('/generate', (req: Request, res: Response) => {
      const { data } = req.body;
      // console.log(JSON.parse(data))
      generateCode(data).then(r=>{
        res.status(201).json({
          id: Math.floor(Math.random() * 1000),
        });
      })

    });

    app.post('/development', (req: Request, res: Response) => {
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
