export enum SLICE_NAME {
  APP = 'APP_',
  AUTHENTICATION = 'AUTHENTICATION_',
}

export type ActionBase<T = any> = {
  type: string;
  payload?: T;
};
