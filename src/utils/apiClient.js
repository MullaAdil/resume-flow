const TOKEN_KEY = 'auth_token';
let API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
if (API_BASE_URL && !API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
  API_BASE_URL = `https://${API_BASE_URL}`;
}

// Helper function to perform fetch requests with JWT token automatically attached
async function request(url, options = {}) {
  const token = localStorage.getItem(TOKEN_KEY);
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg = data.error || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const apiClient = {
  auth: {
    async signUp({ email, password }) {
      const data = await request('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      return { user: data.user };
    },

    async signInWithPassword({ email, password }) {
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      return { user: data.user };
    },

    async signOut() {
      localStorage.removeItem(TOKEN_KEY);
      return { error: null };
    },

    async getCurrentUser() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) return null;
      try {
        const data = await request('/api/auth/me');
        return data.user;
      } catch (err) {
        console.warn('Session check failed or token expired:', err.message);
        localStorage.removeItem(TOKEN_KEY);
        return null;
      }
    }
  },

  resumes: {
    async list(userId) {
      return request(`/api/resumes?user_id=${encodeURIComponent(userId)}`);
    },

    async get(id) {
      return request(`/api/resumes/${id}`);
    },

    async save(userId, name, data) {
      return request('/api/resumes', {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, name, data }),
      });
    },

    async delete(id) {
      return request(`/api/resumes/${id}`, {
        method: 'DELETE',
      });
    }
  }
};
