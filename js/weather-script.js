async function getWeatherHistory(long, lat, date) {
  var dataAtual = new Date(date); // Criando um objeto Date com a data separada
  var dataSeteDiasAntes = new Date(dataAtual.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtraindo sete dias em milissegundos
  
  dataSeteDiasAntes.setHours(0, 0, 0, 0); // Definindo a hora, minuto, segundo e milissegundo para 0
  
  var ano = dataSeteDiasAntes.getFullYear(); // Obtendo o ano da data
  var mes = ("0" + (dataSeteDiasAntes.getMonth() + 1)).slice(-2); // Obtendo o mês da data
  var dia = ("0" + dataSeteDiasAntes.getDate()).slice(-2); // Obtendo o dia da data
  
  var dataSeteDiasAntesFormatada = ano + "-" + mes + "-" + dia;
  console.log(dataSeteDiasAntesFormatada);

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${dataSeteDiasAntesFormatada}&end_date=${date}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,snowfall`;
    
  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error('Network response was not OK');
      }

      const data = await response.json();

      // Use the response data here
      console.log(data);
      
      precipitacao = data.hourly.precipitation;
      chuva = data.hourly.rain;
      umidadeRelativa = data.hourly.relativehumidity_2m;
      neve = data.hourly.snowfall;
      temperatura = data.hourly.temperature_2m;

      let datas = data.hourly.time;
      console.log(datas[0].split("T")[0]);

      for (let i = 0; i < datas.length; i++) {
        datas[i] = datas[i].split("T")[0]; 
      }

      let ctx = document.getElementById('myChart');

      new Chart(ctx, {
          type: 'line',
          data: {
            labels: datas, // Array com as datas das medições
            datasets: [
              {
                label: 'Precipitação',
                data: precipitacao, // Array com os dados de precipitação
                borderColor: 'blue',
                fill: false
              },
              {
                label: 'Chuva',
                data: chuva, // Array com os dados de chuva
                borderColor: 'green',
                fill: false
              },
              {
                label: 'Umidade Relativa',
                data: umidadeRelativa, // Array com os dados de umidade relativa
                borderColor: 'orange',
                fill: false
              },
              {
                label: 'Neve',
                data: neve, // Array com os dados de neve
                borderColor: 'gray',
                fill: false
              },
              {
                label: 'Temperatura',
                data: temperatura, // Array com os dados de temperatura
                borderColor: 'red',
                fill: false
              }
            ]
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Data'
                }
              },
              y: {
                display: true,
                title: {
                  display: false,
                  text: 'Valores'
                }
              }
            }
          }
        });
        
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
}

function clearGraph() {
  let graph = document.querySelector("canvas");
  let body = document.querySelector("body");
  let scriptTag = document.querySelector("chart-script");

  body.removeChild(graph);

  let newGraph = document.createElement("canvas");
  newGraph.id = "myChart";

  body.insertBefore(newGraph, scriptTag);
}