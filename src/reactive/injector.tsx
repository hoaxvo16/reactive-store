import React, { useState } from 'react';
import { Store } from './store';

export function StoreInjector(
  store: Store | Array<Store>,
  Component: React.FunctionComponent
) {
  return function(props: any) {
    const [, setTrigger] = useState(false);
    const mounted = React.useRef<boolean>(true);

    const injectFunc = React.useCallback(() => {
      setTrigger((prev: boolean) => !prev);
    }, []);

    React.useEffect(() => {
      if (mounted.current) {
        if (Array.isArray(store)) {
          store.forEach(s => s.injectComponent(injectFunc));
        } else {
          store.injectComponent(injectFunc);
        }
      }

      mounted.current = false;
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
