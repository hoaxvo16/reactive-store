import { DispatchAction, Store } from '../../src';

export const store = new Store();
export const secondStore = new Store();

export const keys = {
  inputValue: 'inputValue',
  todoList: 'todoList',
  count: 'count',
};

store.applyMiddleware(
  (key: string, current: any, payload: any, type: DispatchAction) => {
    console.log(key, current, payload, type);
  }
);

secondStore.applyMiddleware(
  (key: string, current: any, payload: any, type: DispatchAction) => {
    console.log(key, current, payload, type);
  }
);

store.add(keys.inputValue, '');
store.add(keys.count, 0);
secondStore.add(keys.todoList, []);
