丁文婉 `<1067061570@qq.com>`, v1.0.1,  2020.4.15

[TOC]

# 第二周总结（2020.04.016～ 2020.04.23）
## 随堂笔记
### 4.16 编程语言通识

- 语言分类
  - 非形式语言
    - 中文、英文
    - C++
  - 形式语言（乔姆斯基谱系）
    - 0型，无限制文法
      - ?::=?
    - 1型，上下文相关文法
      - ?<A>?::=?<B>?
    - 2型，上下文无关文法
      - <A>::=?
    - 3型，正则文法
      - 能用正则表达式解析的文法
      - <A>::=<A>?
  
- 产生式（BNF）
  - 用尖括号括起来的名称来表示语法结构名
  - 语法结构分成基础结构和需要用复合结构
    - 基础结构称终结符
    - 复合结构称非终结符

- 其他产生式
  - ABNF
  - EBNF
  
- 练习：尽可能地寻找你知道的计算机语言，并尝试分类

- 图灵完备性
  - 命令式——图灵机
    - goto
    - if和while
  - 声明式
    - 递归
  
- 动态语言
  - 在用户设备/在线服务器上
  - 产品实际运行时
  - Runtime
  
- 静态语言
  - 在程序员的设备上
  - 产品开发时
  - compileTime
  
- 类型系统
  - 动态类型系统和静态类型系统
  - 强类型和弱类型
    - 无隐式类型转换的是强类型
  - 复合类型
    - 结构体
    - 函数签名
  - 子类型
    - 逆变/协变
  
- 一般命令式编程语言: Atom -> Expression -> Statement -> Structure -> Program 
  - Atom
    - Identifier
    - Literal
  - Expression 
    - Atom
    - Punctuator
  - Statement
    - Expression
    - Keyword
    - Punctuator
  - Structure
    - Function
    - Class
    - Process
    - Namespace
  - Program 
    - Program
    - Module
    - Package
    - Library
  
- 语法->语义->运行时

  

### 4.18 重学前端

- Tips:

  - charCodeAt 只能识别4位十六进制的字符，超过4位的十六进制的字符需要用codePointAt

  - \u转义支持字符串转义和变量名转义

  - nbsp：no break space

  - zwnbsp：no width no break space

    


- 词法
  - InputElement
    - WhiteSpace
    - Lineterminator
    - Comment
    - Token
      - Punctuator
      - Keywords
      - Identifier
        - 变量名
          - 不能与关键字重合
        - 属性
          - 可以与关键字重合
      - Literal
  - js future reserved keyword：enum
  - js 里面undefined是一个全局变量名，不是关键字，在局部作用域中可以当作变量名使用

- 数据类型
  - NUmber

    - IEEE 754
      - Sign（1）
      - Exponent（11）
      - fraction（52）
    - 浮点数比较
      - （0.1+ 0.2 -0.3） < = Number.EPSILON

  - String

    - 字符集

      - ASCII
      - Unicode
      - UCS U+0000 - U+FFFF
      - GB
        - GB2312
        - GBK(GB13000)
        - GB18030
      - ISO-8859
      - BIG5

    - Encoding

      - UTF

        - UTF8
        - UTF16

        练习：UTF8 Encoding函数

    - 引号

    - Tips

      - 只有\n,\r,\t,\b,\f这几个字符的斜杠有转义作用，其他的直接显示斜杠后面的字符
      - \r表示打印机的纸往前推一行，\n 打字机的打印头回到行首


- 答疑环节：
  - 求职：主要提高自己的 “核心竞争力”
  - 研究“为什么1.3+1.1-2.4 <= Number.EPSILON 为false” 
  - 线程是操作系统里的概念
  - 前端之外可扩展的知识体系：
    - 操作系统
    - 计算机网络
    - 数据结构
    - 算法
  - 参与开源项目
    - 从帮助修改文档开始
    - 尽量参与知名度高的项目

### 参考链接：

- 讲师提供：
  - https://home.unicode.org/
  - https://www.fileformat.info/info/unicode/
- 学员提供：
  - 计算浮点数的一个工具：[ https://github.com/camsong/blog/issues/9](https://github.com/camsong/blog/issues/9)
- 有助于你理解的知识：
  - 正则表达式：[ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
  - 揭秘 0.1 + 0.2 != 0.3 https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/
  - ASCII，Unicode 和 UTF-8 ：[ http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

### 参考名词：

- [字符集](https://zh.wikipedia.org/zh/字符编码)：字符编码（英语：Character encoding）、字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和 ASCII。其中，ASCII 将字母、数字和其它符号编号，并用 7 比特的二进制来表示这个整数。通常会额外使用一个扩充的比特，以便于以 1 个字节的方式存储。在计算机技术发展的早期，如 ASCII（1963 年）和 EBCDIC（1964 年）这样的字符集逐渐成为标准。但这些字符集的局限很快就变得明显，于是人们开发了许多方法来扩展它们。对于支持包括东亚 CJK 字符家族在内的写作系统的要求能支持更大量的字符，并且需要一种系统而不是临时的方法实现这些字符的编码。
- [Unicode ](https://zh.wikipedia.org/zh-hans/Unicode)：中文：万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。
- [ASCII ](https://zh.wikipedia.org/wiki/ASCII)：（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。
- Token：记号、标记。JS 里有效的输入元素都可以叫 Token。
- [NBSP ](https://zh.wikipedia.org/wiki/不换行空格)：不换行空格（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：U+00A0 no-break space。
- [零宽空格](https://zh.wikipedia.org/zh-hans/零宽空格)：（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。

### 个人总结

- 以前遇到不懂的总习惯性地谷歌或百度，这次遇到的几个问题，上网查的时候都没有找到想要的答案，结果都是在ecma262文档里面找到答案的，突然想起winter在直播课上说的要文档不离手，现在深感认同。不要排斥英文，不要总想着找捷径，多看标准官方文档脚踏实地才是正确的学习姿势。
- 经过本周直播课的学习，对计算机语言有了更广泛的认识，也激发了我对编程的兴趣。另外，通过这次随堂作业，对正则表达式各种规则也更加熟悉。