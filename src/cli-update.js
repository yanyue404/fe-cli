#!/usr/bin/env node

const chalk = require("chalk");
const shell = require("shelljs");

shell.cd(__dirname);
shell.exec("git pull");

const msg = [
  "",
  chalk.green("更新成功"),
  "",
  "fe -h   查看支持命令",
  "fe tmp  查看可用模板",
].join("\r\n");

console.log(msg);
