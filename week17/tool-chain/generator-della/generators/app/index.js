var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    
    }

    async prompting(){
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Your project title'
            }
        ])
    }
    
    // writing() {
    //     const pkgJson = {
    //         dependencies: {
    //             [this.dependency.name]: '*'
    //         }
    //     };
    //     // Extend or create package.json file in destination path
    //     this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    // }

    // install() {
    //     this.npmInstall();
    // }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: this.answers.title }
        );
    }
};