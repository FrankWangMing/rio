#!/usr/bin/env node
import { Command } from "commander";
import inquirer from 'inquirer'
import chalk from 'chalk'
import { run } from "./commands/run";
const program = new Command();
program
  .name('rio')
  .description('A simple CLI tool')
  .version('1.0.0');


program
  .command('greet')
  .description('Greet the user')
  .option('-n, --name <name>', 'User name')
  .action(async (options) => {
    const name = options.name || (await askName());
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
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
  ]);
  return answers.name;
}

program.parse(process.argv);
