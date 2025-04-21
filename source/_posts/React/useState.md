---
title: React useState
date: 2025-04-21 15:21:09
categories: 技术分享
tags: React
---

`useState`是一个React Hook，它允许你向组件添加一个状态变量

```js
// component state example
const [state, setState] = useState(initialState)
```

useState的详细用法在React[官方文档](https://zh-hans.react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value)中已经写的很清楚了，挑一些印象比较模糊、没使用过的技巧来记录一下

### 根据先前的state来更新state

```js
function handleClick() {
  setAge(age + 1);
  setAge(age + 1);
  setAge(age + 1);
}
```

这段代码的目的很明确，就是三次调用age+1，想要得到age+3的目的
然而，点击一次后，age将只会变为43而不是45！
这是因为调用set函数不会更新已经运行代码中的age状态变量。因此，每个setAge(age + 1)调用变成了setAge(43)

在函数组件中，useState的setAge(age + 1) 会：

 1. 异步执行更新（不会立刻更新age）
 2. 基于当前闭包中的值来计算新的age

在React18中，状态更新大多数场景（包括setTimeout和Promise.then）都被自动批处理处理，表现为异步。但你也可以通过flushSync等方式让更新立即生效，实现同步更新

什么是“当前闭包中的值”：
在 handleClick 这个函数执行的那一刻，age是多少，它就一直是那个值，不会因为你调用了setAge而变化

```js
const [age, setAge] = useState(42);

function handleClick() {
  console.log('当前 age:', age); // 总是 42
  setAge(age + 1); // 相当于setAge(43)
  setAge(age + 1); // 还是setAge(43)
  setAge(age + 1); // 又是setAge(43)
}
```

虽然调用了三次setAge，但因为age是函数执行时从“闭包”里拿到的值，一直是42，所以三次调用都是setAge(43)

为了解决这个问题，可以向setAge传递一个更新函数，而不是下一个状态：

```js
function handleClick() {
  // 使用函数式更新，让每次更新都基于最新的状态
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

### 更新状态中的对象和数组

你可以将对象和数组放入状态中。在React中，状态被认为是只读的，因此你应该替换它而不是改变现有对象。例如，如果你在状态中保存了一个form对象，请不要改变它

### state设置为一个函数

```js
const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

someFunction被视为初始值函数，会被调用一次

正确形式

```js
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```
