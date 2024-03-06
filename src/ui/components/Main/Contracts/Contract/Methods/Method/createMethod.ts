import { v4 } from 'uuid';

export const createMethod = (append: any) =>
  append({
    methodId: v4(),
    methodName: '',
  });
