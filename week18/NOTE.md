丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.08.12

## dev工具

- Server
    - build: webpack babel vue jsx postcss...
    - watch: fsevent
    - mock: ...
    - http: ws
- Client
    - debugger: vscode devtool
    - source map
- 综合
    - vit

- webpack
webpack 是基于nodejs开发的

- babel

可以独立使用，也可以于webpack配合使用

三件套：@babel/core @babel/cli @babel/preset-env

- vue compiler

- watcher
    - 监听原理：node执行watcher的时候会带一个参数：inspect-brk=`${port}`,watcher启动之后，node会启动一个websocket，该websocket地址会被vscode监听，vscode和node之间有一个监听协议。
    - node启动一个dubugger的server，该server与v8在同一个进程里面，所以它能够控制v8；
    - vscode作为一个client去跟websocket通信，传递在vscode上面的调试操作和命令，v8在执行这些被命令标记的语句的时候，就会在websocket里面发送对应的事件，然后vscode这边就响应相应的状态，从而实现调试的功能。

- devtools

## 单元测试工具

- mocha
    - 是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。
- nyc
    - 检查代码测试的覆盖率

    