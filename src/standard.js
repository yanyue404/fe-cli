const path = require("path");
const shell = require("shelljs");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      message: "请选择集成代码规范的项目（若不选择则为 nuxt 项目创建）",
      choices: [
        { name: "为 nuxt 项目创建", checked: true, value: "nuxt" },
        { name: "为 vite 项目创建", value: "vite" },
      ],
      name: "projectType",
    },
  ])
  .then(({ projectType }) => {
    shell.exec(`sh ${path.join(__dirname, "./project-init/build.sh")} ${projectType}`);
  });
