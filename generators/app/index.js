var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
      // Calling the super constructor is important so our generator is correctly set up
      super(args, opts);
  
      // Next, add your custom code
      this.option('babel'); // This method adds support for a `--babel` flag
    }

    method1() {
      this.log('method 1 just ran');
    }
    
    method2() {
      this.log('method 2 just ran');
    }

    async prompting() {
      const self = this;
      self.answers = await self.prompt([{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: self.appname, // Default to solution folder name
      }, {
        type: 'list',
        name: 'license',
        message: 'What license should be used?',
        choices: ['UNLICENSED', 'MIT'],
        default: 'MIT',
      }, {
        type: 'confirm',
        name: 'travis',
        message: 'Would you like to enable a travis build?',
        default: true,
      }
      ]);
  }

     writing() {
      const self = this;
      self.fs.copy(
          self.templatePath('.eslintignore'),
          self.destinationPath('.eslintignore'),
      );

      self.fs.copyTpl(
        self.templatePath('README.md'),
        self.destinationPath('README.md'),
        { name: self.answers.name, description: self.answers.description    },
      );
    }

    

  };