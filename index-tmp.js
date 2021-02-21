#!/usr/bin/env node
const tmpList = require("./config/tmp.js");
//美化终端字符显示
const chalk = require("chalk");

const info = tmpList.map((item) => {
  return item.name + "\t" + chalk.green("case: " + item.path);
});

console.log(info.join("\n"));
