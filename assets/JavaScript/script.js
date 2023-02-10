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
var weatherFiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + park.latitude + "&lon=" + park.longitude + "&appid=154e1be203e8485a4c5f54029425e084&units=imperial";

var headerEl = document.querySelector(".header");
var activitiesList = document.querySelector(".left").children[0].children[1].children[1];
var mainImage = document.querySelector("#park-image");
var mainDescription = document.querySelector("#description");
var mainDirections = document.querySelector("#getting-here");
var mainFees = document.querySelector("#fees");
var mainHours = document.querySelector("#hours");

fetch(parksUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
        console.log(data);
        var parkData = data.data[0]; // common path to all data we want

        var parkName = parkData.fullName; // full name in a string
        var titleEl = document.createElement("p");
        titleEl.textContent = parkName;
        headerEl.appendChild(titleEl);

        var parkActivities = parkData.activities; // array of park activities
        for (i = 0; i < parkActivities.length; i++) { // loop over parkActivites array...
          var newLiEl = document.createElement("li"); // create a new li element
          newLiEl.textContent = parkActivities[i].name; // put the activity in the new li element's textContent
          activitiesList.appendChild(newLiEl); // append the new activity li element to the list of activities
        }

        var parkImages = parkData.images; // array of park images with alt texts, captions, credits, titles, and urls
        var randomImage = parkImages[Math.floor(Math.random()*parkImages.length)]; // random image from array
        var newImgEl = document.createElement("img"); // create element for image, using randomImage.url for src and randomImage.altText for alt attribute
        newImgEl.setAttribute("src", randomImage.url); // set image src as randomImage.url
        newImgEl.setAttribute("alt", randomImage.altText); // set image alt as randomImage.altText
        mainImage.appendChild(newImgEl); // append image element

        var imgCaption = document.createElement("p"); // create image caption element
        imgCaption.textContent = randomImage.caption + " Credit: " + randomImage.credit; // set textContent with image description and credit
        mainImage.appendChild(imgCaption); // append caption element

        var parkDescription = parkData.description; // two-three sentence string describing park
        var newDescriptionEl = document.createElement("p"); // create description p element
        newDescriptionEl.textContent = parkDescription; // set textContent
        mainDescription.appendChild(newDescriptionEl); // append description element

        var parkDirections = parkData.directionsInfo; // two-three sentence string describing route to park from nearby major cities
        var parkDirectionsUrl = parkData.directionsUrl; // url to NPS website with further directions(?)
        var newDirectionsEl = document.createElement("p"); // create directions p element
        var newDirectionsUrlEl = document.createElement("a"); // create anchor element for link to directions
        newDirectionsEl.textContent = parkDirections + ". Further info can be found "; // set textContent (including url)
        newDirectionsUrlEl.setAttribute("href", parkDirectionsUrl); // set href of anchor to directions url
        newDirectionsUrlEl.textContent = "here"; // set textContent of anchor
        newDirectionsEl.appendChild(newDirectionsUrlEl); // append anchor to end of directions element
        mainDirections.appendChild(newDirectionsEl); // append directions element

        var parkEntranceFees = parkData.entranceFees; // array of entrance fees (cost + description, i.e. vehicle type)
        var parkEntrancePasses = parkData.entrancePasses; //array of entrance pass options (cost + description)

        // loop over entrance fees array and display each in a list
        for (i = 0; i < parkEntranceFees.length; i++) {
          var newEntranceFeeEl = document.createElement("li");
          newEntranceFeeEl.textContent = "$" + parkEntranceFees[i].cost + ": " + parkEntranceFees[i].description;
          mainFees.children[2].appendChild(newEntranceFeeEl);
        }

        // loop over entrance passes array and display each in a list
        for (i = 0; i < parkEntrancePasses.length; i++) {
          var newEntranceFeeEl = document.createElement("li");
          newEntranceFeeEl.textContent = "$" + parkEntrancePasses[i].cost + ": " + parkEntrancePasses[i].description;
          mainFees.children[4].appendChild(newEntranceFeeEl);
        }
        
        var parkHours = parkData.operatingHours; // array with single object? description, exceptions(?), and standard hours object listing hours for every day of the week individually
        // create/append element with general description of hours
        var newHoursDescriptionEl = document.createElement("p");
        newHoursDescriptionEl.textContent = parkHours[0].description;
        mainHours.appendChild(newHoursDescriptionEl);
        // create/append "standard hours" info for every day of the week
        var newHoursUl = document.createElement("ul");
        var weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        for (i = 0; i < 7; i++) {
          eval("var dailyHours = parkHours[0].standardHours." + weekdays[i]);
          var hoursString = weekdays[i] + ": " + dailyHours;
          hoursString = hoursString.charAt(0).toUpperCase() + hoursString.slice(1);
          var newHoursLi = document.createElement("li");
          newHoursLi.textContent = hoursString;
          newHoursUl.appendChild(newHoursLi);
        }
        mainHours.appendChild(newHoursUl);

        var parkClimate = parkData.weatherInfo; // string broadly describing standard temp ranges for every season
        // create/append into weather column (right)

        // footer: addresses, phone numbers, email addresses, url for official NPS park site
        var parkAddress = parkData.Address;
        // create/append park address
        var parkPhone = parkData.PhoneNumber;
        // create/append phone number
        var parkEmail = parkData.parkEmail;
        // create/append park email
        var parkURL = parkData.url;
        // create/append park website
        
        console.log(parkClimate);

        console.log(parkAddress);
        console.log(parkPhone);
        console.log(parkEmail);
        console.log(parkURL);
    });
  }
});

//var parkWeather = parkData.weatherInfo
//var parkFiveDayWeather = parkData.FiveDayWeatherInfo

fetch(weatherUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      
        var parkTemp = data.main.temp; 
        var tempEl = document.querySelector("#current-weather").children[0];
        tempEl.textContent = parkTemp;
    });
  }
});

fetch(weatherFiveDayUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      var parkData = data.main; // common path to all data we want

        var parkFiveDayWeather = parkData.FiveDayWeather ; // full name in a string
        var titleEl = document.createElement("p");
        titleEl.textContent = parkName;
        headerEl.appendChild(titleEl);
    });
  }
});


