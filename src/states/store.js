import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import {
  authUserReducer,
  isPreloadReducer,
  usersReducer,
  threadsReducer,
  threadDetailReducer,
  leaderboardsReducer,
} from './index';

export const store = configureStore({
  reducer: {
    authUser: authUserReducer.reducer,
    isPreload: isPreloadReducer.reducer,
    users: usersReducer.reducer,
    threads: threadsReducer.reducer,
    threadDetail: threadDetailReducer.reducer,
    leaderboards: leaderboardsReducer.reducer,
    loadingBar: loadingBarReducer,
  },
});
