const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function putAccessToken(accessToken) {
  localStorage.setItem('accessToken', accessToken);
}

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data;
}

async function requestWithToken(endpoint, options = {}) {
  return request(endpoint, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

const api = {
  async register({ name, email, password }) {
    const { user } = await request('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return user;
  },

  async login({ email, password }) {
    const { token } = await request('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return token;
  },

  async getOwnProfile() {
    const { user } = await requestWithToken('/users/me');
    return user;
  },

  async getAllUsers() {
    const { users } = await request('/users');
    return users;
  },

  async getAllThreads() {
    const { threads } = await request('/threads');
    return threads;
  },

  async getThreadDetail(id) {
    const { detailThread } = await request(`/threads/${id}`);
    return detailThread;
  },

  async createThread({ title, body, category }) {
    const { thread } = await requestWithToken('/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    });
    return thread;
  },

  async createComment({ threadId, content }) {
    const { comment } = await requestWithToken(`/threads/${threadId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    return comment;
  },

  async toggleVote(type, id, voteType) {
    const url = type === 'threads'
      ? `/threads/${id}/${voteType}`
      : `/threads/${id.threadId}/comments/${id.commentId}/${voteType}`;

    const { vote } = await requestWithToken(url, { method: 'POST' });
    return vote;
  },

  async getLeaderboards() {
    const { leaderboards } = await request('/leaderboards');
    return leaderboards;
  },
};

export { api, putAccessToken, getAccessToken };
