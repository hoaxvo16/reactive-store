import { Store } from '../../src';

export const store = new Store();
export const secondStore = new Store();

export const keys = {
  inputValue: 'inputValue',
  todoList: 'todoList',
  count: 'count',
};

store.add(keys.inputValue, '');
store.add(keys.count, 0);
secondStore.add(keys.todoList, []);
