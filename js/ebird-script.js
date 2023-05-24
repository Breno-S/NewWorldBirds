let birdName = document.getElementById("bird-name");
let birdInfo = document.getElementById("bird-info");
let birdImage = document.getElementById("bird-image");

let requestCounter = 0; // Contador de solicitações
let latestCountry = ""; // Armazenador de país da solicitação mais recentes

async function getBirds(country) {
  birdName.textContent = "";
  birdImage.src = "";
  birdInfo.textContent = "";
  clearIntruders();
  clearGraph();

  let mapGallery = document.getElementById("gallery");
  mapGallery.innerHTML = "";

  latestCountry = country;

  requestCounter++; // Incrementar o contador de solicitações

  if (country == 0) {
    return;
  }
  
  let url = `https://api.ebird.org/v2/data/obs/${country}/recent/notable?detail=full`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Ebirdapitoken": "3kbfm28srv56",
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not OK');
    }
    
    const data = await response.json();
    
    // Use the response data here
    console.log(data);

    commonName = data[0].comName;
    console.log(commonName);

    speciesName = data[0].sciName;
    console.log(speciesName);
    
    birdName.innerText = commonName + " (" + speciesName + ")";

    const formattedSpeciesName = formatWikiTitle(speciesName);
    console.log(formattedSpeciesName);

    lat = data[0].lat.toFixed(2);
    console.log(lat);

    lon = data[0].lng.toFixed(2);
    console.log(lon);

    date = data[0].obsDt;
    date = date.split(" ")[0];
    console.log(date);

    wikiData = await fetchWikiExtract(formattedSpeciesName);

    const sumary = await wikiData.query.pages[0].extract;

    // Remover a função translate() se não estiver rodando o servidor do LibreTranslate
    // ex: 
    //    birdInfo.textContent = sumary;
    birdInfo.textContent = translate(sumary);

    const imageUrl = await wikiData.query.pages[0].thumbnail.source;
    birdImage.src = imageUrl;

    getSat(lon, lat, country);
    
    getWeatherHistory(lon, lat, date);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
}

