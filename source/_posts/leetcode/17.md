---
title: leetcode-17 电话号码的字母组合
excerpt: leetcode-17 电话号码的字母组合
patch: leetcode/17
date: 2025-05-23 09:04:17
categories:
tags:
---

## [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/submissions/631810537/)

迭代

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  let res = [""];
  for (const digit of digits) {
    let temp = [];
    for (const item of res) {
      for (const char of map[digit]) {
        temp.push(item + char);
      }
    }
    res = temp;
  }
  return res;
};
```

递归

```js
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  const map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  let res = [];
  function fn(index, path) {
    if (index === digits.length) {
      res.push(path);
      return;
    }
    for (const char of map[[digits[index]]]) {
      fn(index + 1, path + char);
    }
  }
  fn(0, "");
  return res;
};
console.log(letterCombinations("23"));
```
