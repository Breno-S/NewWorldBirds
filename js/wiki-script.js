function fetchWikiExtract(param) {
	const wikiEndpoint = "https://en.wikipedia.org/w/api.php";
	const wikiParams = "?action=query"
	+ "&prop=extracts|pageimages"
	+ "&pithumbsize=500"
	+ "&exsentences=2"
	+ "&exlimit=1"
	+ "&titles=" + encodeURIComponent(param)
	+ "&redirects"
	+ "&explaintext=1"
	+ "&format=json"
	+ "&formatversion=2"
	+ "&origin=*";

	const wikiLink = wikiEndpoint + wikiParams;
	console.log(wikiLink);

	// var wikiConfig = {
	// 	timeout: 6500
	// };

	async function getJsonResponse(url) {
		const res = await fetch(url);
		return res.json();		
	}

	return getJsonResponse(wikiLink).then(result => {
		return result;
	}).catch(error => {
		console.log("Erro:" + error);
		return null;
	});
}


function formatWikiTitle(name) {
  // Converter para minúsculas e remover espaços em branco no início e no fim
  const trimmedName = name.trim().toLowerCase();
  
  // Obter a primeira letra em maiúscula
  const formattedName = trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1);

  return formattedName;
}
