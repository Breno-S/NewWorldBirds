let requestCounter = 0; // Contador de solicitações
let latestCountry = ""; // Armazenador de país da solicitação mais recentes

async function getBirds(country) {
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
    
    lat = data[0].lat.toFixed(2);
    console.log(lat);

    lon = data[0].lng.toFixed(2);
    console.log(lon);

    getSat(lon, lat, country);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
  }
}
