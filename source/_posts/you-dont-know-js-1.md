---
title: you-dont-know-js-1
date: 2024-03-29 17:10:42
tags:
---
## 你不知道的JavaScript-上

### 1.作用域是什么

**作用域是一套规则，用于确定在何处以及如何查找变量（标识符）。**如果查找的目的是对变量进行赋值，那么就会使用LHS查询；如果目的是获取变量的值，就会使用RHS查询。赋值操作符会导致LHS查询。＝操作符或调用函数时传入参数的操作都会导致关联作用域的赋值操作。

不成功的RHS引用会导致抛出ReferenceError异常。不成功的LHS引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用LHS引用的目标作为标识符，或者抛出ReferenceError异常（严格模式下）。

### 2.词法作用域

**词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。**编译的词法分析阶段基本能够知道全部标识符在哪里以及是如何声明的，从而能够预测在执行过程中如何对它们进行查找。

### 3.函数作用域和块作用域

#### IIFE（Immediately Invoked Function Expression）

立即执行函数表达式

```javascript
(function() {
  /**
   * function content
   */
})()
```

函数是JavaScript中最常见的作用域单元。本质上，声明在一个函数内部的变量或函数会在所处的作用域中“隐藏”起来，这是有意为之的良好软件的设计原则。

### 4.提升

我们习惯将var a = 2;看作一个声明，而实际上JavaScript引擎并不这么认为。它将var a和a = 2当作两个单独的声明，第一个是编译阶段的任务，而第二个则是执行阶段的任务。

声明本身会被提升，而包括函数表达式的赋值在内的赋值操作并不会提升。

### 5.作用域闭包

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

> 当函数可以记住并访问所在的词法作用域，即使函数是在当前词法作用域之外执行，这时就产生了闭包。

### 6.This

之前我们说过this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。this的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this就是记录的其中一个属性，会在函数执行的过程中用到。

学习this的第一步是明白this既不指向函数自身也不指向函数的词法作用域，你也许被这样的解释误导过，但其实它们都是错误的。this实际上是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用。

### 7.This全面解析

#### 绑定规则

1. 默认绑定

    ```javascript
    function foo() {
      console.log(this.a)
    }

    var a = 2;
    foo()
    ```

    在代码中，foo()是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。如果使用严格模式（strict mode），那么全局对象将无法使用默认绑定，因此this会绑定undefined。

1. 隐式绑定

    ```javascript
    function foo() {
      console.log( this.a );
    }
    var obj = {
      a: 2,
      foo: foo
    };
    obj.foo(); // 2
    ```

    对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
    **隐式丢失**
    一个最常见的this绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默认绑定，从而把this绑定到全局对象或者undefined上，取决于是否是严格模式。

1. 显式绑定
    硬绑定
    > call、apply、bind方法
    API调用的“上下文”

    ```javascript
    function foo(el) {
      console.log( el, this.id );
    }
    var obj = {
      id: "awesome"
    };
    // 调用foo(..)时把this绑定到obj
    [1, 2, 3].forEach( foo, obj );
    // 1 awesome 2 awesome 3 awesome
    ```

1. new绑定

    使用new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

    - 创建（或者说构造）一个全新的对象。
    - 这个新对象会被执行[[ 原型]] 连接。
    - 这个新对象会绑定到函数调用的this。
    - 如果函数没有返回其他对象，那么new 表达式中的函数调用会自动返回这个新对象。

#### 优先级

默认绑定 < 隐式绑定 < 显示绑定 < new绑定

#### 判断规则

如果要判断一个运行中函数的this绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断this 的绑定对象。

1. 由new调用？绑定到新创建的对象。
1. 由call或者apply（或者bind）调用？绑定到指定的对象。
1. 由上下文对象调用？绑定到那个上下文对象。

一定要注意，有些调用可能在无意中使用默认绑定规则。如果想“更安全”地忽略this绑定，你可以使用一个DMZ对象，比如 ø = Object.create(null)，以保护全局对象。
ES6中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定this，具体来说，箭头函数会继承外层函数调用的this绑定（无论this绑定到什么）。这其实和ES6之前代码中的self = this机制一样。

### 8.对象

String
Number
Undefined
Null
Function
Object
Symbol

#### 不变性

1. 对象常量
      结合writable:false和configurable:false就可以创建一个真正的常量属性（不可修改、重定义或者删除）
1. 禁止扩展
      Object.preventExtensions(..)
1. 密封
      Object.seal(..)会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..)并把所有现有属性标记为configurable:false。所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值） 。
1. 冻结
      Object.freeze(..)会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..)并把所有“数据访问”属性标记为writable:false，这样就无法修改它们的值。这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改（不过就像我们之前说过的，这个对象引用的其他对象是不受影响的）。你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用Object.freeze(..)，然后遍历它引用的所有对象并在这些对象上调用Object.freeze(..)。但是一定要小心，因为这样做有可能会在无意中冻结其他（共享）对象。

### 9. 混合对象“类”

#### 寄生继承

```javascript
// “传统的JavaScript类”Vehicle
function Vehicle() {
  this.engines = 1;
}
Vehicle.prototype.ignition = function() {
  console.log( "Turning on my engine.");
};
Vehicle.prototype.drive = function() {
  this.ignition();
  console.log( "Steering and moving forward!" );
};
// “寄生类” Car
function Car() {
  // 首先，car是一个Vehicle
  var car = new Vehicle();
  // 接着我们对car进行定制
  car.wheels = 4;
  // 保存到Vehicle::drive()的特殊引用
  var vehDrive = car.drive;
  // 重写Vehicle::drive()
  car.drive = function() {
    vehDrive.call( this );
    console.log("Rolling on all " + this.wheels + " wheels!");
  }
  return car;
}
var myCar = new Car();
```

#### 隐式混入

```javascript
var Something = {
  cool: function() {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  }
};
Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1
var Another = {
  cool: function() {
    // 隐式把Something混入Another
    Something.cool.call(this);
  }
};
Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1 （count不是共享状态）
```

多态（在继承链的不同层次名称相同但是功能不同的函数）看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。

### 9.原型

下面我们分析一下如果foo不直接存在于myObject中而是存在于原型链上层时myObject.foo = "bar"会出现的三种情况。

1. 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性（参见第3章）并且没有被标记为只读（writable:false），那就会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性。
1. 如果在[[Prototype]]链上层存在foo，但是它被标记为只读（writable:false），那么无法修改已有属性或者在myObject上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。
1. 如果在[[Prototype]]链上层存在foo并且它是一个setter（参见第3章），那就一定会调用这个 setter。foo不会被添加到（或者说屏蔽于）myObject，也不会重新定义foo这个setter。

#### 对象关联

现在我们知道了，[[Prototype]]机制就是存在于对象中的一个内部链接，它会引用其他对象。通常来说，这个链接的作用是：如果在对象上没有找到需要的属性或者方法引用，引擎就会继续在 [[Prototype]] 关联的对象上进行查找。同理，如果在后者中也没有找到需要的引用就会继续查找它的[[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

## 10.行为委托

在软件架构中你可以选择是否使用类和继承设计模式。大多数开发者理所当然地认为类是唯一（合适）的代码组织方式，但是本章中我们看到了另一种更少见但是更强大的设计模式：行为委托。

行为委托认为对象之间是兄弟关系，互相委托，而不是父类和子类的关系。JavaScript的[[Prototype]]机制本质上就是行为委托机制。
