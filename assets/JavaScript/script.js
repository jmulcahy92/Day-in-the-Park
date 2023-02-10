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
var activitiesList = document.querySelector("#activities");
var mainImage = document.querySelector("#park-image");
var mainDescription = document.querySelector("#description");
var mainClimate = document.querySelector("#climate");
var mainDirections = document.querySelector("#getting-here");
var mainFees = document.querySelector("#fees");
var mainHours = document.querySelector("#hours");
var forecastContainerEl = document.getElementById("forecast-container");
fetch(parksUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
        var parkData = data.data[0]; // common path to all data we want

        var parkName = parkData.fullName; // full name in a string
        var titleEl = document.createElement("p");
        titleEl.textContent = parkName;
        headerEl.appendChild(titleEl);


        var parkActivities = parkData.activities; // array of park activities
        for (i = 0; i < parkActivities.length; i++) { // loop over parkActivites array...
          var newLiEl = document.createElement("li"); // create a new li element
          var newCheckbox = document.createElement("input");
          newCheckbox.setAttribute("type", "checkbox");
          newCheckbox.setAttribute("id", "activity" + i);
          newCheckbox.setAttribute("class", "box");
          var newLabel = document.createElement("label");
          newLabel.setAttribute("for", "activity" + i);
          newLabel.textContent = parkActivities[i].name; // put the activity in the new li element's textContent
          newLiEl.appendChild(newCheckbox);
          newLiEl.appendChild(newLabel);
          activitiesList.appendChild(newLiEl); // append the new activity li element to the list of activities

          if (localStorage.getItem(parkActivities[i].name) !== null && localStorage.getItem(parkActivities[i].name) === "true") {
            
          }
        }


        var parkImages = parkData.images; // array of park images with alt texts, captions, credits, titles, and urls
        var randomImage = parkImages[Math.floor(Math.random()*parkImages.length)]; // random image from array
        var newImgEl = document.createElement("img"); // create element for image, using randomImage.url for src and randomImage.altText for alt attribute
        newImgEl.setAttribute("src", randomImage.url); // set image src as randomImage.url
        newImgEl.setAttribute("alt", randomImage.altText); // set image alt as randomImage.altText
        mainImage.appendChild(newImgEl); // append image element

        var imgCaption = document.createElement("p"); // create image caption element
        imgCaption.textContent = randomImage.caption + " (Credit: " + randomImage.credit + ")"; // set textContent with image description and credit
        mainImage.appendChild(imgCaption); // append caption element


        var parkDescription = parkData.description; // two-three sentence string describing park
        mainDescription.textContent = parkDescription + " For a list of activities available in the park, simply look to the left side of your screen!"; // append description element


        var parkDirections = parkData.directionsInfo; // two-three sentence string describing route to park from nearby major cities
        var parkDirectionsUrl = parkData.directionsUrl; // url to NPS website with further directions(?)
        var newDirectionsUrlEl = document.createElement("a"); // create anchor element for link to directions
        mainDirections.textContent = parkDirections + " Further info can be found "; // set textContent (including url)
        newDirectionsUrlEl.setAttribute("href", parkDirectionsUrl); // set href of anchor to directions url
        newDirectionsUrlEl.textContent = "here."; // set textContent of anchor
        mainDirections.appendChild(newDirectionsUrlEl); // append anchor to end of directions element


        var parkClimate = parkData.weatherInfo; // string broadly describing standard temp ranges for every season
        mainClimate.textContent = parkClimate + " Up to date weather information is available from the weather widget on the right side of your screen.";


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
          mainFees.children[5].appendChild(newEntranceFeeEl);
        }
        

        var parkHours = parkData.operatingHours; // array of objects with description, and standard hours object listing hours for every day of the week individually
        // create/append element with general description of hours
        for (i = 0; i < parkHours.length; i++) {
          var newHoursTitleEl = document.createElement("h3");
          newHoursTitleEl.textContent = parkHours[i].name;
          mainHours.appendChild(newHoursTitleEl);

          var newHoursDescriptionEl = document.createElement("p");
          newHoursDescriptionEl.textContent = parkHours[i].description;
          mainHours.appendChild(newHoursDescriptionEl);

          // create/append "standard hours" info for every day of the week
          var newHoursUl = document.createElement("ul");
          var weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          for (n = 0; n < 7; n++) {
            eval("var dailyHours = parkHours[i].standardHours." + weekdays[n]);
            var hoursString = weekdays[n] + ": " + dailyHours;
            hoursString = hoursString.charAt(0).toUpperCase() + hoursString.slice(1);
            var newHoursLi = document.createElement("li");
            newHoursLi.textContent = hoursString;
            newHoursUl.appendChild(newHoursLi);
          }
          mainHours.appendChild(newHoursUl);

          // if (parkHours[i].exceptions.length != 0) {
          //   var yesExceptionsEl = document.createElement("h4");
          //   yesExceptionsEl.textContent = "Exceptions:";
          //   mainHours.appendChild(yesExceptionsEl);

          //   for (x = 0; x < parkHours[i].exceptions.length; x++) {
          //     var exceptionDates = document.createElement("h5");
          //     exceptionDates.textContent = "Dates: " + parkHours[i].exceptions[x].startDate + " to " + parkHours[i].exceptions[x].endDate;
          //     mainHours.appendChild(exceptionDates)
            
          //     var newExceptionsUl = document.createElement("ul");
          //     for (n = 0; n < 7; n++) {
          //       eval("var dailyExceptions = parkHours[i].exceptions[x].exceptionHours." + weekdays[n]);
          //       var exceptionsString = weekdays[n] + ": " + dailyExceptions;
          //       exceptionsString = exceptionsString.charAt(0).toUpperCase() + exceptionsString.slice(1);
          //       var newExceptionsLi = document.createElement("li");
          //       newExceptionsLi.textContent = exceptionsString;
          //       newExceptionsUl.appendChild(newExceptionsLi);
          //     }
          //     mainHours.appendChild(newExceptionsUl);
          //   }
          // }

          var breakEl = document.createElement("br");
          mainHours.appendChild(breakEl);
        }

        // footer: addresses, phone numbers, email addresses, url for official NPS park site
        var parkAddress = parkData.addresses;
        var addressEl = document.querySelector(".footerLinks").children[3];
        addressEl.textContent ="Address: "+parkAddress[0].line1+", "+parkAddress[0].line2+", "+parkAddress[0].city+", "+parkAddress[0].stateCode+" "+parkAddress[0].postalCode;

        var parkPhone = parkData.contacts.phoneNumbers;
        var phoneEl = document.querySelector(".footerLinks").children[2];
        phoneEl.textContent="Phone: "+parkPhone[0].phoneNumber

        var parkEmail = parkData.contacts.emailAddresses;
        var emailEl = document.querySelector(".footerLinks").children[1];
        emailEl.textContent="Email: "+parkEmail[0].emailAddress

        var parkURL = parkData.url;
        var urlEl = document.querySelector(".footerLinks").children[0].children[0];
        urlEl.setAttribute("href", parkURL)
    });
  }
});

//var parkWeather = parkData.weatherInfo
//var parkFiveDayWeather = parkData.FiveDayWeatherInfo

fetch(weatherUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      var parkTemp = data.main.temp; 
      var tempEl = document.querySelector("#current-weather").children[0];
      tempEl.textContent = "Temperature: "+ parkTemp + "°F";
        
      var parkFeels_like = data.main.feels_like
      var feelsEl = document.querySelector("#current-weather").children[1];
      feelsEl.textContent = "Feels Like: "+ parkFeels_like + "°F"
        
      var parkTemp_min = data.main.temp_min
      var temp_minEl = document.querySelector("#current-weather").children[2];
      temp_minEl.textContent = "Low: "+ parkTemp_min + "°F"
        
      var parkTemp_max = data.main.temp_max
      var temp_maxEl = document.querySelector("#current-weather").children[3];
      temp_maxEl.textContent = "High: "+ parkTemp_max + "°F"
        
      var weather = data.weather[0].main
      var weatherEl = document.querySelector("#current-weather").children[4];
      weatherEl.textContent = "Current weather: "+ weather
        
      var weatherID = data.weather[0].id
      var recommendationEl = document.querySelector("#current-weather").children[5];
      if(weatherID <600){
        recommendationEl.textContent = "Bring an umbrella"
      } else if (weatherID <700){
        recommendationEl.textContent = "Wear snow boots" 
      } else if (weatherID ==800){
        recommendationEl.textContent = "Wear sunscreen"
      } else if (weatherID ==711){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==731){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==751){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==761){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==762){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==771){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==781){
        recommendationEl.textContent = "Stay away!"
      } else if (weatherID ==741){
        recommendationEl.textContent = "visibility is poor"
      } else{
        recommendationEl.textContent = ""
      }
    });
  }
});

function renderForecastList(data){
  var temp = data.main.temp;
  var feelsLike = data.main.feels_like;
  var humidity = data.main.humidity;
  var windSpeed = data.wind.speed;
  var daytime = data.dt_txt;

  var listContainerEl = document.createElement("ul");
  var listItemOne = document.createElement("li");
  var listItemTwo = document.createElement("li");
  var listItemThree = document.createElement("li");
  var listItemFour = document.createElement("li");
  var listItemZero = document.createElement("li");
  listItemZero.textContent = daytime;
  listItemOne.textContent = "Temp: " + temp + "°F";
  listItemTwo.textContent = "Feels Like: " + feelsLike + "°F";
  listItemThree.textContent = "Humidity: " + humidity + "%";
  listItemFour.textContent = "Wind Speed: " + windSpeed + "MPH";
  listContainerEl.setAttribute("class", "mb-3");
  listContainerEl.appendChild(listItemZero);
  listContainerEl.appendChild(listItemOne);
  listContainerEl.appendChild(listItemTwo);
  listContainerEl.appendChild(listItemThree);
  listContainerEl.appendChild(listItemFour);
  forecastContainerEl.append(listContainerEl);

}

fetch(weatherFiveDayUrl).then(function (response) {
  if (response.ok) {
    response.json().then(function (data) {
      console.log(data);
      var forecastData = data.list; // common path to all data we want
      var dayOneList = document.querySelector("#dayone-weather")
      for (let index = 4; index < forecastData.length; index+=8) {
        //console.log(data.list[index].main.temp);
        renderForecastList(data.list[index])
        // var specificforecast = forecastData[index];
        // var parkTemp = specificforecast.main.temp; 
        // var tempEl = document.querySelector("#current-weather").children[0];
        // tempEl.textContent = "temperature: "+ parkTemp + "F";
        
        // var parkFeels_like = specificforecast.main.feels_like
        // var feelsEl = document.querySelector("#current-weather").children[1];
        // feelsEl.textContent = parkFeels_like
        
        // var parkTemp_min = specificforecast.main.temp_min
        // var temp_minEl = document.querySelector("#current-weather").children[2];
        // temp_minEl.textContent = parkTemp_min
        
        // var parkTemp_max = specificforecast.main.temp_max
        // var temp_maxEl = document.querySelector("#current-weather").children[3];
        // temp_maxEl.textContent = parkTemp_max
      }
      
      // var parkFiveDayWeather = parkData.FiveDayWeather ; full name in a string
      // var titleEl = document.createElement("");
      // titleEl.textContent = parkName;
      // headerEl.appendChild(titleEl);
    });
  }
});

var boxes = document.getElementsByClassName("box");

function saveActivities() {
  for (i = 0; i < boxes.length; i++) {
    var checkbox = document.getElementById("activity" + i);
    var activityName = checkbox.nextElementSibling.textContent;
    window.localStorage.setItem(activityName, checkbox.checked.toString());
    // console.log(activityName + ": " + localStorage.getItem(activityName));
  }

  // console.log(localStorage.getItem("Astronomy"));
}

activitiesList.addEventListener("change", saveActivities);