import {SearchBar} from "../search_bar/search_bar.js"
import {SearchResultsList} from "../search_bar/search_results_list.js";
import {ActiveStocksMarquee} from "../active_stocks_marquee/active_stocks_marquee.js"
import { CompanyComparisonList } from "../search_bar/company_comparison_list.js";

const marqueeNode = document.getElementById("activeStocksMarquee");
const resultsListNode = document.getElementById("searchBarResultsList");
const searchBarNode = document.getElementById('searchBar');
const comparisonListNode = document.getElementById('companyComparisonList');

const searchBar = new SearchBar(searchBarNode);
const searchResultsList = new SearchResultsList(resultsListNode);
const activeStocksMarquee = new ActiveStocksMarquee(marqueeNode);
const comparisonList = new CompanyComparisonList(comparisonListNode);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if(params.query){
    searchBar.search(params.query);
}

searchBar.activateAutoSearch();

activeStocksMarquee.load();

searchBar.onSearch((searchQuery, companies) => searchResultsList.renderResults(searchQuery, companies))

searchResultsList.onCompareClick(comparisonList.add.bind(comparisonList))