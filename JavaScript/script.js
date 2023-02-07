var parksArray = [
    GreatSmokyMountains = {
        parkCode: 'grsm',
        latitude: '36.0001165336',
        longitude: '-112.121516363'
    },

    Zion = {
        parkCode: 'zion',
        latitude: '37.29839254',
        longitude: '-113.0265138'
    },
    
    Yellowstone = {
        parkCode: 'yell',
        latitude: '44.59824417',
        longitude: '-110.5471695'
    },
    
    GrandCanyon = {
        parkCode: 'grca',
        latitude: '36.0001165336',
        longitude: '-112.121516363'
    },
    
    RockyMountain = {
        parkCode: 'romo',
        latitude: '40.3556924',
        longitude: '-105.6972879'
    },

    Acadia = {
        parkCode: 'acad',
        latitude: '44.409286',
        longitude: '-68.247501'
    },
    
    GrandTeton = {
        parkCode: 'grte',
        latitude: '43.81853565',
        longitude: '-110.7054666'
    },

    Yosemite = {
        parkCode: 'yose',
        latitude: '37.84883288',
        longitude: '-119.5571873'
    },

    Glacier = {
        parkCode: 'glac',
        latitude: '48.68414678',
        longitude: '-113.8009306'
    }
];

var parksKey = "KVZPIz8u4dvHQhj5wYQxDQUisHC1pnhaaCNJSTD9";
var parkCode = "acad"; // placeholder (pulls data for Acadia)
var parksUrl =
  "https://developer.nps.gov/api/v1/parks?parkCode=" +
  parkCode +
  "&api_key=" +
  parksKey;
var weatherUrl = "https://api.weather.gov";
var weatherCode = "38.8894,-77.0352"


fetch(parksUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      weatherCode = "38.8894,-77.0352"
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
function coordinate(x, y) {
    this.x = x;
    this.y = y;
}