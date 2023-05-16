fetch("https://api.ebird.org/v2/data/obs/BR/recent/notable?detail=full", {
  headers: {
    "X-Ebirdapitoken": "3kbfm28srv56",
  }
})
.then(res => {
    console.log(res.json());
    
}
);