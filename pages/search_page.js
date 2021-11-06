import {SearchBar} from "../search_bar/search_bar.js"
import {SearchResultsList} from "../search_bar/search_results_list.js";
import {ActiveStocksMarquee} from "../active_stocks_marquee/active_stocks_marquee.js"

const marqueeNode = document.getElementById("activeStocksMarquee");
const resultsListNode = document.getElementById("searchBarResultsList");
const searchBarNode = document.getElementById('searchBar');
const searchBar = new SearchBar(searchBarNode);
const searchResultsList = new SearchResultsList(resultsListNode);
const activeStocksMarquee = new ActiveStocksMarquee(marqueeNode);
activeStocksMarquee.load();

searchBar.onSearch((searchQuery, companies) => searchResultsList.renderResults(searchQuery, companies))
