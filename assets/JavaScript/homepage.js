var backgroundPath = "./assets/images/backgrounds/"; // file path to background images
var backgrounds = ["acadia.jpg", "glacier.jpg", "grandcanyon.jpg", "grandteton.jpg", "greatsmokymountains.jpg", "rockymountain.jpg", "yellowstone.jpg", "yosemite.jpg"]; // array of background image file names, one per park
var randomBackground = backgroundPath + backgrounds[Math.floor(Math.random()*backgrounds.length)]; // selects random background pathway

document.body.style.backgroundImage = "url(" + randomBackground + ")"; // sets body's backgroundImage


var searchButton = document.querySelector("#explore"); // search button element

function handleSearchFormSubmit (event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("select").value; // save user's chosen park from dropdown to variable
    searchInputVal = searchInputVal.replaceAll(" ", ""); // remove all spaces from chosen park's string for location.href (e.g. "great Smoky Mountains" -> "GreatSmokyMountains")

    location.href="./single-park.html?searchTerm=" + searchInputVal; // change to single-park.html with user's chosen park in the query
}

searchButton.addEventListener("click", handleSearchFormSubmit); // event listener for search button