import * as React from 'react';
import { StoreInjector } from '../src';
import { secondStore, keys } from './store';

interface IReturnValue {
  list: () => Array<string>;
}

const Component = () => {
  const todoList: IReturnValue['list'] = React.useCallback(() => {
    return secondStore.get(keys.todoList);
  }, []);
  return (
    <div>
      {todoList().map(val => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export const TodoList = StoreInjector(secondStore, Component);
