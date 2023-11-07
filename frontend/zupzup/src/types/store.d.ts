declare module 'redux-persist/lib/storage' {
  export interface WebStorage {
    getItem(
      key: string,
      callback: (error: Error, result: object) => void,
    ): void;
    setItem(key: string, value: object, callback: (error: Error) => void): void;
    removeItem(key: string, callback: (error: Error) => void): void;
  }

  const localStorage: WebStorage;
  const sessionStorage: WebStorage;

  export { localStorage, sessionStorage };
}
