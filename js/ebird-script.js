let birdName = document.getElementById("bird-name");
let birdInfo = document.getElementById("bird-info");
let birdImage = document.getElementById("bird-image");

let requestCounter = 0; // Contador de solicitações
let latestCountry = ""; // Armazenador de país da solicitação mais recentes

async function getBirds(country) {
  birdName.textContent = "";
  birdInfo.textContent = "";
  birdInfo.src = "";

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

    speciesName = data[0].comName;
    console.log(speciesName);
    birdName.innerText = speciesName;

    const formattedSpeciesName = formatWikiTitle(speciesName);
    console.log(formattedSpeciesName);

    lat = data[0].lat.toFixed(2);
    console.log(lat);

    lon = data[0].lng.toFixed(2);
    console.log(lon);

    wikiData = await fetchWikiExtract(formattedSpeciesName);

    const sumary = wikiData.query.pages[0].extract;
    birdInfo.textContent = translate(sumary);

    const imageUrl = wikiData.query.pages[0].thumbnail.source;
    birdImage.src = imageUrl;

    getSat(lon, lat, country);
    
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
}
