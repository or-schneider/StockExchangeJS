import { SearchBar } from "../search_bar/search_bar.js";
import { SearchResultsList } from "../search_bar/search_results_list.js";
import { ActiveStocksMarquee } from "../active_stocks_marquee/active_stocks_marquee.js";
import { CompanyComparisonList } from "../search_bar/company_comparison_list.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const marqueeNode = document.getElementById("activeStocksMarquee");
const comparisonListNode = document.getElementById("companyComparisonList");
const searchBarNode = document.getElementById("searchBar");
const resultsListNode = document.getElementById("searchBarResultsList");

const activeStocksMarquee = new ActiveStocksMarquee(marqueeNode);
const comparisonList = new CompanyComparisonList(comparisonListNode);
const searchBar = new SearchBar(searchBarNode);
const searchResultsList = new SearchResultsList(resultsListNode);

activeStocksMarquee.load();

if (params.query) {
  searchBar.inputNode.value = params.query;
  searchBar.search(params.query);
}

searchBar.activateAutoSearch();

searchBar.onSearch((searchQuery, companies) =>
  searchResultsList.renderResults(searchQuery, companies)
);

searchResultsList.onCompareClick(comparisonList.add.bind(comparisonList));
