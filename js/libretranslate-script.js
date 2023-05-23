async function translate(str) {
	const res = await fetch("http://127.0.0.1:5000/translate", {
		method: "POST",
		body: JSON.stringify({
			q: str,
			source: "en",
			target: "pt",
			format: "text",
			api_key: ""
		}),
		headers: { "Content-Type": "application/json" }
	})
	.then(res => res.json())
	.then(data => {
		birdInfo.innerText = data.translatedText;
		console.log(data);
	});
}


