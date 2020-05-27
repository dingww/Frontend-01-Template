丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.5.27

[TOC]

# 5月21日 浏览器工作原理--layout

## 三代布局：

- 正常流
- grid
- flex

## toy-browser实现flex布局

### 计算flex元素位置
- 第一步：了解flex工作原理，初始化变量
- 第二步：收集元素进行
  - 分行
    - 根据主轴尺寸，把元素分进行
    - 若设置了no-wrap，则强行将元素分进第一行
- 第三步：计算主轴方向
    - 找出所有flex元素
    - 把主轴方向的剩余尺寸分配给这些元素
    - 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素
- 第四步：计算交叉轴方向
  - 根据每一行中最大元素尺寸计算行高
  - 根据行高f le x-align还item-align，确定元素具体位置

### 渲染
- 第一步
  - 绘制需要依赖一个图形环境
  - 采用npm包images
  - 绘制在viewport上进行
  - 与绘制相关的属性： background-color、border、background-image等
- 第二步
  - 递归调用子元素的绘制方法，完成DOM树的绘制
  - 忽略一些不需要绘制的节点
  - 实际浏览器中，文字绘制是难点，需要依赖字体库，我们这里忽略
  - 实际浏览器中，还会对一些图层做compositiing，我们这里忽略


# 5月23日 重学CSS

## CSS总体结构

![image-20200527234230170](/Users/dingwenwan/Library/Application Support/typora-user-images/image-20200527234230170.png)

## 实验

### 收集CSS标准
  - 代码见collectCSSStandard.js

### 收集CSS属性
  - 代码见collectCSSAttributes.js