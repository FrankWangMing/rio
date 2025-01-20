import webpack from 'webpack';
import path from 'path';
import { spawn } from 'child_process';

export const dev = async () => {
  spawn('pnpm', ['install'], {
    cwd: path.resolve(__dirname, './'),
    shell: true,
    stdio: 'inherit',
  });
};
