// NASA API
const nasaKey = "d5k7bOWBuIeEAm6QoQdELpDKlLHanowuWKVSaeQG";
const years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020"];
let month;

let habitatSection = document.getElementById("habitat-section");

async function getSat(lon, lat) {
	for (let i = 0; i < years.length; i++) {
		for (let j = 1; j <= 12; j++) {
			switch (j) {
				case 1:
					month = "01";
					break;
				case 2:
					month = "02";
					break;
				case 3:
					month = "03";
					break;
				case 4:
					month = "04";
					break;
				case 5:
					month = "05";
					break;
				case 6:
					month = "06";
					break;
				case 7:
					month = "07";
					break;
				case 8:
					month = "08";
					break;
				case 9:
					month = "09";
					break;
				case 10:
					month = "10";
					break;
				case 11:
					month = "11";
					break;
				case 12:
					month = "12";
					break;
				default:
					break;
			}
			
			url = "https://api.nasa.gov/planetary/earth/imagery?lon=" + lon + "&lat=" + lat + "&date=" + `${years[i]}-${month}-01` +"&dim=0.1&api_key=" + nasaKey;

			try {
				const response = await fetch(url);
				
				if (!response.ok) {
					throw new Error('Network response was not OK');
				}
				
				const data = await response.blob();
				
				// Use the response data here
				console.log(data);
			
				let objectURL = URL.createObjectURL(data);
				
				let newMap = document.createElement("img");
				newMap.className = "satelite-image";
				newMap.src = objectURL;
				
				habitatSection.appendChild(newMap);

			} catch (error) {
				// Handle any errors that occurred during the request
				console.error('Error:', error);
			}
		}
	}
}
