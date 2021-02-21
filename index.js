#!/usr/bin/env node
// #! node

const version = require("./package.json").version;

const path = require("path");
// 核心处理命令行
const { program } = require("commander");
// shell
const shell = require("shelljs");
//美化终端字符显示
const chalk = require("chalk");
//与用户交互
const inquirer = require("inquirer");
//loading模块
const ora = require("ora");
//下载 git库

const verStr = chalk.green(
  [
    `__________________________________`,

    `
   _______             __            __                               
  /       \           /  |          /  |                              
  $$$$$$$  |  ______  $$/  _______  $$ |____    ______   __   __   __ 
  $$ |__$$ | /      \ /  |/       \ $$      \  /      \ /  | /  | /  |
  $$    $$<  $$$$$$  |$$ |$$$$$$$  |$$$$$$$  |/$$$$$$  |$$ | $$ | $$ |
  $$$$$$$  | /    $$ |$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |$$ | $$ | $$ |
  $$ |  $$ |/$$$$$$$ |$$ |$$ |  $$ |$$ |__$$ |$$ \__$$ |$$ \_$$ \_$$ |
  $$ |  $$ |$$    $$ |$$ |$$ |  $$ |$$    $$/ $$    $$/ $$   $$   $$/ 
  $$/   $$/  $$$$$$$/ $$/ $$/   $$/ $$$$$$$/   $$$$$$/   $$$$$/$$$$/  
  `,
    "",
    " 欢迎使用 rainbow cli",
    "__________________________________",
  ].join("\n")
);
console.log(verStr);
program
  .version(`version: ${version}`, "-V,-v,--version")
  .command("init", "初始化一个项目", { executableFile: "index-init.js" })
  .command("update", "更新脚手架", { executableFile: "index-update.js" })
  .command("tmp", "查看可选模板", { executableFile: "index-tmp.js" });

program
  .usage("[cmd] <options>")
  .arguments("<cmd> [env]")
  .action((cmd, params) => {
    console.log(
      `${chalk.yellow("没有")}[${chalk.red(cmd)}]${chalk.yellow("命令")}`
    );
    shell.exec("rainbow -h");
    process.exit(1);
  });

program.parse(process.argv);
