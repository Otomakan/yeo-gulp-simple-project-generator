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
      }
    ];

    this.answers = await this.prompt(prompts)

  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {title:this.answers.title}
    );
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {title:this.answers.title}
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
      this.templatePath('src/styles/bootstrapped-style.scss'),
      this.destinationPath('src/styles/bootstrapped-style.scss'),
      {title:this.answers.title}
    );
    this.fs.copyTpl(
      this.templatePath('src/assets/images/panda-cute.png'),
    this.destinationPath('src/assets/images/panda-cute.png')
    )
  }
  runNmp(){
    this.npmInstall()
  }
};
