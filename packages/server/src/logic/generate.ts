import { generate } from '@rio/generate'
import { run } from './dev'
import { spawn } from 'child_process'
import path from 'path'
export const generateCode = ()=>{
    generate({})
}


export const dev=()=>{
    console.log("dev that")
    console.log(path.resolve(process.cwd(),'my-web-project'))
    const command = 'sh';
    const args = ['-c', 'echo "Running command 1" && echo "Running command 2" && echo "Running command 3"'];

    spawn('pnpm', ['install'], { cwd: path.resolve(process.cwd(),'my-web-project') });
    const ls = spawn('pnpm', ['run','dev'], { cwd: path.resolve(process.cwd(),'my-web-project') });
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });

      ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });

      ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    // run()
}