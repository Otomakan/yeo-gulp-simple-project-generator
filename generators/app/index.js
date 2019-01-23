'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the slick ${chalk.red('generator-simplehttp')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'title',
        message: 'What is the name of your project?',
        default: "My New Project"
      },
      {
        type: 'input',
        name: 'description',
        message: 'Add some description for your Package.json if you want',
        default: "No description"
      },
      {
        type: 'list',
        name: 'style',
        message: 'Choose a preloaded stylesheet?',
        default: "No Style",
        choices: ["No Style", "Bootstrap", "Skeleton", "Bulma"]
      }
    ];

    this.answers = await this.prompt(prompts)

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {title:this.answers.title,
        description: this.answers.description,
        style: this.answers.style
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/index.html'),
      this.destinationPath('src/index.html'),
      {title:this.answers.title,
      style:this.answers.style},
    );
    this.fs.copyTpl(
      this.templatePath('src/content/next-page.html'),
      this.destinationPath('src/content/next-page.html'),
      {title:this.answers.title,
      style:this.answers.style},
    );
     this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {title:this.answers.title}
    );
      this.fs.copyTpl(
      this.templatePath('src/js/main.js'),
      this.destinationPath('src/js/main.js'),
      {title:this.answers.title}
    );

    this.fs.copyTpl(
      this.templatePath('src/styles/main.scss'),
      this.destinationPath('src/styles/main.css'),
      {title:this.answers.title}
    );
    var srcStyleFiles =[]
    switch (this.answers.style){
      
      case "Bootstrap":
        srcStyleFiles.push('bootstrapped-style.scss')
        break
      case "Skeleton":
        srcStyleFiles.push('skeleton/skeleton.css')
        srcStyleFiles.push('skeleton/normalize.css')
        break
      case "Bulma":
        srcStyleFiles.push('bulma.scss')
        break
      default:
        break
    }
    // var that = this
      srcStyleFiles.forEach((file)=>{
        this.fs.copyTpl(
          this.templatePath('src/styles/' + file),
          this.destinationPath('src/styles/' + file),
        )
      })
   

    this.fs.copyTpl(
      this.templatePath('src/assets/images/panda-cute.png'),
    this.destinationPath('src/assets/images/panda-cute.png')
    )
  }
  runNmp(){
    this.npmInstall()
  }
};
