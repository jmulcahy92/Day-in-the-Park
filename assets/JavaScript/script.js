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

var queryVar = location.search.split("=")[1]; // what park did the user ask for on the previous page?
eval("var park = " + queryVar); // store user's chosen park's info in a new object called "park"

var parksKey = "KVZPIz8u4dvHQhj5wYQxDQUisHC1pnhaaCNJSTD9"; // parks API key
var parkCode = park.parkCode; // four-letter code for each park is necessary for our parks API call
var parksUrl =  "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + parksKey; // URL for parks API fetch with park-specific parkCode query

var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + park.latitude + "&lon=" + park.longitude + "&appid=154e1be203e8485a4c5f54029425e084&units=imperial";
var weatherFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=48.68414678&lon=-113.8009306&appid=154e1be203e8485a4c5f54029425e084&units=imperial";


fetch(parksUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
        console.log(data);
        var parkData = data.data[0]; // common path to all data we want

        var parkName = parkData.fullName; // full name in a string
        // create/append into header

        var parkActivities = parkData.activities; // array of park activities
        // loop over array and create/append li elements for each (parkActivities[i].name) in left column

        var parkImages = parkData.images; // array of park images with alt texts, captions, credits, titles, and urls
        var randomImage = parkImages[Math.floor(Math.random()*parkImages.length)]; // random image from array
        // create element for image, using randomImage.url for src and randomImage.altText for alt attribute
        // append image element
        // create/append caption + credit element

        var parkDescription = parkData.description; // two-three sentence string describing park
        // create/append dsecription element

        var parkDirections = parkData.directionsInfo; // two-three sentence string describing route to park from nearby major cities
        var parkDirectionsUrl = parkData.directionsUrl; // url to NPS website with further directions(?)
        // create/append directions element(s)

        var parkEntranceFees = parkData.entranceFees; // array of entrance fees (cost + description, i.e. vehicle type)
        var parkEntrancePasses = parkData.entrancePasses; //array of entrance pass options (cost + description)
        var parkFees = parkData.fees; //array of other fees (?)
        // create/append fee information elements

        var parkHours = parkData.operatingHours; // array with single object? description, exceptions(?), and standard hours object listing hours for every day of the week individually
        // create/append element with general description of hours
        // create/append "standard hours" info for every day of the week

        var parkClimate = parkData.weatherInfo; // string broadly describing standard temp ranges for every season
        // create/append into weather column (right)

        // footer: addresses, phone numbers, email addresses, url for official NPS park site

        console.log(parkName);
        console.log(parkActivities);
        console.log(randomImage);
        console.log(parkDescription);
        console.log(parkDirections);
        console.log(parkEntranceFees);
        console.log(parkEntrancePasses);
        console.log(parkHours);
        console.log(parkClimate);
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

fetch(weatherFiveDayUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
    });
  }
});






// function coordinate(x, y) {
//     this.x = x;
//     this.y = y;
//}
