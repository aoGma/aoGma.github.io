---
title: 最小堆实现
date: 2025-04-23 23:35:40
categories:
tags:
---

前一篇博客最小栈，错误以为使用最小堆来实现，写完才发现题目不太对
手写一下最小堆，来复习一下

```js
var MinHeap = function () {
 // 最小堆
 this.minHeap = [];
};
MinHeap.prototype.getLeftIdx = function (idx) {
  // 这里是idx*2+1，表示base 0起，如果是idx*2，那么表示base 1起
 return idx * 2 + 1;
};
MinHeap.prototype.getRightIdx = function (idx) {
 return idx * 2 + 2;
};
MinHeap.prototype.getParentIdx = function (idx) {
 return Math.floor((idx - 1) / 2);
};
// 向上调整
MinHeap.prototype.heapifyUp = function () {
 const length = this.minHeap.length;
 let curIdx = length - 1,
  parentIdx = this.getParentIdx(curIdx);
 while (parentIdx >= 0 && this.minHeap[curIdx] < this.minHeap[parentIdx]) {
  const temp = this.minHeap[curIdx];
  this.minHeap[curIdx] = this.minHeap[parentIdx];
  this.minHeap[parentIdx] = temp;
  curIdx = parentIdx;
  parentIdx = this.getParentIdx(curIdx);
 }
};
// 向下调整
MinHeap.prototype.heapifyDown = function () {
 let curIdx = 0;
 const length = this.minHeap.length;
 while (true) {
  // while(leftIdx < length && rightIdx < length)
  // 如果把leftIdx和rightIdx放到外面
  // 这个while条件就会忽略掉只有一个子节点的情况
  let leftIdx = this.getLeftIdx(curIdx);
  let rightIdx = this.getRightIdx(curIdx);
  let minIdx = curIdx;
  // 这里要注意边界是否超出
  if (leftIdx < length && this.minHeap[leftIdx] < this.minHeap[minIdx]) {
   minIdx = leftIdx;
  }
  if (rightIdx < length && this.minHeap[rightIdx] < this.minHeap[minIdx]) {
   minIdx = rightIdx;
  }
  if (minIdx === curIdx) {
   break;
  } else {
   const temp = this.minHeap[curIdx];
   this.minHeap[curIdx] = this.minHeap[minIdx];
   this.minHeap[minIdx] = temp;
   curIdx = minIdx;
  }
 }
};
/**
 * @param {number} val
 * @return {void}
 */
MinHeap.prototype.push = function (val) {
 this.minHeap.push(val);
 this.heapifyUp();
};

/**
 * @return {void}
 */
MinHeap.prototype.getMin = function () {
 if (this.minHeap.length === 0) return null;
 else if (this.minHeap.length === 1) return this.minHeap.pop();
 const min = this.minHeap[0];
 this.minHeap[0] = this.minHeap.pop();
 this.heapifyDown();
 return min;
};

/**
 * @return {number}
 */
MinHeap.prototype.top = function () {
 return this.minHeap.length > 0 ? this.minHeap[0] : null;
};

/**
 * Your MinHeap object will be instantiated and called as such:
 * var obj = new MinHeap()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

var obj = new MinHeap();
obj.push(-2);
obj.push(0);
obj.push(-3);
console.log(obj.top());
console.log(obj.minHeap);
```
