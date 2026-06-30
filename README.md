# sonarcubeapi

Cliente simples em TypeScript para consultar a API do SonarQube e imprimir no console um resumo em JSON dos metadados e das metricas dos projetos encontrados.

## O que o projeto faz

O fluxo atual eh:

1. Carrega as variaveis de ambiente do arquivo `.env`.
2. Cria um cliente autenticado para o SonarQube usando `SONARQUBE_ENDPOINT` e `SONARQUBE_TOKEN`.
3. Busca projetos no SonarQube.
4. Para cada projeto retornado, consulta as metricas configuradas em `metricKeys`.
5. Imprime o resultado final em JSON no console.

## Requisitos

- Node.js 14 ou superior.
- Um endpoint valido do SonarQube.
- Um token de acesso do SonarQube.

## Instalacao

```bash
npm install
```

## Configuracao

Crie um arquivo `.env` na raiz do projeto com os valores abaixo:

```env
SONARQUBE_ENDPOINT=https://seu-sonarqube.exemplo.com
SONARQUBE_TOKEN=seu_token_aqui
```

## Como executar

Primeiro gere a pasta `dist` com o compilador TypeScript:

```bash
npm run build
```

Depois execute a aplicacao compilada:

```bash
npm run exec
```

## Scripts disponiveis

- `npm run build`: compila o codigo TypeScript para `dist`.
- `npm run exec`: executa `dist/index.js`.
- `npm run watch`: recompila o projeto em modo observacao.
- `npm test`: placeholder atual do projeto.

## Estrutura principal

- `src/index.ts`: ponto de entrada da aplicacao.
- `src/sonarqube/api.ts`: cliente HTTP para as rotas de projetos e metricas.
- `src/sonarqube/interfaces.ts`: tipos e contratos usados pelas chamadas.

## Saida esperada

O comando imprime no terminal um array JSON com os dados retornados pela API do SonarQube para os projetos encontrados e suas metricas.

## Observacoes

- As credenciais sao carregadas automaticamente via `dotenv`.
- A consulta inicial de projetos usa o parametro `ps: 2` no codigo atual.
- O pacote nao usa mais `excel4node`; a arvore de dependencias foi enxugada para reduzir risco de dependencia transitiva vulneravel.
