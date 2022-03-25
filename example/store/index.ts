import { Store } from '../../src';

export const store = new Store();
export const secondStore = new Store();

export const keys = {
  inputValue: 'inputValue',
  todoList: 'todoList',
  count: 'count',
};

store.createData(keys.inputValue, '');
store.createData(keys.count, 0);
secondStore.createData(keys.todoList, []);
