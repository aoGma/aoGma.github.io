---
title: Commitlint 和 Commitizen 规范项目提交信息
date: 2024-02-01 23:57:09
categories:
- front-end
tags:
- git
---
## 1.配置husky
>
> To lint commits before they are created you can use Husky's commit-msg hook:

```shell
# Install Husky v6
npm install husky --save-dev
# or
yarn add husky --dev

# Activate hooks
npx husky install
# or
yarn husky install

# Add hook

npm pkg set scripts.commitlint="commitlint --edit"
npx husky add .husky/commit-msg 'npm run commitlint ${1}'
# .husky/commit-msg 文件会缺失 ${1} 手动补充一下
# yarn commitlint ${1}
```

## 2.配置commitlint

```shell
# npm install --save-dev @commitlint/{config-conventional,cli}
# 由于使用node16不满足node>=18的条件需要降级安装
yarn add -D @commitlint/{config-conventional,cli}@16

# Configure commitlint to use conventional config
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
# format file
prettier -w commitlint.config.js
```

## 3.配置commitizen

```shell
yarn add -D commitizen
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

> And you can then add some nice npm scripts in your package.json file pointing to the local version of Commitizen:
> `package.json`
>
> ```shell
>  ...
>  "scripts": {
>    "commit": "cz"
>  }
> ```
>
## 4.git commit不走commitlint
>
> Optional: Running Commitizen on git commit

1. Update .git/hooks/prepare-commit-msg with the following code:

```shell
#!/bin/bash
exec < /dev/tty && node_modules/.bin/cz --hook || true
```

1. Husky
For husky users, add the following configuration to the project's package.json file:

```shell
"husky": {
  "hooks": {
    "prepare-commit-msg": "exec < /dev/tty && npx cz --hook || true"
  }
}
```

## 参考文章

- [commitlint GitHub](https://github.com/conventional-changelog/commitlint#config)
- [commitizen GitHub](https://github.com/commitizen/cz-cli)
