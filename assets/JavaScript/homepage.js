var searchButton = document.querySelector("#explore");

function handleSearchFormSubmit (event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("select").value;
    searchInputVal = searchInputVal.replaceAll(" ", "");

    location.href="./single-park.html?searchTerm="+searchInputVal;
}

searchButton.addEventListener("click", handleSearchFormSubmit);