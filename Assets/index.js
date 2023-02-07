let apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";
let savedSearches = [];

var createSearchHistoryEntry = (cityName) => {
    var searchHistoryEntry = $("<p>");
    searchHistoryEntry.addClass("past-search");
    searchHistoryEntry.text(cityName);
    return searchHistoryEntry;
};

var createSearchHistoryContainer = (searchHistoryEntry) => {
    var searchEntryContainer = $("<div");
    searchEntryContainer.addClass("past-search-container");
    searchEntryContainer.append(searchHistoryEntry);
    return searchEntryContainer;
};

var appendHistoryToContainer = (searchHistoryEntry) => {
    var searchHistoryContainerEl = $("#previous-history-container");
    searchHistoryContainerEl.append(searchHistoryContainer);
};

var updateSavedSearches = (cityName) => {
    var previousSavedSearches = localStorage.getItem("savedSearches");
    savedSearches = previousSavedSearches
        ? JSON.parse(previousSavedSearches)
        : [];
    savedSearches.push(cityName);
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
};

var resetSearchInput = () => {
    $("#search-input").val("");
  };

var searchHistoryList = (cityName) => {
    $(".past-search:contains(" + cityName +")").remove();
    var searchHistoryEntry = createSearchHistoryEntry(cityName);
    var searchHistoryContainer =
        createSearchHistoryContainer(searchHistoryEntry);
    appendSearchHistoryToContainer(searchHistoryContainer);
    updateSavedSearches(cityName);
    resetSearchInput();
};

var getSavedSearchHistory = () => localStorage.getItem("savedSearches");

var parseSavedSearchHistory = (savedSearchHistory) =>
  savedSearchHistory ? JSON.parse(savedSearchHistory) : false;

var loadSearchHistory = () => {
    var savedSearchHistory = getSavedSearchHistory();
    var parsedSavedSearchHistory = parseSavedSearchHistory(savedSearchHistory);
    if (!parsedSavedSearchHistory) {
        return false;
    }
    parsedSavedSearchHistory.forEach(searchHistoryList);
};

var todayWeatherSection = async function (cityName) {
    try {
        var respone = await fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}'
        );
        var { coord } = await respone.json();
        var oneCallReponse = await fetch(
            'https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=${apiKey}'
        );
        var weatherData = await oneCallReponse.json();

        searchHistoryList(cityName);

        var currentWeatherContainer = $("#today-weather-conatiner");
        currentWeatherContainer.addClass("today-weather-container");
        
    }
}