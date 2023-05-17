function getBirds(country) {
  fetch(`https://api.ebird.org/v2/data/obs/${country}/recent/notable?detail=full`, {
    headers: {
      "X-Ebirdapitoken": "3kbfm28srv56",
    }
  })
  .then(res => res.json())
  .then(data => {
    lat = data[0].lat.toFixed(2);
    console.log(lat);

    lon = data[0].lng.toFixed(2);
    console.log(lon);

    getSat(lon, lat)
  })
  .catch(error => console.log(error)
  );

  let images = document.getElementsByClassName("satelite-image");
  let section = document.querySelector("section");
  for (let i = 0; i < images.length; i++) {
    child = images[i];
    section.removeChild(child);
  }
}