丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.5.6

[TOC]

# 4月30日直播课--重学 JavaScript | 结构化

## 事件循环

### 宏任务
- 由宿主环境提供的api
- 如：script、ui交互、setTimeout、setInterval都是宏任务
### 微任务
- 由js引擎提供的api

### Tips
- js所有的代码都可以看作微任务，只是哪些微任务聚合成宏任务
- 一个宏任务里面的同步代码最先执行，微任务根据入队先后按顺序进行执行

```
 async function async1() {
      console.log('async1 start'); // 同步代码
      await async2(); // await 后面的语句，效果与then回调类似，会插入到微任务队列
      console.log('async1 end'); //第一个微任务
  }
  async function async2() {
      console.log('async2'); // 同步代码
  }
  async1();
  new Promise(function (resolve) {
      console.log('promise1'); // 同步代码
      resolve();
  }).then(function () {
      console.log('promise2'); //第二个微任务
  });
  
  结果：async1 start、async2、promise1、async1 end、promise2
```