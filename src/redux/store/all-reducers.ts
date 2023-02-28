import {appReducer} from '../action-slice';
import {combineReducers} from '@reduxjs/toolkit';

export const allReducer = combineReducers({
  app: appReducer,
});

export type RootState = ReturnType<typeof allReducer>;
