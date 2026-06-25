import {
  describe, it, expect, vi, beforeEach,
} from 'vitest';
import {
  asyncSetAuthUser, asyncPopulateData, asyncAddThread, asyncGetLeaderboards,
} from './index';
import { api } from '../utils/api';

vi.mock('../utils/api');

describe('Thunks Test', () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    dispatch.mockClear();
    vi.clearAllMocks();
  });

  it('1. asyncSetAuthUser memanggil api.login dan api.getOwnProfile', async () => {
    api.login.mockResolvedValue('dummy_token');
    api.getOwnProfile.mockResolvedValue({ id: 1, name: 'John' });

    await asyncSetAuthUser({ email: 'test@test.com', password: '123' })(dispatch, getState, undefined);

    expect(api.login).toHaveBeenCalled();
    expect(api.getOwnProfile).toHaveBeenCalled();
  });

  it('2. asyncPopulateData memanggil getAllUsers dan getAllThreads', async () => {
    api.getAllUsers.mockResolvedValue([{ id: 1, name: 'User1' }]);
    api.getAllThreads.mockResolvedValue([{ id: 1, title: 'Thread1' }]);

    await asyncPopulateData()(dispatch, getState, undefined);

    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
  });

  it('3. asyncAddThread memanggil api.createThread', async () => {
    const threadData = { title: 'T', body: 'B', category: 'C' };
    api.createThread.mockResolvedValue({ id: 1, ...threadData });

    await asyncAddThread(threadData)(dispatch, getState, undefined);

    expect(api.createThread).toHaveBeenCalledWith(threadData);
  });

  it('4. asyncGetLeaderboards memanggil api.getLeaderboards', async () => {
    api.getLeaderboards.mockResolvedValue([{ user: { id: 1 }, score: 10 }]);

    await asyncGetLeaderboards()(dispatch, getState, undefined);

    expect(api.getLeaderboards).toHaveBeenCalled();
  });
});
