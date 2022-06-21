import { UseLocalStorage } from './types';

export const useLocalStorage: UseLocalStorage = (key) => {
  function getItem() {
    try {
      const value = localStorage.getItem(key);
      return typeof value === 'string' ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  }

  function setItem(value: string | string[] | object) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  return [getItem, setItem];
};
