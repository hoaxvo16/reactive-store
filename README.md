![](https://i.ibb.co/6B4bhX7/Vector.png)

### Reactive store - a minimum and lightweight external store for react

### Table of contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Quick start](#quickstart)
5. [React 18 support](#React18)
6. [About](#about)

### Features <a name="features"></a>

- Inject external data to React hook component
- Support action to remove or update data
- Light weight

### Installation <a name="installation"></a>

```bash
yarn add @mcsheffey/reactive-store
```

or

```bash
npm install @mcsheffey/reactive-store
```

### Usage <a name="usage"></a>

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

- Memo data:
  For some reason you may don't want to recreate data that extract from store every rerender, this can be achieved by using useCallback hook:

```ts
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
```

### Quick start <a name="quickstart"></a>

```ts
import { Store, StoreInjector } from '@mcsheffey/reactive-store';

const store = new Store();

const keys = {
  count: 'count',
};
/*Add data to store*/
store.add(keys.count, 0);

const Component = () => {
  /*Get data from store */
  const count: number = store.get(keys.count);
  return (
    <div className="App">
      <button onClick={() => store.update(keys.count, count + 1)}>+</button>
    </div>
  );
};

const App = StoreInjector([store, secondStore], Component);

const rootElement = document.getElementById('root');
ReactDOM.render(<App name="hoa" />, rootElement);
```

![](https://media0.giphy.com/media/sSOY7TBeXWHa7zMK6z/giphy.gif?cid=790b7611556fb5a72472855e96dc1581e537a6a7291be6dc&rid=giphy.gif&ct=g)

### React 18 support <a name="React18"></a>

- See document for React version 18 [here](https://github.com/hoaxvo16/reactive-store/wiki/React-18-support)

### About <a name="about"></a>

- My inspiration to create this is from Michel Weststrate talk [React Native Talks #1 - State Management Beyond the Libraries / Michel Weststrate](https://www.youtube.com/watch?v=cPF4iBedoF0)
- If there are any issue or contribution please let me known :D
- Have good day!!!
