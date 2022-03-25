import { DispatchAction } from './types';

export class Store {
   dataMap: Map<string, any> = new Map();
   subscribeComponents: Array<VoidFunction> = [];

   createData(key: string, value: any) {
      if (this.dataMap.has(key)) {
         throw new Error('Data with given key already exist');
      } else {
         this.dataMap.set(key, value);
      }
   }

   dispatch(type: DispatchAction, key: string, newVal?: any) {
      switch (type) {
         case 'update':
            this.dataMap.set(key, newVal);
            break;
         case 'remove':
            this.dataMap.delete(key);
            break;
      }
      this.subscribeComponents.forEach(com => com());
   }
   get(key: string) {
      return this.dataMap.get(key);
   }

   injectComponent(triggerFunction: VoidFunction) {
      this.subscribeComponents.push(triggerFunction);
   }

   disconnect(removeFunction: VoidFunction) {
      this.subscribeComponents = this.subscribeComponents.filter(
         com => com !== removeFunction
      );
   }
}
