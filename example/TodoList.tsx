import * as React from 'react';
import { StoreInjector } from '../src';
import { secondStore, keys } from './store';

const Component = () => {
  const todoList: Array<string> = secondStore.get(keys.todoList);
  return (
    <div>
      {todoList.map(val => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};

export const TodoList = StoreInjector(secondStore, Component);
