const TOKEN_KEY = 'auth_token';
let API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
if (API_BASE_URL && !API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
  API_BASE_URL = `https://${API_BASE_URL}`;
}

// Helper function to perform fetch requests with JWT token automatically attached, timeout, and fallback
async function request(url, options = {}, timeoutMs = 4000) {
  const token = localStorage.getItem(TOKEN_KEY);
  
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const fetchWithTimeout = async (targetUrl, customTimeout = timeoutMs) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), customTimeout);
    try {
      const res = await fetch(targetUrl, {
        ...options,
        headers,
        signal: controller.signal,
      });
      return res;
    } finally {
      clearTimeout(timer);
    }
  };

  let response;
  const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

  if (isLocalhost) {
    try {
      // Prioritize relative URL on localhost (leverages Vite dev proxy directly)
      response = await fetchWithTimeout(url, 2500);
    } catch (err) {
      if (API_BASE_URL) {
        const fallbackUrl = `${API_BASE_URL}${url}`;
        try {
          response = await fetchWithTimeout(fallbackUrl, 2500);
        } catch (fallbackErr) {
          throw new Error(`API request to ${url} failed: ${err.message}`);
        }
      } else {
        throw new Error(`API request to ${url} failed: ${err.message}`);
      }
    }
  } else {
    const primaryUrl = API_BASE_URL ? `${API_BASE_URL}${url}` : url;
    try {
      response = await fetchWithTimeout(primaryUrl, timeoutMs);
    } catch (err) {
      if (API_BASE_URL) {
        try {
          response = await fetchWithTimeout(url, timeoutMs);
        } catch (fallbackErr) {
          throw new Error(`API request to ${url} failed: ${err.message}`);
        }
      } else {
        throw new Error(`API request to ${url} failed: ${err.message}`);
      }
    }
  }

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
      const cleanEmail = (email || '').trim();
      const data = await request('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email: cleanEmail, password }),
      });
      if (data.token) {
        localStorage.setItem(TOKEN_KEY, data.token);
      }
      return { user: data.user };
    },

    async signInWithPassword({ email, password }) {
      const cleanEmail = (email || '').trim();
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: cleanEmail, password }),
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
  },

  activity: {
    async log(data) {
      return request('/api/activity', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    async list(userId) {
      const param = userId ? `?user_id=${encodeURIComponent(userId)}` : '';
      return request(`/api/activity${param}`);
    }
  }
};
