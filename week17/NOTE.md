丁文婉 `<1067061570@qq.com>`, v1.0.0,  2020.08.01

## 工具链

- IDE
    - vscode
    - webstorm
- init
    - yeoman: generator 的 generator
    - vue-cli
    - create-react-app
    - angular-cli
- development/debug
    - webpack
    - mock
    - devtool/chrome
    - wireshark
    - charles
    - vite
- test
    - mocha
    - jest
- production
    - lint
    - jenkins
- 代码托管
    - git
    - svn
    
## 用yeoman做一个generator


## 用闭包实现递归

```javascript
(g => 
    (f => f(f))(
        self => g((...args) => self(self).apply(this, args))
    )
)(
    self => {
        return n => n > 0 ? self(n-1) + n : 0
    }
)(100)

// 等价于：

var y = g => (f => f(f))(self => g((...args) => self(self).apply(this, args)));

var f = y(self => n => n > 0 ? self(n-1) + n : 0);

f(100);

```



