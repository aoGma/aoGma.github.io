---
title: JavaScript 判断元素滚动到底部
date: 2024-02-02 00:00:12
categories:
- front-end
tags:
---
## DOM元素的三个属性

- scrollTop: 元素顶部到元素可视区域顶部的像素距离（可读写）
- clientHeight: 元素的像素高度，包括盒子内容content和内边距padding, 不包括边框外边距和水平滚动条（只读）
- scrollHeight: 类似于clientHeight，但包括由于overflow属性不可见内容的高度。

<div class="justified-gallery">

![ScrollHeight](65581379c3845.png)

</div>

## 计算公式

```javascript
element.scrollHeight - Math.abs(element.scrollTop) === element.clientHeight;
```

## 参考文章

- [MDN scrollHeight](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight)
- [掘金 scrollHeight](https://juejin.cn/post/6961638933121728520)
