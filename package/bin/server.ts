import express,{ Express } from "express"
import path from "path";

class RioServer{
    server: Express

    constructor(){
        let app= express()
        // 指定 dist 目录为静态资源目录
        app.use(express.static(path.resolve('../web','dist')));

        // 对于所有请求，返回 index.html（适用于单页应用）
        app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
        });
        this.server = app
    }
    start(){
        this.server.listen(3000, ()=>{
            console.log("server started on port 3000")
        })

    }
}


export {
    RioServer
}

