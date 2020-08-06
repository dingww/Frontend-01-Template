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
    
## yeoman

### yeoman的使用

yeoman是生成generator（类似于生成create-react-app、vue-cli之类）的generator工具，接下来我们参考[yeoman官网](https://yeoman.io/authoring/index.html)，用yeoman创建一个generator来学习yeoman的使用。

- 首先全局安装yeoman：

```
yarn global add yo
```

- 创建一个generator项目目录，目录名称为generator-name格式，name为项目名，我的项目名是della，所以此处目录名为generator-della。

- `yarn init`初始化generator-della，全部使用默认配置。进入generator-della项目目录，安装yeoman-generator，此处yeoman-generator不需要全局安装，也不需要save。

```
cd generator-della
yarn add yeoman-generator
```

- 然后在当前目录下创建一个generators文件夹，再在generators里面创建一个app目录和一个router目录，分别为这两个目录添加index.js文件。generator-della目录如下：

```
├───generator-della
    ├───node_modules
    ├───package.json
    └───generators/
        ├───app/
        │   └───index.js
        └───router/
            └───index.js
```

- 在当前目录下执行`npm link`，将generator-della这个项目软链接到本地node_modules里面，就相当于在全局安装了generator-della包，可供全局使用。

- 在app下创建一个template/index.html模版文件，模版内容为：

```
<html>
  <head>
    <title><%= title %></title>
  </head>
</html>
```

- 在app/index.js中添加以下内容：

```
var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }
    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: this.answers.title }
        );
    }
};
```

- 接下来在generator-della项目外面创建一个della-app目录，然后`cd della-app`到该目录下，执行`yo della（项目名）`，就可以在della-app这个项目中创建一个public/index.html文件。执行`yo della`其实就是执行generator-della项目的app/index.js里面的内容，执行的方式是从上往下顺次执行。到此，就已经学会了yeoman的基本用法。

### yeoman的底层实现--命令行操作
具体代码见console-toolkit/index.js

## 用闭包可代替递归

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

var y = g => (f => f(f))(self => g((...args) => self(self).apply(this, args))); // y-combinator

var f = y(self => n => n > 0 ? self(n-1) + n : 0);

f(100);

```



