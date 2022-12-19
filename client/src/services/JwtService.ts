export class JwtService {
  private static tokenKey = 'token';

  public static getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  public static setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
