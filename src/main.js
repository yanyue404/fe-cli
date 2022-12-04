const { program } = require("commander");
const path = require("path");
const shell = require("shelljs");
const chalk = require("chalk");
const { version } = require("./utils/constants");

const verStr = chalk.green(
  [
    `__________________________________`,
    "",
    " 欢迎使用 fe-cli，这是一个前端自动化工具。",
    "__________________________________",
  ].join("\n")
);

console.log(verStr);

const actionsMap = {
  create: [
    "初始化一个项目",
    {
      executableFile: path.join(__dirname, "./create.js"),
    },
  ],
  tag: [
    "发布版本 tag",
    {
      executableFile: path.join(__dirname, "./tag.js"),
    },
  ],
  component: {
    description: "create component",
    alias: "comp",
    examples: ["fe comp <component-name>"],
  },
  update: [
    "更新脚手架",
    {
      executableFile: path.join(__dirname, "./cli-update.js"),
    },
  ],
  tmp: [
    "查看可选模板",
    {
      executableFile: path.join(__dirname, "./cli-tmp.js"),
    },
  ],
};

Object.entries(actionsMap).forEach(([action, value]) => {
  if (Array.isArray(value)) {
    program.command(...[action, ...value]);
  } else {
    program
      .command(action) // 命令的名称
      .alias(value.alias) // 命令的别名
      .description(value.description) // 命令的描述
      .action(() => {
        // 动作
        switch (action) {
          case "component":
            shell.cd(__dirname);
            shell.exec("npm run component");
            break;

          default:
            break;
        }
      });
  }
});

program
  .usage("[cmd] <options>")
  .arguments("<cmd> [env]")
  .action((cmd, params) => {
    console.log(
      `${chalk.yellow("没有")}[${chalk.red(cmd)}]${chalk.yellow("命令")}`
    );
    shell.exec("fe -h");
    process.exit(1);
  });

program.version(`version: ${version}`, "-V,-v,--version").parse(process.argv);
