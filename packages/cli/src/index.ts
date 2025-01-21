#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { run } from './commands/run';
import { init } from './commands/init';
import * as server from '@rioe/server'
const program = new Command();

program.name('rio').description('A simple CLI tool').version('1.0.0');

program
  .command('init')
  .description('Init the project')
  .option('-n, --name <name>', 'Project name')
  .action(async (options) => {
    const name = options.name || (await askName());
    await init({ name });
    console.log(chalk.green(`Hello, ${name}!`));
  });

program
  .command('run')
  .description('Greet the user')
  .option('-n, --name <name>', 'User name')
  .action(async (options) => {
    run();
    // const name = options.name || (await askName());
    // console.log(chalk.green(`Hello, ${name}!`));
  });

async function askName() {
  let name = '';
  let valid = false;

  while (!valid) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the project name?',
        validate: input => {
          if (!input || input.trim().length === 0) {
            return 'Project name cannot be empty!';
          }
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Project name must only contain alphanumeric characters, dashes, or underscores!';
          }
          console.log(server)
          // checkProjectByName()
          return true;
        }
      }
    ]);

    name = answers.name.trim();

    // 验证名称是否合法
    if (name && /^[a-zA-Z0-9-_]+$/.test(name)) {
      valid = true; // 如果符合要求，退出循环
    } else {
      console.log(chalk.red('Invalid name, please try again.'));
    }
  }

  return name;
}

program.parse(process.argv);
