const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');

export function apiUrl(path) {
    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function getAuthHeader() {
    const token = sessionStorage.getItem('_auth_token');
    if (!token) {
        return {};
    }
    return {
        'Authorization': `Bearer ${token}`
    };
}

export async function apiFetch(url, options = {}) {
    const headers = {
        ...getAuthHeader(),
        ...(options.headers || {})
    };

    const response = await fetch(apiUrl(url), {
        ...options,
        headers
    });

    return response;
}
