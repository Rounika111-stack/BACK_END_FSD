// API Base URL - empty string uses Vite's proxy (/api), fallback to localhost:5000 if needed
const API_BASE = '';

/**
 * Perform file search with multiple query parameters
 */
export async function searchFilesApi({
  q = '',
  category = 'all',
  ext = 'all',
  folder = 'all',
  sortBy = 'relevance',
  sortOrder = 'asc'
} = {}) {
  const params = new URLSearchParams();
  if (q.trim()) params.append('q', q.trim());
  if (category && category !== 'all') params.append('category', category);
  if (ext && ext !== 'all') params.append('ext', ext);
  if (folder && folder !== 'all') params.append('folder', folder);
  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const url = `${API_BASE}/api/search?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Search failed with HTTP status ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetch directory summary statistics
 */
export async function fetchStatsApi() {
  const response = await fetch(`${API_BASE}/api/files/stats`);
  if (!response.ok) {
    throw new Error(`Failed to load directory stats: HTTP ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch all available files
 */
export async function fetchAllFilesApi() {
  const response = await fetch(`${API_BASE}/api/files`);
  if (!response.ok) {
    throw new Error(`Failed to list files: HTTP ${response.status}`);
  }
  return await response.json();
}

/**
 * Health check to verify backend status
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE}/api/health`, { method: 'GET' });
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (err) {
    return null;
  }
}
