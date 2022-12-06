# fe-cli

🛠️ A front-end automation tool (build your own project)

## 配置

1. 克隆项目

```bash
git clone https://github.com/yanyue404/fe-cli.git
```

TODO: npm

```bash
$ npm i @yanyue404/fe-cli -g
```

2. 安装依赖

```bash
npm install
```

3. 链接全局命令

```bash
# 此命令可能需要管理员权限
npm link
```

## 使用

fe -h

```
Options:
  -V,-v,--version  output the version number
  -h, --help       display help for command

Commands:
  init             初始化一个项目
  update           更新脚手架
  tmp              查看可选模板
```

### 功能点

1. 按可选模板初始化项目 `fe create`
2. 按自定义 git 仓库初始化项目 `fe create`
3. 自动发布 tag `fe tag v1.0.0`
4. 为当前项目集成代码规范 `fe standard`
5. 为当前项目创建一个 vue 组件 `vue comp` TODO:

## 模板库生态

| Project                                                                    | Status | Description                                                         |
| -------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------- |
| [vue-boilerplate](https://github.com/rainbow-design/vue-boilerplate)       | 100%   | Rainbow's Vue CLI                                                   |
| vue-admin-tamplate                                                         | 0%     | TODO                                                                |
| nuxt-boilerplate                                                           | 0%     | TODO                                                                |
| [wxapp-template](https://github.com/rainbow-design/wxapp-template)         | 100%   | 微信小程序脚手架模板（原生）                                        |
| taro-boilerplate                                                           | 0%     | TODO                                                                |
| [react-boilerplate](https://github.com/rainbow-design/rainbow-boilerplate) | 100%   | React 16.13.0 boilerplate with react-router-dom, redux & webpack 4. |
| koa-boilerplate                                                            | 0%     | TODO                                                                |

## License

MIT
