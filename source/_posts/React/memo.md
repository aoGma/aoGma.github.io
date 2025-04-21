---
title: React memo
date: 2025-04-21 16:06:32
categories: 技术分享
tags:
---

memo允许你的组件在props没有改变的情况下跳过重新渲染

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?)
```

使用memo将组建包装起来，以获得该组件的一个记忆化版本。通常情况下，只要该组件的props没有改变，这个记忆化版本就不在其父组件重新渲染时重新渲染。但React仍可能重新渲染它：记忆化是一种性能优化，而非保证

### arePropsEqual

可选参数arePropsEqual：一个函数，接受两个参数：组件的前一个props和新的props。如果旧的和新的props相等，即组件使用新的props渲染的输出和表现与旧的props完全相同，则它应该返回true。否则，返回false。通常情况下，你不需要指定此函数。默认情况下，React将使用Object.is比较每一个prop

### 当组件的某个 prop 是对象、数组或函数时，我的组件会重新渲染

React通过浅比较来比较旧的和新的prop：也就是说，他会考虑每个新的prop是否与旧的prop引用相等。如果每次父组件重新渲染时创建一个新的对象或数组，即使它们每个元素都相同，React仍会认为它已更改。同样地，如果在渲染父组件时创建一个新的函数，即使该函数具有相同的定义，React也会认为它已更改
