import { SonarqubeApi } from "./sonarqube/api";
import { MeasuredComponent, ProjectsSearchComponentResult, ProjectsSearchResult } from "./sonarqube/interfaces";
const dotenv = require('dotenv');
const result = dotenv.config()

if (result.error) {
    throw result.error
}

const SONARQUBE_ENDPOINT = process.env['SONARQUBE_ENDPOINT'] || ""
const SONARQUBE_TOKEN = process.env['SONARQUBE_TOKEN'] || ""

let client = new SonarqubeApi(SONARQUBE_ENDPOINT, SONARQUBE_TOKEN);

const METRICS_KEYS_LIST = ['bugs', 'vulnerabilities', 'code_smells', 'coverage', 'duplicated_lines_density', 'alert_status'].join(',');

function projectsResolver(response: ProjectsSearchResult) {
    let promises: Promise<MeasuredComponent>[] = response.components.map(componentResponseMapper);
    Promise.all(promises).then(makeReports)
}

function componentResponseMapper(component: ProjectsSearchComponentResult) {
    return client.measures.component({ component: component.key, metricKeys: METRICS_KEYS_LIST })
}

function makeReports(components: MeasuredComponent[]) {
    console.log(JSON.stringify(components))
}

client.projects.search({ ps: 2 }).then(projectsResolver).catch(console.log);