var parksKey = "KVZPIz8u4dvHQhj5wYQxDQUisHC1pnhaaCNJSTD9";
var parkCode = "acad"; // placeholder (pulls data for Acadia)
var parksUrl =
  "https://developer.nps.gov/api/v1/parks?parkCode=" +
  parkCode +
  "&api_key=" +
  parksKey;
var weatherUrl = "https://api.weather.gov/points/";

fetch(parksUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});

fetch(weatherUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});
