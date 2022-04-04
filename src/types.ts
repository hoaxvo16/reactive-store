export type DispatchAction = 'update' | 'remove' | 'add';

export type MiddlewareCallback = (
  key: string,
  current: any,
  payload: any,
  type: DispatchAction
) => void | boolean;
