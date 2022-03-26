export class Store {
  private dataMap: Map<string, any> = new Map();
  private subscribeComponents: Array<VoidFunction> = [];
  private throwNotFound(key: string) {
    throw new Error(`Cannot find any data with key: "${key}"`);
  }
  private throwExist(key: string) {
    throw new Error(`Data with  key "${key}" already exist`);
  }
  private notify() {
    this.subscribeComponents.forEach(trigger => trigger());
  }
  private checkExist(key: string) {
    return this.dataMap.get(key) !== undefined;
  }

  add(key: string, value: any) {
    if (this.checkExist(key)) {
      this.throwExist(key);
    } else {
      this.dataMap.set(key, value);
    }
  }

  update(key: string, val: any) {
    if (!this.checkExist(key)) {
      this.throwNotFound(key);
    } else {
      this.dataMap.set(key, val);
      this.notify();
    }
  }

  remove(key: string) {
    if (!this.checkExist(key)) {
      this.throwNotFound(key);
    } else {
      this.dataMap.delete(key);
      this.notify();
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
}
