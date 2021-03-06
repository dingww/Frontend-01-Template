丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.5.20

[TOC]

# 5月14日直播--HTML解析

## 有限状态机处理字符串

- 有限状态机
  - 每一个状态都是一个机器
  - 每一个机器知道下一个状态
    - 每个机器都有确定的下一个状态(Moore)
    - 每个机器根据输入决定下一个状态（mealy）

## 解析html

## 进程

![image-20200522101007953](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200522101007953.png)


- 步骤

  1. 为了方便文件管理，我们把parser单独拆到文件中，parser接受HTML文本作为参数，返回一刻DOM树；

  2. 创建状态机

     - 用FSM（有限状态机）来实现HTML的分析；
     - 在HTML标准中，已经规定了HTML的状态；
     - Toy-browser只挑选其中一部分状态，来完成一个最简版的浏览器；

  3. 解析标签

     - 主要的标签有：开始标签、结束标签和自封闭标签；
     - 这一步暂时忽略属性；

  4. 创建元素

     - 在状态机中，处理状态迁移，还要加入业务逻辑；
     - 在标签结束状态提交token；

  5. 处理属性

     - 属性值分为单引号、双引号和无引号3种写法，因此需要较多状态处理；
     - 处理属性的方式跟标签类似；
     - 属性结束时，把属性加到标签Token上；

  6. 构建DOM树

     - 从标签构建DOM树的基本技巧是使用栈；
     - 遇到开始标签时创建元素并入栈，遇到结束标签时出栈；
     - 自封闭节点可视为入栈后立即出栈；
     - 任何元素的父元素是它入栈前的栈顶

  7. 文本节点

     - 文本节点与自封闭标签处理类似
     - 多个文本节点需要合并。

     

# 5月16日直播--CSS解析
## 进程

![image-20200522101052057](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200522101052057.png)


## 解析css

- 步骤

  1. 收集css规则

     - 遇到style标签时，把css规则保存起来；
     - 用css parser（第三方库）来分析css规则；

  2. 添加调用：

     - 当创建一个元素后立即计算css；
     - 理论上当我们分析一个元素时，所有的css规则已收集完毕；
     - 真实的浏览器可能会遇到写在body里的style标签，需要重新计算css，toy browser忽略此种情况；
       - tips
         - 重新计算css可能会导致重排和重绘
         - 最佳实践是所有的css标签写在body之前

  3. 计算css：

     - 收集完所有的规则才开始进行css计算；

     - 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配；
     - 可以通过上一级stack获取本元素的所有父元素；
     - 因为首先获取的是当前元素，故获得和计算父元素匹配顺序是由内向外的；

  4. 拆分选择器：

     - 选择器也要从当前元素向外排列；
     - 复杂选择器拆分成单个元素的选择器，用循环匹配父元素队列

  5. 计算选择器与元素匹配

     - 根据选择器类型和元素的属性，判断是否与当前元素是否匹配
     - 课程里面只实现了3种选择器，实际浏览器需要处理复合选择器

  6. 生成computed属性

     - 一旦选择匹配，就应用选择器到元素上，形成computedStyle

  7. 确定规则的覆盖关系

     - css规则根据specificity和后来优先规则覆盖；
     - specificity是个四元组，越左边权重越高
     - 一个css规则的specificity根据包含的简单选择器相加而成

  