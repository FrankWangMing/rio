import { generate } from '@rioe/generate';

export const generateCode = (data: any) => {
  console.log('data', data);
  return generate(data);
};

