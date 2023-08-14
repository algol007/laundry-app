const tokenKey = '___auth_token';

export const tokenStorage = {
  store(token: string): void {
    localStorage.setItem(tokenKey, token);
  },
  get(): string {
    return localStorage.getItem(tokenKey) || '';
  },
  delete(): void {
    localStorage.removeItem(tokenKey);
  }
};
