丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.06.04

[TOC]

# 重学CSS
## 动画
### Animation
- @keyframes定义
- animation使用
- animation属性：
    - animation-name
    - animation-duration
    - animation-timing-function
    - animation-times
    - animation-delay

- keyframes的定义
    - 

### transition
- transition属性
    - transition-property
    - transition-duration
    - transition-timing-function
        - 以时间为x轴，以要变换的属性的百分比为纵轴的曲线
    - transition-delay

### bezier曲线

keyframes：关键帧

## 颜色
### CMKY和RGB

### HSL和HSV

## 形状
- border
- box-shadow
- border-radius
- data uri + svg（能满足画各种形状的需求）

# 重学HTML
## HTML的定义：XML与SGML
- 必知实体字符
    - quot
    - amp
    - lt
    - gt

- HTML使用多个空格的方法：CSS中加上white-space: pre-wrap或pre;

### DTD与namespace
- DTD在SGML的角度定义HTML（在HTML5中不再有效）
- HTML的namespace表示HTML里能用哪些标签

## HTML标签——语义
- 使用语义化标签的原则：不确定用就不用

- aside（页面的非主体）

- main(页面主体)
    - article
        - hgroup
            - h1
            - h2
        - div

        - header
        - footer

### 合法元素
- Element: <tagname>...</tagname>
- Text: text
- Comemnt: <!-- comments -->
- DocumentType: <!Doctype html>
- ProcessingInstruction: <?a 1?> (没啥用)
- CDATA: <![CDATA[]]>

### DOM 
- Node
    - Element
    - Document
    - 
- 导航类操作
    - parentNode
    - childNodes（实时变化）
    - firstChild
    - lastChild
    - nextSibling
    - previousSibling
- 修改操作
    - appendChild
    - insertBefore
    - removeChild
    - replaceChild
- 高级操作
    - compareDocumentPosition 是一个用于比较两个节点中关系的函数
    - contains检查一个节点是否包含另一个节点的函数
    - isEqualNode 检查两个节点是否完全相同
    - isSameNode 检查两个节点是否是同一个节点，实际上在JavaScript中可以使用“===”
    - cloneNode复制一个节点，如果传入参数true，则会连同

### Events
- 同一个元素上一定是先捕获再冒泡
- 捕获：事件执行顺序是从父到子
- 冒泡：事件执行顺序是从子到父

- Tips：
    - 所有的dom操作都是W3C的标准
    - HTML多namespace共存，包括：HTML namespace、SVG namespace 和 MathML namespace

## 作业：用脑图的形式总结CSS的属性分类

![CSSProperties](./CSSProperties.jpg)























