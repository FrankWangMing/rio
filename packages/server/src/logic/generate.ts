import { generate } from '@rio/generate'
import { run } from './dev'
import { spawn } from 'child_process'
import path from 'path'
export const generateCode = (data: any) => {
    console.log(data)
    generate({})
}


export const dev = () => {
    console.log("dev that")
    console.log(path.resolve(process.cwd(), 'my-web-project'))
    // const command = 'sh';
    // const args = ['-c', 'npm install && npm run dev'];
    // const cwd = path.resolve(process.cwd(),'my-web-project')

    // const child = spawn(command, args, { cwd,stdio: 'inherit' });
    // child.on('close', (code) => {
    //   if (code === 0) {
    //     console.log('Commands executed successfully.');
    //   } else {
    //     console.error(`Process exited with code ${code}`);
    //   }
    // });
    // run()
}