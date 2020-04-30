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



### 4月25日直播课-语句对象

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

### 课堂作业

