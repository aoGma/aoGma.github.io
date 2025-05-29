---
title: leetcode-46 全排列
excerpt: leetcode-46 全排列
patch: leetcode/46
date: 2025-05-29 08:59:51
categories:
tags:
---

## [全排列](https://leetcode.cn/problems/permutations/description/)

回溯

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // 全排列
  let res = [];
  function backtrack(cur, arr) {
    if (cur.length === nums.length) {
      res.push([...cur]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const arrBack = arr.slice();
      arrBack.splice(i, 1);
      backtrack([...cur, item], arrBack);
    }
  }
  backtrack([], nums);
  return res;
};
// console.log(permute([1, 2, 3]));
```

优化1
每次`arr.splice`和`arr.slice`开销太大，使用`used`标志来控制

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // 全排列
  let res = [];
  const used = Array.from({ length: nums.length }).fill(false);
  function backtrack(path) {
    if (path.length === nums.length) {
      res.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }
  backtrack([]);
  // console.log(used);
  return res;
};
// console.log(permute([1, 2, 3]));
```

优化2
原地交换法

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  // 全排列
  let res = [];
  function backtrack(start) {
    if (start === nums.length) {
      res.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }
  backtrack(0);
  // console.log(used);
  return res;
};
// console.log(permute([1, 2, 3]));
```
