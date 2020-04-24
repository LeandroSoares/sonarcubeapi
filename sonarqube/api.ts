import { HTTPHeaders, SearchParams, MeasuresComponentParams, MeasuredComponent, ProjectsSearchResult } from "./interfaces";

const axios = require('axios');

class BaseApi {

    protected server: string;
    protected headers: HTTPHeaders;

    constructor(server: string, token: string) {
        this.server = server;
        this.headers = { Authorization: `Basic ${this.toBase64(token + ':')}` }
    }

    protected toBase64(data: string) {
        return Buffer.from(data).toString('base64');
    }

    protected path(...params: string[]) {
        return [this.server, 'api'].concat(params).join('/')
    }
}

export class ProjectsApi extends BaseApi {
    constructor(server: string, token: string) {
        super(server, token)
    }

    search(params?: SearchParams): Promise<ProjectsSearchResult> {

        return new Promise((res, rej) => {
            axios.get(`${this.path('search')}`, { params, headers: this.headers })
                .then((response: { data: ProjectsSearchResult }) => res(response.data))
                .catch(rej)
        })
    }

    protected path(...params: string[]) {
        return super.path('projects', ...params)
    }
}

export class MeasuresApi extends BaseApi {
    constructor(server: string, token: string) {
        super(server, token)
    }

    component(params?: MeasuresComponentParams): Promise<MeasuredComponent> {
        return new Promise((res, rej) => {
            axios.get(`${this.path('component')}`, { params, headers: this.headers })
                .then((response: { data: { component: MeasuredComponent; }; }) => res(response.data.component))
                .catch(rej)
        })
    }

    protected path(...params: string[]) {
        return super.path('measures', ...params)
    }
}

export class SonarqubeApi {
    projects: ProjectsApi;
    measures: MeasuresApi;
    constructor(server: string, token: string) {
        this.projects = new ProjectsApi(server, token);
        this.measures = new MeasuresApi(server, token);
    }
}