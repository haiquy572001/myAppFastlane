import {configureStore} from '@reduxjs/toolkit';
import {allReducer} from '../store/all-reducers';

/**
 * Use this instead storage of reduxPersist
 * import {persistStore, persistReducer} from 'redux-persist';
 * import {reduxPersistStorage} from '@utils';
 * const persistedReducer = persistReducer(
 *   {key: 'root', storage: reduxPersistStorage},
 *   allReducer,
 * );
 */

const devMode = __DEV__;

export const store = configureStore({
  reducer: allReducer,
  devTools: devMode,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
/**
 * export const persistore = persistStore(store);
 */
