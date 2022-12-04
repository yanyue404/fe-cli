const axios = require("axios");
// 1).获取仓库列表
const fetchRepoList = async () => {
  const { data } = await axios.get("https://api.github.com/xxx/repos");
  return data;
};

module.exports = async (projectName) => {
  const spinner = ora("fetching repo list");
  spinner.start(); // 开始loading
  let repos = await fetchRepoList();
  spinner.succeed(); // 结束loading // 选择模板
  repos = repos.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: "repo",
    type: "list",
    message: "please choice repo template to create project",
    choices: repos, // 选择模式
  });
  console.log(repo);
};
