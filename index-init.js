#!/usr/bin/env node
const tmpList = require("./config/tmp.js");

const path = require("path");
const fs = require("fs");
// shell
const shell = require("shelljs");
///美化终端字符显示
const chalk = require("chalk");
//与用户交互
const inquirer = require("inquirer");
//loading模块
const ora = require("ora");

function getTmpPathByName(name) {
  let item = tmpList.find((item) => item.name === name);
  //   return path.join(__dirname, "tmp", item.path, "/*");
  return item.path + ".git";
}

inquirer
  .prompt([
    {
      type: "text",
      message: "请输入项目名称（若不输入则为当前目录）",
      name: "dirname",
    },
    {
      type: "list",
      message: "请选择模板",
      choices: tmpList.map((item) => item.name),
      name: "tmpName",
    },
  ])
  .then((res) => {
    const dirname = res.dirname;
    const loading = ora("初始化模板中...");
    loading.start();
    console.log("\n");
    const _projectPath = dirname
      ? path.join(process.cwd(), dirname)
      : process.cwd();
    const gitDir = path.join(_projectPath, ".git");
    const tmpPath = getTmpPathByName(res.tmpName);
    if (dirname && !fs.existsSync(_projectPath)) {
      shell.mkdir(dirname);
    }
    // shell.cp("-Rf", tmpPath, _projectPath);
    shell.exec(`git clone ${tmpPath} ${_projectPath}`);
    if (_projectPath.indexOf("template-cli") >= 0) {
      console.log("请确认不是误操作");
      process.exit(1);
    }
    // 进入项目目录
    dirname && shell.cd(dirname);
    let info = [dirname ? `cd ${dirname}` : "", "npm install"];
    // 通过 .git 目录判断是否需要初始化一个git仓库
    if (!fs.existsSync(gitDir)) {
      shell.exec("git init");
    }
    info.push("npm run serve\n");
    info.unshift(chalk.green("\n\n项目创建成功\n\n"));
    loading.stop();
    console.log(info.join("\n"));
  });
