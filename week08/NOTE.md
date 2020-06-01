丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.6.1

[TOC]

# 5月28日 重学CSS

## 选择器语法

### 简单选择器

- *
- div svg|a (命名空间下的选择器)
- .cls
- #id
- [attr=value]
- :hover
- ::before

### 复合选择器

- 由简单选择器无缝（空格）连接的
- *或div必须写在前面

### 复杂选择器

- 复合选择器由 空格、>、 ~、\+、|| 连接组成复杂选择器 （复合选择器之间有父子/子孙关系）

### CSS优先级

- 优先级四元组
  - [内联选择器个数，id选择器个数，class选择器/属性选择器个数，标签选择器个数]，左边权重更高；
  - :not()不参与优先级计算

### 伪类

- 链接/行为
  - :any-link
  - :link :visited
  - :hover
  - :active
  - :focus
  - :target
- 数结构
  - :empty
  - :nth-child()
  - :nth-last-child()
  - :first-child :last-child :only-child
- 逻辑类
  - :not伪类
  - :where :has
- Tips
  - a不加href属性就不是超链接
  - :nth-last-child()、:last-child、 :only-child会导致回溯，不推荐用



### 伪元素

- \<::before/\>、\<:after/\>

- \<::first-letter\>\<:first-letter/\>

- \<::first-line\>\<:first-line/\>

- first-line可用属性

  - font系列
  - color系列
  - background
  - word-spacing
  - Letter-spacing
  - Text-decoration
  - text-transform
  - Line-height

- First-letter可用属性

  - ont系列
  - color系列
  - background
  - word-spacing
  - Letter-spacing
  - Text-decoration
  - text-transform
  - Line-height
  - float
  - vertical-align
  - 盒模型属性：margin、padding、border

  作业： 编写一个match函数

  function match(selector, element){

  }

  match("div #id.class", document.getElementById('id'));

  作业完成情况见match.html


# 5月30日 重学CSS-排版



源代码-标签（Tag）

语义-元素（Element）

表现-盒（Box）

DOM树中存储的是元素和其他类型的节点（如：文本节点、注释等）

CSS选择器选中的是元素

CSS选择器选中的元素，再排版时可能产生多个盒

排版和渲染的基本单位是盒



## 盒模型

- Box-sizing: content-box
  - width = contenWIdth
- Box-sizing: border-box
  - width = contentWidth + padding + border
- 思考：为什么没有margin-box

![image-20200530191527063](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200530191527063.png)



## 正常流

- 正常流排版
  - 收集盒进行
  - 计算盒在行中的排布
  - 计算行的排布
- 正常流的行模型

tips：

- inline-block 要配合vertical-align使用，通常把vertical-align设为top或bottom；
- 如果一行的有子元素的高度大于line-height，行高为最大元素的高度；
- Display:inline-block, 对两个元素之间的空格会生效，导致出现空白边；
-  Block-level boxes that are also block containers are called block boxes



## BFC（块级格式上下文）

- 什么情况会产生BFC
  - 能容纳正常流的元素都会产生BFC，除overflow：visible外；
- Block-level boxes：flex、table、grid、block
  - 表示可以被放入bfc
- block containers: block、inline-block
  - 表示可以容纳bfc
- block boxes：block
  - block-level && block-container
  - block box 如果 overflow 是 visible， 那么就跟父bfc合并

## margin折叠

- 边距折叠只会发生在一个BFC内的上下方向;
- BFC与BFC之间不会产生边距折叠。