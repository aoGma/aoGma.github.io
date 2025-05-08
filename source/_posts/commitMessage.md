---
title: 规范Git Message
date: 2024-02-01 23:57:09
excerpt: 前端规范Git Message
categories:
- 经验分享
tags:
---
{% folding 规范Git Message的原因 open:false %}

1. {% u 提升协作效率 %}
清晰一致的提交信息，方便团队成员快速理解每次改动的目的。
例如：fix(login): 修复登录按钮点击无效的问题
一看就知道修改了什么，为什么改
2. {% u 便于自动生成变更日志（Changelog） %}
结合工具（如standard-version、semantic-release），可以根据commit message自动生成版本日志
3. {% u 支持语义化版本控制（Semantic Versioning） %}
根据feat、fix等关键词自动决定是否bump版本号（major/minor/patch）
4. {% u 让Git历史更清晰可读 %}
规范的结构（如Conventional Commits）让git log阅读体验更佳，便于回溯和审计
5. {% u 便于代码审查和CI/CD流程集成 %}
可以通过提交信息触发特定动作，例如：自动部署、触发测试、或关联JIRA任务
{% endfolding %}

{% image /assets/images/GitMessage.webp 简洁清晰的git log fancybox:true %}
{% image /assets/images/GitLabCommitLog.webp GitLab commits fancybox:true %}

## 1. 安装和配置husky

拦截提交钩子，触发自动校验
>
> 作用：在git commit前后执行脚本，例如校验提交信息

```bash
# 安装husky
npm install husky --save-dev
# 激活hooks
npx husky install
# 添加git hook
npx husky add .husky/commit-msg 'npm run commitlint ${1}'
```

## 2. 安装和配置commitlint

校验提交格式
>
> 作用：验证提交信息是否符合规范，比如Conventional Commits格式

```bash
# 安装commitlint及其规则（注意Node版本限制）
yarn add -D @commitlint/{config-conventional,cli}@16

# 创建配置文件commitlint.config.js
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# prettier格式化文件
prettier -w commitlint.config.js
```

## 3. 安装和配置commitizen

引导填写commit message
>
> 作用：提供交互式命令行，帮助填写规范化的commit message

```bash
yarn add -D commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

然后在package.json添加脚本命令

```json
"scripts": {
  "commit": "cz"
}
```

## 4. 配置prepare-commit-msg
>
> 作用：防止开发者手动绕过cz，统一通过交互式方式填写commit

```bash
# .husky/prepare-commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
exec < /dev/tty && npx cz --hook || true
```

🚀最终使用流程

 1. 执行npm run commit或yarn commit，启动Commitizen
 2. 提交信息将按规范生成
 3. husky拦截commit-msg，由commitlint检查格式
 4. 格式正确则提交成功，错误则阻止提交

## 参考文章

- [commitlint GitHub](https://github.com/conventional-changelog/commitlint#config)
- [commitizen GitHub](https://github.com/commitizen/cz-cli)
