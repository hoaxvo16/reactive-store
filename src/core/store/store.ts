import { DispatchAction, MiddlewareCallback } from '../../types';
import { BaseStore } from './base-store';

export class Store extends BaseStore {
  constructor() {
    super();
  }
  private runMiddleware(
    key: string,
    current: any,
    payload: any,
    type: DispatchAction
  ) {
    if (this.middlewareHandler) {
      const notAbort = this.middlewareHandler(key, current, payload, type);
      return notAbort;
    }
    return true;
  }

  private handleDispatchAction(
    type: DispatchAction,
    key: string,
    payload?: any
  ) {
    switch (type) {
      case 'add':
        if (this.runMiddleware(key, undefined, payload, 'add') !== false) {
          this.dataMap.set(key, payload);
        }
        break;
      case 'update':
        if (
          this.runMiddleware(key, this.dataMap.get(key), payload, 'update') !==
          false
        ) {
          this.dataMap.set(key, payload);
          this.notify();
        }
        break;
      case 'remove':
        if (
          this.runMiddleware(
            key,
            this.dataMap.get(key),
            undefined,
            'remove'
          ) !== false
        ) {
          this.dataMap.delete(key);
          this.notify();
        }
        break;
    }
  }

  add(key: string, value: any) {
    if (this.checkExist(key)) {
      this.throwExist(key);
    } else {
      this.handleDispatchAction('add', key, value);
    }
  }

  update(key: string, value: any) {
    if (!this.checkExist(key)) {
      this.throwNotFound(key);
    } else {
      this.handleDispatchAction('update', key, value);
    }
  }

  remove(key: string) {
    if (!this.checkExist(key)) {
      this.throwNotFound(key);
    } else {
      this.handleDispatchAction('remove', key);
    }
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

  applyMiddleware(callback: MiddlewareCallback) {
    this.middlewareHandler = callback;
  }
}
