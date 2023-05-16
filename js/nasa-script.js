// NASA API

const nasaKey = "d5k7bOWBuIeEAm6QoQdELpDKlLHanowuWKVSaeQG";
let nasaUrl = "https://api.nasa.gov/planetary/earth/imagery";

let lon = -53.5;
let lat = -12;
let date = "2016-01-01";

const years = ["2014", "2015", "2016", "2017", "2018", "2019", "2020"];

for (let i = 0; i < years.length; i++) {
	let imageTag = document.getElementById(`image-satelite${i+1}`);
	apiUrl = "https://api.nasa.gov/planetary/earth/imagery?lon=" + lon + "&lat=" + lat + "&date=" + `${years[i]}-01-01` +"&dim=0.1&api_key=" + nasaKey;
	
	fetch(apiUrl)
	.then(function(response) {
		return response.blob();
	})
	.then(function(myblob) {
		let objectURL = URL.createObjectURL(myblob);
		imageTag.src = objectURL;	
	});
}