import { sha256 } from "js-sha256";

const USER_STORAGE_KEY = "pos_offline_user";
const USER_SECRET_KEY = "pos_offline_user_secret";

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

const readFromStorage = (key) => {
  if (!isBrowser()) return null;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("No se pudieron leer los datos offline", error);
    return null;
  }
};

const writeToStorage = (key, value) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("No se pudieron guardar los datos offline", error);
  }
};

const removeFromStorage = (key) => {
  if (!isBrowser()) return;

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error("No se pudieron eliminar los datos offline", error);
  }
};

export const persistUserSession = (user, password) => {
  if (!user || typeof user !== "object") return;

  writeToStorage(USER_STORAGE_KEY, user);

  if (typeof password === "string" && password.length > 0) {
    const hash = sha256(password);
    writeToStorage(USER_SECRET_KEY, { email: user.email, hash });
  }
};

export const getStoredUser = () => readFromStorage(USER_STORAGE_KEY);

export const canLoginOffline = (email, password) => {
  if (!email || !password) return false;

  const secret = readFromStorage(USER_SECRET_KEY);
  if (!secret) return false;

  const hashedPassword = sha256(password);
  return secret.email === email && secret.hash === hashedPassword;
};

export const clearStoredUser = () => {
  removeFromStorage(USER_STORAGE_KEY);
  removeFromStorage(USER_SECRET_KEY);
};
