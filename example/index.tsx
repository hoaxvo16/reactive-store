import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StoreInjector } from '../src';
import { TodoList } from './TodoList';
import { keys, secondStore, store } from './store';

const Component = ({ name }: any) => {
  const todoList: Array<string> = secondStore.get(keys.todoList);
  const todoName: string = store.get(keys.inputValue);
  const count: number = store.get(keys.count);
  const [mount, setMount] = React.useState(true);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>count: {count}</p>
      <input
        placeholder="enter todo name"
        onChange={(e: any) => store.update(keys.inputValue, e.target.value)}
      />
      <button
        onClick={() =>
          secondStore.update(keys.todoList, [...todoList, todoName])
        }
      >
        Add todo
      </button>

      <button onClick={() => store.update(keys.count, count + 1)}>+</button>
      <button onClick={() => setMount(!mount)}>
        {mount ? 'Unmount todo list' : 'Mount todo list'}
      </button>
      <p>{name}</p>
      <h1>Todo list</h1>
      <p>{todoName}</p>
      {mount ? <TodoList /> : <p>Hey</p>}
    </div>
  );
};

const App = StoreInjector([store, secondStore], Component);

const rootElement = document.getElementById('root');
ReactDOM.render(<App name="hoa" />, rootElement);
