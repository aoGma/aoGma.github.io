---
title: leetcode-22 括号生成
excerpt: leetcode-22 括号生成
patch: leetcode/22
date: 2025-05-28 17:46:45
categories:
tags:
---

## [括号生成](https://leetcode.cn/problems/generate-parentheses/)

暴力解法：生成所有组合，然后校验

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // n个括号对数
  let res = [];
  function check(path) {
    const stack = [];
    for (let i = 0; i < path.length; i++) {
      const top = stack.length > 0 ? stack[stack.length - 1] : "";
      if (top === "(" && path[i] === ")") {
        stack.pop();
      } else {
        stack.push(path[i]);
      }
    }
    return !stack.length;
  }
  function generate(count, path) {
    if (count > 0) {
      for (const char of ["(", ")"]) {
        generate(count - 1, char + path);
      }
    } else {
      check(path) && res.push(path);
    }
  }
  generate(2 * n, "");
  return res;
};
console.log(generateParenthesis(3));
```

回溯，保证前缀合法的情况，继续前进

```js
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let res = [];
  function backtrack(cur = "", open = 0, close = 0) {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    /** 保证合法前缀 */
    // 因为每次加括号都必须满足规则
    // 不合法的路径根本不会进入下一步
    if (open < n) {
      backtrack(cur + "(", open + 1, close);
    }
    // 前面有未匹配的左括号
    if (close < open) {
      backtrack(cur + ")", open, close);
    }
  }
  backtrack();
  return res;
};
```

`open<n`的情况下可以继续加左括号，`close<open`的情况下，可以加右括号去闭合前面的左括号，直到所有括号都用完
