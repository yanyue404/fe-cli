#!/usr/bin/env node
const tmpList = require("../config/tmp.js");
//美化终端字符显示
const chalk = require("chalk");

const info = tmpList.map((item) => {
  return (
    item.name +
    "\t" +
    chalk.green("case: " + item.path) +
    "\t\t" +
    item.description
  );
});

info.unshift(chalk.yellow("\n可选模板列表:\n"));

console.log(info.join("\n"));
