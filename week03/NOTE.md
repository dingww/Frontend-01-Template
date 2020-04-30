丁文婉 `<1067061570@qq.com>`, v1.0.1,  2020.4.30

[TOC]

## 随堂笔记

### 4.23 2020/4/23直播课-表达式、类型转换

### Expression

- 语法

  - 优先级

    - Member > New > Reference > Call > Update > 单目运算符 > 乘方 > 乘除 >加减 > 乘除 > 加减 >  移位 > 比较 > 判断相等 > 按位运算 > 逻辑运算 > 三目运算 > 逗号

    - Member

      - a.b
      - a[b]
      - foo\`string\`
      - super.b 
      - super['b']
      - new.target // 可用来判断函数是不是以new的方式调用的
      - new Foo()

    - New

      - new Foo

    - Reference（引用）

      - 由两部分组成
        - Object
        - key
      - 能力
        - delete
        - assign

    - Call

      - foo()
      - super()
      - foo().['b']
      - foo().b

    - Update

      - ++a
      - a--
      - --a
      - ++a

    - 单目运算符

      - Delete a.b
      - void foo()
      - typeof a
      - +a
      - -a
      - ~a
      - !a
      - await a

    - 乘方

      - **

    - 乘除

      - \* 、/、%

    - 加减

      - +、-

    - 移位

      - <<、>>、>>>

    - 比较

      - > \>、<、>=、<=、instanceof、in

    - 判断相等

      - ==、===、！==、！=、

    - 按位运算

      - &、^、|

    - 逻辑运算

      - &&、||

    - 三目运算

      - ？：

    - 逗号

- 类型转换

  - ![image-20200430093310320](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200430093310320.png)

Tips：

- void后面跟任何东西都返回undefined
- 乘号*是右结合运算
- 运行时角度，js有两种加法，字符串加法和数字加法
- 逻辑运算不转换数据类型
- 十进制转二进制 
  - 整数：除2取余，下面是高位
  - 小数：乘2取整，上面是高位

作业：

- StringToNumber(str, x)
- NumberToString(num, x)



## 4月25日直播课-语句对象

### RunTime

- completion record
  - [[type]]: normal、break、continue、return、throw
  - [[value]]:Types
  - [[target]]

- 简单语句
  - ExpressionStatement
  - EmptyStatement
  - DebuggerStatement
  - ThrowStatement
  - ContinueStatement
  - BreakStatement
  - ReturnStatement

### Object

- 对象的三要素
  - 唯一性、状态、行为
- Class

- Prototype
- 原则
  - 做抽象的时候，遵循“行为改变状态”的原则

推荐的书：《面向对象的分析与设计》

Object in JS

- key
  - String
  - Symbol
- value
  - data
    - [[value]]
    - writable
    - enumerable
    - configurable
  - accessor(用于描述行为)
    - set
    - get
    - enumerable
    - configurable
- 属性访问
  - 原型链
    - 最上层的对象是Object，它的原型是null
  - 继承

- Object API
  - Object.defineProperty
  - Object.create / Object.setPropertyOf / Object.getPropertyOf
  - new / class / extends （与上面那种不要混用）
  - new / function / prototype（该用法已舍弃）

Tips:

- var 最好写在函数内最前面或变量第一次出现的地方

作业：

- 根据课上老师的示范，找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性？写一篇文章，放在学习总结里。

## 课堂作业

- 对象分类

  - 宿主对象

    - 由javascript宿主环境提供，它们的运行完全由宿主环境决定，这些对象的属性，一部分来自js语言，一部分来之宿主环境
    - 分类
      - 固有的
        - 如：window、navigator
      - 用户可创建的
        - 如：用document.createElement可以创建一些 DOM 对象

  - 内置对象

    - 固有对象

      - 由标准规定，随着js运行时创建而自动创建的对象实例

      - 固有对象在任何js代码执行前就已经被创建出来

      - 所有的固有对象

        - ```
          // 查找代码
          var set = new Set();
          var objects = [
              eval,
              isFinite,
              isNaN,
              parseFloat,
              parseInt,
              decodeURI,
              decodeURIComponent,
              encodeURI,
              encodeURIComponent,
              Array,
              Date,
              RegExp,
              Promise,
              Proxy,
              Map,
              WeakMap,
              Set,
              WeakSet,
              Function,
              Boolean,
              String,
              Number,
              Symbol,
              Object,
              Error,
              EvalError,
              RangeError,
              ReferenceError,
              SyntaxError,
              TypeError,
              URIError,
              ArrayBuffer,
              SharedArrayBuffer,
              DataView,
              Float32Array,
              Float64Array,
              Int8Array,
              Int16Array,
              Int32Array,
              Uint8Array,
              Uint16Array,
              Uint32Array,
              Uint8ClampedArray,
              Atomics,
              JSON,
              Math,
              Reflect];
          objects.forEach(o => set.add(o));
          
          for(var i = 0; i < objects.length; i++) {
              var o = objects[i]
              for(var p of Object.getOwnPropertyNames(o)) {
                  var d = Object.getOwnPropertyDescriptor(o, p)
                  if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
                      if(!set.has(d.value))
                          set.add(d.value), objects.push(d.value);
                  if( d.get )
                      if(!set.has(d.get))
                          set.add(d.get), objects.push(d.get);
                  if( d.set )
                      if(!set.has(d.set))
                          set.add(d.set), objects.push(d.set);
              }
          }
    ```
          
      - 结果：共989个固有对象![image-20200430115609494](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200430115609494.png)
    
  - 原生对象
    
      - js中，能够通过语言本身的构造器创建的对象
      - js构造器分类
        - ![image-20200430111231807](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200430111231807.png)
      - 特性
        - 无法用纯 JavaScript 代码实现的，它们也无法用 class/extend 语法来继承
        - 多数使用了私有字段
        - 这些字段的使用，使得原型继承方法无法正常工作
    
    - 普通对象

- Tips
  - 任何对象只要有[[call]]私有字段，它就是一个函数对象
  - 任何对象只要有[[construct]]私有字段，它就是一个构造器对象
  - 在 ES6 之后 => 语法创建的函数仅仅是函数，它们无法被当作构造器使用

- js中无法模拟的对象

  - Bound Function对象：更原来的函数相关联，无法预知原来的函数是什么；
  - Array对象：[[length]]属性根据最大下标自动发生变化；
  - String对象：为了支持下标运算，String 的正整数属性访问会去字符串里查找；
  - Argument对象：arguments 的非负整数型下标属性跟对应的变量联动；
  - Integer-Indexed对象：跟内存块相关联，下标运算比较特殊；
  - Module Namespace对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用于 import；
  - Immutable Prototype对象作为所有正常对象的默认原型，不能再给它设置原型了。

  



