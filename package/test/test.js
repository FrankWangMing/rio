// module.exports =;


import * as plop from 'plop'


// // const plop = await import('plop').then((module) => module.default);

// console.log(plop)
function a() {

  // const plop = Plop;
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
        path: 'ss/components/{{pascalCase name}}.jsx',
        templateFile: 'component.hbs',
      },
    ],
  });
}

a()