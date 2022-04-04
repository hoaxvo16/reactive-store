import { MiddlewareCallback } from '../../types';

export class BaseStore {
  protected dataMap: Map<string, any> = new Map();
  protected subscribeComponents: Array<VoidFunction> = [];
  protected middlewareHandler: MiddlewareCallback | null = null;

  protected throwNotFound(key: string) {
    throw new Error(`Cannot find any data with key: "${key}"`);
  }

  protected throwExist(key: string) {
    throw new Error(`Data with  key "${key}" already exist`);
  }

  protected notify() {
    this.subscribeComponents.forEach(trigger => trigger());
  }

  protected checkExist(key: string) {
    return this.dataMap.get(key) !== undefined;
  }
}
