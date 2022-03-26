![](https://i.ibb.co/6B4bhX7/Vector.png)

### Reactive store - a minimum and lightweight external store for react

#### Feature

- Inject external data to React component
- Support action to remove or update data

### Installation

```bash
yarn add @mcsheffey/reactive-store
```

or

```bash
npm install @mcsheffey/reactive-store
```

#### Usage

- Create a store

```ts
import { Store } from '@mcsheffey/reactive-store';

const store = new Store();
const secondStore = new Store();

const keys = {
  inputValue: 'inputValue',
  todoList: 'todoList',
  count: 'count',
};

store.add(keys.inputValue, '');
store.add(keys.count, 0);
secondStore.add(keys.todoList, []);
```

- Inject store to Component using **_StoreInjector_**

```ts
export const App = StoreInjector([store, secondStore], Component);
```

- Dispatch an action. There are two kind of action update (update data) or remove (delete data) from store

```ts
store.update(keys.count, count + 1);
store.remove(keys.count);
```

#### Full code example

```ts
import './styles.css';
import { Store, StoreInjector } from '@mcsheffey/reactive-store';

const store = new Store();
const secondStore = new Store();

const keys = {
  inputValue: 'inputValue',
  todoList: 'todoList',
  count: 'count',
};
/*Add data to store*/
store.add(keys.inputValue, '');
store.add(keys.count, 0);
secondStore.add(keys.todoList, []);

const Component = () => {
  /*Get data from store */
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
```

![](https://media0.giphy.com/media/sSOY7TBeXWHa7zMK6z/giphy.gif?cid=790b7611556fb5a72472855e96dc1581e537a6a7291be6dc&rid=giphy.gif&ct=g)
