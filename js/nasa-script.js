// NASA API
const nasaKey = "d5k7bOWBuIeEAm6QoQdELpDKlLHanowuWKVSaeQG";
const years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020"];

async function getSat(lon, lat, country) {
	const currentRequestNumber = requestCounter; // Armazenar o número da solicitação atual
	
	let mapGallery = document.getElementById("gallery");

	for (let i = 0; i < years.length; i++) {
		for (let month = 1; month <= 12; month++) {
			if (month < 10) {
				month = "0" + month.toString();
			} else {
				month = month.toString();
			}
			
			url = "https://api.nasa.gov/planetary/earth/imagery?lon=" + lon + "&lat=" + lat + "&date=" + `${years[i]}-${month}-01` +"&dim=0.1&api_key=" + nasaKey;

			try {
				if (requestCounter !== currentRequestNumber) {
					break; // Verificar se a solicitação foi cancelada e interromper o loop
				}

				const response = await fetch(url);
				
				if (!response.ok) {
					throw new Error('Network response was not OK');
				}
				
				const data = await response.blob();
				
				// Use the response data here
				console.log(data);
				
				let objectURL = URL.createObjectURL(data);
				
				if (country == latestCountry) {
					let new_map = `
					<div country='${country}'>
					<div class='image-year'>${month}/${years[i]}</div>
					<img src='${objectURL}' class='item'>
					</div>`;
					
					mapGallery.innerHTML += new_map;
				} else {
					clearIntruders();
				}

			} catch (error) {
				// Handle any errors that occurred during the request
				console.error('Error:', error);
			}
		}
	}
}

// Função para remover imagens de satélite de países diferentes do selecionado
function clearIntruders() {
	let mapGallery = document.getElementById("gallery");
	
	for (let i = 0; i < mapGallery.childElementCount; i++) {
		let element = mapGallery.children[i];
		if (element.country != latestCountry) {
			mapGallery.removeChild(element);
		}
	}
}
