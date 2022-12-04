const { exec, echo } = require("shelljs");
/* 
 自动发布 tag 
*/

let tagName = process.argv[2] || "last";

exec("git pull");

echo(`# 删除本地 ${tagName}`);
exec(`git tag -d ${tagName}`);

echo("# 删除远程 tag");
exec(`git push origin :refs/tags/${tagName}`);

echo(`# 新建 tag ${tagName} 并提交到远端:`);
exec(`git tag ${tagName}`);
exec(`git push origin ${tagName}`);
