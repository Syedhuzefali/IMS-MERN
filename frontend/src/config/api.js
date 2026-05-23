const fallbackApiBaseUrl = "http://localhost:3001";

const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || fallbackApiBaseUrl;

export const API_BASE_URL = rawApiBaseUrl.replace(/\/$/, "");

export const buildApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};
