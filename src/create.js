#!/usr/bin/env node
const tmpList = require("../config/tmp.js");

const path = require("path");
const fs = require("fs");
const shell = require("shelljs");
const chalk = require("chalk");
const inquirer = require("inquirer");
const ora = require("ora");

function getTmpPathByName(name) {
  let item = tmpList.find((item) => item.name === name);
  return item.path;
}

// 命令行交互的参数
let params = {},
  nextPrompt = [];

async function main() {
  await inquirer
    .prompt([
      {
        type: "text",
        message: "请输入项目名称（若不输入则为当前目录）",
        name: "dirname",
      },
      {
        type: "list",
        message: "请选择创建项目的方式（若不选择则为按模板创建）",
        choices: [
          { name: "按已有模板创建", checked: true, value: "template" },
          { name: "按自定义 git 地址创建", value: "customize" },
        ],
        name: "tmpType",
      },
    ])
    .then((res) => {
      params = { ...res };
      if (params.tmpType === "template") {
        nextPrompt = [
          {
            type: "list",
            message: "请选择模板",
            choices: tmpList.map((item) => item.name),
            name: "tmpName",
          },
        ];
      } else {
        nextPrompt = [
          {
            type: "text",
            message: "请输入git仓库地址（地址完整带有.git）",
            name: "gitPath",
          },
        ];
      }
    });

  inquirer.prompt(nextPrompt).then((res) => {
    params = { ...params, ...res };
    const dirname = params.dirname;
    const loading = ora("初始化模板中...");
    loading.start();
    console.log("\n");

    // 项目基础路径
    const _projectPath = dirname
      ? path.join(process.cwd(), dirname)
      : process.cwd();

    if (dirname && !fs.existsSync(_projectPath)) {
      shell.mkdir(dirname);
    }

    // 生成文件目录
    let gitDir = "";
    if (params.tmpType === "template") {
      // 用这个模板
      gitDir = getTmpPathByName(params.tmpName);
    } else {
      gitDir = params.gitPath;
    }
    // 克隆, 重新初始化 git 仓库
    // * git clone - b git_branch_name git_repo_url
    shell.exec(`git clone ${gitDir} ${_projectPath}`);
    shell.rm("-rf", dirname + "/.git");
    // 进入项目目录
    dirname && shell.cd(dirname);
    shell.exec("git init");

    if (_projectPath.indexOf("fe-cli") >= 0) {
      console.log("请确认不是误操作");
      process.exit(1);
    }

    // TODO:
    // 下载好后根据项目中的配置文件动态询问用户使用 ejs 编译项目模板

    let info = [dirname ? `cd ${dirname}` : "", "npm install"];

    info.push("npm run serve\n");
    info.unshift(chalk.green("\n\n项目创建成功\n\n"));
    loading.stop();
    console.log(info.join("\n"));
  });
}

main();
