---
title: 规范 Git Message
date: 2024-02-01 23:57:09
categories:
- 经验分享
tags:
---
{% folding 规范 Git Message 的原因 open:false %}

1. {% u 提升协作效率 %}
清晰一致的提交信息，方便团队成员快速理解每次改动的目的。
例如：fix(login): 修复登录按钮点击无效的问题
一看就知道修改了什么，为什么改。
2. {% u 便于自动生成变更日志（Changelog） %}
结合工具（如 standard-version、semantic-release），可以根据 commit message 自动生成版本日志。
3. {% u 支持语义化版本控制（Semantic Versioning） %}
根据 feat、fix 等关键词自动决定是否 bump 版本号（major / minor / patch）。
4. {% u 让 Git 历史更清晰可读 %}
规范的结构（如 Conventional Commits）让 git log 阅读体验更佳，便于回溯和审计。
5. {% u 便于代码审查和 CI/CD 流程集成 %}
可以通过提交信息触发特定动作，例如：自动部署、触发测试、或关联 JIRA 任务。
{% endfolding %}

{% image /assets/images/GitMessage.webp 简洁清晰的git log fancybox:true %}
{% image /assets/images/GitLabCommitLog.webp GitLab commits fancybox:true %}

## 1. 安装和配置 husky

拦截提交钩子，触发自动校验
>
> 作用：在 git commit 前后执行脚本，例如校验提交信息。

```bash
# 安装 husky
npm install husky --save-dev
# 激活 hooks
npx husky install
# 添加 git hook
npx husky add .husky/commit-msg 'npm run commitlint ${1}'
```

## 2. 安装和配置 commitlint

校验提交格式
>
> 作用：验证提交信息是否符合规范，比如 Conventional Commits 格式。

```bash
# 安装 commitlint 及其规则（注意 Node 版本限制）
yarn add -D @commitlint/{config-conventional,cli}@16

# 创建配置文件 commitlint.config.js
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# prettier 格式化文件
prettier -w commitlint.config.js
```

## 3. 安装和配置 commitizen

引导填写 commit message
>
> 作用：提供交互式命令行，帮助填写规范化的 commit message。

```bash
yarn add -D commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

然后在 package.json 添加脚本命令

```json
"scripts": {
  "commit": "cz"
}
```

## 4. 配置 prepare-commit-msg
>
> 作用：防止开发者手动绕过 cz，统一通过交互式方式填写 commit。

```bash
# .husky/prepare-commit-msg
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
exec < /dev/tty && npx cz --hook || true
```

🚀 最终使用流程

 1. 执行 npm run commit 或 yarn commit，启动 Commitizen。
 2. 提交信息将按规范生成。
 3. husky 拦截 commit-msg，由 commitlint 检查格式。
 4. 格式正确则提交成功，错误则阻止提交。

## 参考文章

- [commitlint GitHub](https://github.com/conventional-changelog/commitlint#config)
- [commitizen GitHub](https://github.com/commitizen/cz-cli)
