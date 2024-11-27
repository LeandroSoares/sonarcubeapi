export interface HTTPHeaders {
    Authorization: string;
}

export interface SearchParams {
    qualifyers?: string;
    ps?: number;
}

export interface ProjectsSearchComponentResult {
    organization: string;
    key: string;
    name: string;
    qualifier: string;
    visibility: string;
    lastAnalysisDate: string;
    revision: string;
}

export interface Paging {
    pageIndex: number;
    pageSize: number;
    total: number;
}

export interface ProjectsSearchResult {
    paging: Paging;
    components: ProjectsSearchComponentResult[]
}

export interface MeasuresComponentParams {
    /**
     * @name metricKeys
     * @description: lista de atributos a serem listados
     * @example: bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,alert_status,quality_gate_details
     */
    metricKeys: string;
    component: string;
}

export interface MeasuredComponent {
    id: string;
    key: string;
    name: string;
    qualifier: string;
    measures: any[];
}

export interface MeasureData {
    metric: string;
    value: string;
    bestValue?: boolean;
}