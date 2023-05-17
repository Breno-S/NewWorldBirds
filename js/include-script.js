const formTag = document.querySelector("form");

fetch("../select-country.html")
.then(res => res.text())
.then(data => {
	formTag.innerHTML = data
});