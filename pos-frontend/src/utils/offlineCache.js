const CACHE_STORAGE_KEY = "pos_offline_cache_v1";

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

const readCache = () => {
  if (!isBrowser()) return {};

  try {
    const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error("No se pudo leer la cache offline", error);
    return {};
  }
};

const writeCache = (cache) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.error("No se pudo guardar la cache offline", error);
  }
};

export const CACHE_KEYS = {
  user: "/api/user",
  orders: "/api/order",
  tables: "/api/table",
  menuCategories: "/api/menu/categories",
};

export const buildCacheKey = (input) => {
  if (!input) return "";

  if (typeof input === "string") {
    return input;
  }

  const { url = "", baseURL = "", params } = input;
  const normalizedUrl = url.replace(baseURL, "");

  if (!params) {
    return normalizedUrl;
  }

  const searchParams = new URLSearchParams(params).toString();
  return searchParams ? `${normalizedUrl}?${searchParams}` : normalizedUrl;
};

export const setCachedData = (keyOrConfig, payload) => {
  if (!isBrowser()) return;

  const cache = readCache();
  const key = buildCacheKey(keyOrConfig);

  cache[key] = {
    payload,
    timestamp: Date.now(),
  };

  writeCache(cache);
};

export const getCachedEntry = (keyOrConfig) => {
  if (!isBrowser()) return null;

  const cache = readCache();
  const key = buildCacheKey(keyOrConfig);
  return cache[key] ?? null;
};

export const getCachedData = (keyOrConfig) => {
  const entry = getCachedEntry(keyOrConfig);
  return entry ? entry.payload : null;
};

export const updateCachedData = (keyOrConfig, updater) => {
  if (!isBrowser() || typeof updater !== "function") return;

  const cache = readCache();
  const key = buildCacheKey(keyOrConfig);
  const current = cache[key]?.payload;
  const next = updater(current);

  if (typeof next === "undefined") {
    return;
  }

  cache[key] = {
    payload: next,
    timestamp: Date.now(),
  };

  writeCache(cache);
};

export const removeCachedData = (keyOrConfig) => {
  if (!isBrowser()) return;

  const cache = readCache();
  const key = buildCacheKey(keyOrConfig);

  if (!cache[key]) return;

  delete cache[key];
  writeCache(cache);
};
