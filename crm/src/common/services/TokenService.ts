import jwtDecode from "jwt-decode";
import { TOKEN_KEY } from "../constants";

export class TokenService {
    setToken(access_token: string) {
        localStorage.setItem(TOKEN_KEY, access_token);
    }

    removeToken() {
        localStorage.removeItem(TOKEN_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    isTokenValid(): boolean {
        const token = this.getToken();

        if (!token) {
            return false;
        }

        const decodedToken = jwtDecode(token);
        return this.tokenValid(decodedToken);
    }

    private tokenValid(token: any = {}): boolean {
        const now = Date.now() / 1000;
        return token.exp > now;
    }
}

export default new TokenService();