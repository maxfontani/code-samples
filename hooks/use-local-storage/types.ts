export type LocalStorageValue = string | string[] | { [key: string]: string };

export type UseLocalStorage = (
  key: string
) => [() => LocalStorageValue | null, (val: LocalStorageValue) => void];
