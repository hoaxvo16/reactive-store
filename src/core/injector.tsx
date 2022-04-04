import React from 'react';
import { Store } from './store/store';

export function StoreInjector(
  store: Store | Array<Store>,
  Component: React.FunctionComponent
) {
  return function(props: any) {
    const [, setTrigger] = React.useState(false);

    const injectFunc = React.useCallback(() => {
      setTrigger((prev: boolean) => !prev);
    }, []);

    React.useEffect(() => {
      if (Array.isArray(store)) {
        store.forEach(s => s.injectComponent(injectFunc));
      } else {
        store.injectComponent(injectFunc);
      }

      return () => {
        if (Array.isArray(store)) {
          store.forEach(s => s.disconnect(injectFunc));
        } else {
          store.disconnect(injectFunc);
        }
      };
    }, [store, injectFunc]);
    return Component(props);
  };
}
