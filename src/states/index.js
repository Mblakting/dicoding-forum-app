import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { api, putAccessToken, getAccessToken } from '../utils/api';

function withLoading(dispatch, task) {
  dispatch(showLoading());
  return task().finally(() => dispatch(hideLoading()));
}

function getVoteEndpoint(voteType) {
  if (voteType === 1) return 'up-vote';
  if (voteType === -1) return 'down-vote';
  return 'neutral-vote';
}

export const asyncSetAuthUser = createAsyncThunk(
  'authUser/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      return withLoading(dispatch, async () => {
        const token = await api.login({ email, password });
        putAccessToken(token);
        return api.getOwnProfile();
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const asyncPreloadProcess = createAsyncThunk(
  'isPreload/process',
  async (_, { dispatch }) => withLoading(
    dispatch,
    async () => {
      const token = getAccessToken();
      if (!token) return null;
      return api.getOwnProfile();
    },
  ).catch(() => {
    putAccessToken('');
    return null;
  }),
);

export const asyncPopulateData = createAsyncThunk(
  'shared/populate',
  async (_, { dispatch }) => withLoading(
    dispatch,
    async () => {
      const [users, threads] = await Promise.all([
        api.getAllUsers(),
        api.getAllThreads(),
      ]);
      return { users, threads };
    },
  ),
);

export const asyncAddThread = createAsyncThunk(
  'threads/add',
  async (threadData, { dispatch, rejectWithValue }) => {
    try {
      return withLoading(dispatch, async () => api.createThread(threadData));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const asyncReceiveThreadDetail = createAsyncThunk(
  'threadDetail/receive',
  async (threadId, { dispatch }) => withLoading(
    dispatch,
    async () => api.getThreadDetail(threadId),
  ),
);

export const asyncAddComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ threadId, content }, { dispatch }) => withLoading(
    dispatch,
    async () => api.createComment({ threadId, content }),
  ),
);

export const asyncRegister = createAsyncThunk(
  'authUser/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    try {
      return withLoading(dispatch, async () => {
        await api.register({ name, email, password });
        const token = await api.login({ email, password });
        putAccessToken(token);
        return api.getOwnProfile();
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const asyncGetLeaderboards = createAsyncThunk(
  'leaderboards/receive',
  async (_, { dispatch }) => withLoading(
    dispatch,
    async () => api.getLeaderboards(),
  ),
);

export const authUserReducer = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    unsetAuthUser: () => {
      putAccessToken('');
      return null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetAuthUser.fulfilled, (state, action) => action.payload)
      .addCase(asyncRegister.fulfilled, (state, action) => action.payload)
      .addCase(asyncPreloadProcess.fulfilled, (state, action) => action.payload);
  },
});

export const isPreloadReducer = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncPreloadProcess.fulfilled, () => false)
      .addCase(asyncPreloadProcess.rejected, () => false)
      .addCase(asyncPreloadProcess.pending, () => true);
  },
});

export const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncPopulateData.fulfilled, (state, action) => action.payload.users);
  },
});

export const threadsReducer = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    toggleVote: (state, action) => {
      const { threadId, userId, voteType } = action.payload;
      const thread = state.find((t) => t.id === threadId);
      if (thread) {
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);
        if (voteType === 1) thread.upVotesBy.push(userId);
        if (voteType === -1) thread.downVotesBy.push(userId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncPopulateData.fulfilled, (state, action) => action.payload.threads)
      .addCase(asyncAddThread.fulfilled, (state, action) => [action.payload, ...state]);
  },
});

export const threadDetailReducer = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    clearThreadDetail: () => null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReceiveThreadDetail.fulfilled, (state, action) => action.payload)
      .addCase(asyncAddComment.fulfilled, (state, action) => {
        state.comments = [action.payload, ...state.comments];
      });
  },
});

export const leaderboardsReducer = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetLeaderboards.fulfilled, (state, action) => action.payload);
  },
});

export const { unsetAuthUser } = authUserReducer.actions;
export const { clearThreadDetail } = threadDetailReducer.actions;

export const asyncToggleVoteThread = (threadId, voteType) => async (dispatch, getState) => {
  const { authUser } = getState();
  if (!authUser) {
    alert('Silakan login terlebih dahulu!');
    return;
  }

  dispatch(threadsReducer.actions.toggleVote({ threadId, userId: authUser.id, voteType }));
  try {
    await api.toggleVote('threads', threadId, getVoteEndpoint(voteType));
  } catch (error) {
    alert(error.message);
    dispatch(asyncPopulateData());
  }
};
