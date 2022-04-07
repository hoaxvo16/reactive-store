### Reactive store - a minimum and lightweight external store for React and React Native

### Table of contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)

   3.1 [Create new store](#create)

   3.2 [Inject store to React component](#inject)

   3.3 [Update data from store](#update)

   3.4 [Memo data from store](#memo)

   3.5 [Middleware](#middleware)

4. [Quick start](#quickstart)
5. [React 18 support](#React18)
6. [About](#about)

### Features <a name="features"></a>

- Inject external data to React hook component
- Support action to remove or update data
- Light weight
- Typedcript support

### Installation <a name="installation"></a>

```bash
yarn add @mcsheffey/reactive-store
```

or

```bash
npm install @mcsheffey/reactive-store
```

### Usage <a name="usage"></a>

#### Create a store <a name="create"></a>

```ts
import { Store } from '@mcsheffey/reactive-store';

const store = new Store();

//init data

store.add('count', 0);
```

#### Inject store to React Component <a name="inject"></a>

- Using **_StoreInjector_** to make your store binding data with React component

```ts
import { StoreInjector } from '@mcsheffey/reactive-store';

const Component = () => {
  return <div></div>;
};
export const App = StoreInjector(store, Component);
//or
export const App = StoreInjector(store, () => {
  return <div></div>;
});
```

- Many store can be inject into one Component, and two or more Component can use the same store

```ts
export const App = StoreInjector([countStore, todoStore], () => {
  return <div></div>;
});
```

#### Update or remove data from store <a name="update"></a>

- To update or remove data from store use can use store action. There are two kind of action update (update data) or remove (delete data) from store. **_Note_**: add new data to store will not trigger component rerender. This is good because data need to be declare at first time.

```ts
//this will not rerender component

store.add('blah', 'hmmm???');

//this two above will trigger component to rerender
store.update('count', count + 1);
store.remove('count');
```

#### Memo data <a name="memo"></a>

For some reason you may don't want to recreate data that extract from store every rerender, this can be achieved by using useCallback hook:

```ts
import * as React from 'react';
import { StoreInjector, Store } from '@mcsheffey/reactive-store';

const store = new Store();
store.add('count', 0);

const Component = () => {
  //Memo count 'state'
  const countMemo = React.useCallback(() => {
    return store.get('count');
  }, []);
  return <p>{countMemo()}</p>;
};

export const App = StoreInjector(store, Component);
```

#### Middleware <a name="middleware"></a>

- Middleware is a method provide by **_Store_** class, it allow you to control, debugging store behavior

- Using middleware:

```ts
import {
  DispatchAction,
  Store,
  StoreInjector,
} from '@mcsheffey/reactive-store';

export const store = new Store();

store.applyMiddleware(
  (key: string, current: any, payload: any, type: DispatchAction) => {
    console.log(key, current, payload, type);
  }
);

store.add('count', 0);
for (let i = 0; i < 2; i++) {
  const count = store.get('count');
  store.update('count', count++);
}
store.remove('count');
/*
Log:
"count" 0 undefined "add"
"count" 0 1 "update"
"count" 1 2 "update"
"count" 2 undefined "remove"
*/
```

- key: the "key" of current data
- current: current value of data with "key"
- payload: a new value that use to update data with given key
- type: an action type (add,update or remove)
- You cant abort an action by return **_false_** in middleware function

```ts
store.applyMiddleware(
  (key: string, current: any, payload: any, type: DispatchAction) => {
    //abort action if count > 5
    if (count > 5) {
      return false;
    }
  }
);

store.add('count', 0);
for (let i = 0; i < 10; i++) {
  const count = store.get('count');
  store.update('count', count++);
}
```

### Quick start <a name="quickstart"></a>

```ts
import {
  Store,
  StoreInjector,
  DispatchAction,
} from '@mcsheffey/reactive-store';

const store = new Store();

store.applyMiddleware(
  (key: string, current: any, payload: any, type: DispatchAction) => {
    console.log(key, current, payload, type);
    if (count > 5) {
      return false;
    }
  }
);

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

const App = StoreInjector(store, Component);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
```

### React 18 support <a name="React18"></a>

- See document for React version 18 [here](https://github.com/hoaxvo16/reactive-store/wiki/React-18-support)

### About <a name="about"></a>

- My inspiration to create this is from Michel Weststrate talk [React Native Talks #1 - State Management Beyond the Libraries / Michel Weststrate](https://www.youtube.com/watch?v=cPF4iBedoF0)
- If there are any issue or contribution please let me known :D
- Have good day!!!
