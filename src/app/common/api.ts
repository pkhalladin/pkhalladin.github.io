import { AuthManager } from "./auth.manager";
import { Config } from "./config";

export class Api {
    static instance: Api;
    baseUrl: string;
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    static getInstance() {
        if (!Api.instance) {
            Api.instance = new Api(Config.ApiUrl);
        }
        return Api.instance;
    }

    async get(endpoint: string) {
        const url = new URL(endpoint, this.baseUrl);
        return await (await this.ensureSuccess(await fetch(url.toString(), {
            headers: {
                "Authorization": "Bearer " + AuthManager.getInstance().getToken()
            }
        }))).json();
    }

    async post(endpoint: string, data: any) {
        const url = new URL(endpoint, this.baseUrl);
        return await (await this.ensureSuccess(await fetch(url.toString(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + AuthManager.getInstance().getToken()
            },
            body: JSON.stringify(data)
        }))).json();
    }

    async put(endpoint: string, data: any) {
        const url = new URL(endpoint, this.baseUrl);
        return await (await this.ensureSuccess(await fetch(url.toString(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + AuthManager.getInstance().getToken()
            },
            body: JSON.stringify(data)
        }))).json();
    }

    async delete(endpoint: string) {
        const url = new URL(endpoint, this.baseUrl);
        return await (await this.ensureSuccess(await fetch(url.toString(), {
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + AuthManager.getInstance().getToken()
            }
        }))).json();
    }

    async ensureSuccess(response: Response) {
        if (!response.ok) {
            const json = await response.json();
            throw new Error(json.message || json.error || response.statusText);
        }
        return response;
    }
}