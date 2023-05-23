async function getWeatherHistory(long, lat) {
    const dataAtual = new Date();
    let ano = dataAtual.getFullYear();
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda para garantir 2 dígitos
    let dia = String(dataAtual.getDate()).padStart(2, '0');

    const dataISO = `${ano}-${mes}-${dia}`;

    console.log(dataISO);

    dataAtual.setMonth(dataAtual.getMonth() - 1);

    ano = dataAtual.getFullYear();
    mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    dia = String(dataAtual.getDate()).padStart(2, '0');

    const dataMesPassado = `${ano}-${mes}-${dia}`;

    console.log(dataMesPassado);


    const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=${dataMesPassado}&end_date=${dataISO}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,snowfall`;
    
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

        const ctx = document.getElementById('myChart');

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
                    text: 'Datas'
                  }
                },
                y: {
                  display: true,
                  title: {
                    display: true,
                    text: 'Valores'
                  }
                }
              }
            }
          });
          
    } catch {

    }       
}