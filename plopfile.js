const path = require("path");
// 导出用于创建生成器任务
module.exports = (plop) => {
  plop.setGenerator("component", {
    description: "create a component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "component name",
        default: "MyComponent",
      },
    ],
    actions: [
      {
        type: "add", // 添加文件
        //Add PWD option for path  https://github.com/plopjs/plop/issues/5
        path: "{{pwd}}src/components/{{name}}/index.vue",
        templateFile: "plop-templates/component/index.hbs",
      },
      {
        type: "add", // 添加文件
        path: "{{pwd}}src/components/{{name}}/README.md",
        templateFile: "plop-templates/component/README.hbs",
      },
    ],
  });
};
