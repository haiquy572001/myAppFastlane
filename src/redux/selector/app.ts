import {createDeepEqualSelector} from '../../common/redux/';
import {RootState} from '../../redux/store/all-reducers';

export const selectAppConfig = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => ({
    loadingApp: app.loadingApp,
    showDialog: app.showDialog,
  }),
);

export const selectAppToken = createDeepEqualSelector(
  (state: RootState) => state.app,
  app => app.token,
);
