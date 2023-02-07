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
