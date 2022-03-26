![](https://i.ibb.co/6B4bhX7/Vector.png)

### Reactive store - a minimum and lightweight external store for react

#### Feature

- Inject external data to React component
- Support dispatch action to remove or update data

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
const store = new Store();
const secondStore = new Store();

const keys = {
  inputValue: "inputValue",
  todoList: "todoList",
  count: "count"
};
- Add data to store
store.createData(keys.inputValue, "");
store.createData(keys.count, 0);
secondStore.createData(keys.todoList, []);
```

- Inject store to Component using **_StoreInjector_**

```ts
export const App = StoreInjector([store, secondStore], Component);
```

- Dispatch an action. There are two kind of action update (update data) or remove (delete data) from store

```ts
store.dispatch("update", keys.count, count + 1)}
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

store.createData(keys.inputValue, '');
store.createData(keys.count, 0);
secondStore.createData(keys.todoList, []);

const Component = ({ name }: any) => {
  const todoList: Array<string> = secondStore.get(keys.todoList);
  const todoName: string = store.get(keys.inputValue);
  const count: number = store.get(keys.count);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <p>count: {count}</p>
      <input
        placeholder="enter todo name"
        onChange={(e: any) =>
          store.dispatch('update', keys.inputValue, e.target.value)
        }
      />
      <button
        onClick={() =>
          secondStore.dispatch('update', keys.todoList, [...todoList, todoName])
        }
      >
        Add todo
      </button>
      <button onClick={() => store.dispatch('update', keys.count, count + 1)}>
        +
      </button>
      <p>{name}</p>
      <p>{todoName}</p>
      {todoList.map(val => (
        <p key={val}>{val}</p>
      ))}
    </div>
  );
};
export const App = StoreInjector([store, secondStore], Component);
```

![](https://media0.giphy.com/media/sSOY7TBeXWHa7zMK6z/giphy.gif?cid=790b7611556fb5a72472855e96dc1581e537a6a7291be6dc&rid=giphy.gif&ct=g)
