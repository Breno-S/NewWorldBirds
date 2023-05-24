# NewWorldBirds
Nesta atividade foi pedido que criassemos um site que consumisse 5 APIS/endpoints diferentes. Após pesquisar por APIS no site [Free APIs](https://free-apis.github.io/), tive a ideia de fazer um site com o tema de conservação e meio ambiente, utilizando as seguintes APIS:

## [eBird API](https://documenter.getpostman.com/view/664302/S1ENwy59)
### Uso:
- Obter avistamentos notáveis de aves em determinado país.
### Requisitos:
- Chave de API.
## [English Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)
### Uso:
- Buscar informações da espécie relativa ao avistamento mais recente.
### Requisitos:
- Não há.
## [LibreTranslate API](https://github.com/LibreTranslate/LibreTranslate)
### Uso:
- Traduzir as informações do artigo retornado pela English Wikipedia API.
### Requisitos:
#### Para instalar o serviço do LibreTranslate:
 - Python 3.9;
 - Visual Studio com o pacote de _Desenvolvimento para Desktop com C++_ ou _Build Tools_;
#### Para utilizá-lo no website:
 - Serviço do LibreTranslate ativo na porta 5000;
## [NASA Earth API](https://api.nasa.gov/)
### Uso:
- Obter imagens de satélite do local do avistamento, de 2014 a 2020, a partir de suas coordenadas.
### Requisitos:
- Chave de API.
## [Open Meteo API](https://open-meteo.com/)
### Uso:
- Obter histórico meteorológico de sete dias atrás, contando da data do avistamento.
- Com esses dados um gráfico de linhas é automaticamente gerado utilizando a biblioteca [Chart.js](https://www.chartjs.org/).
### Requisitos:
- Não há.
