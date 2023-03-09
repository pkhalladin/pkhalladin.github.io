import { Api } from "./api";

export class AuthManager {
    static instance: AuthManager;

    static getInstance() {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }
        return AuthManager.instance;
    }

    async login(login: string, password: string) {
        const response = await Api.getInstance().post('auth/signin', {
            login,
            password
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('login', login);
        const user = (await Api.getInstance().get("users")).filter((user: any) => user.login === login)[0];
        localStorage.setItem('userId', user._id);
    }

    async register(name: string, login: string, password: string) {
        await Api.getInstance().post('auth/signup', {
            name,
            login,
            password
        });
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        localStorage.removeItem('userId');
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getUserId() {
        return localStorage.getItem('userId');
    }

    getLogin() {
        return localStorage.getItem('login');
    }
}