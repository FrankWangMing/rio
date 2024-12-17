module.exports = function (plop) {
    plop.setGenerator('component', {
      description: 'Create a new React component',
      prompts: [
        {
          type: 'input',
          name: 'name',
          message: 'Component name:',
        },
      ],
      actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}.jsx',
          templateFile: 'component.hbs',
        },
      ],
    });
  };
