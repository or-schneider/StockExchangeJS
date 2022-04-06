import { fetchAsync } from "../scripts/fetch_async.js";
import { fetchCompaniesDataAsync } from "../company_profile/company_profile_api.js";

export class SearchBar {
  rootNode;
  inputButtonNode;
  resultsLoaderNode;

  onSearchListeners = [];
  lastSearchQuery = "";
  autoSearchDelayDuration = 400;
  autoSearchCooldownTimeout = undefined;
  constructor(rootNode) {
    this.rootNode = rootNode;
    this.init();
  }
  init() {
    const searchBarForm = this.generate();
    this.rootNode.appendChild(searchBarForm);

    this.inputButtonNode.addEventListener(
      "click",
      this.submitSearch.bind(this)
    );

    this.autoSearch = this.autoSearch.bind(this);
  }
  generate() {
    const searchBarForm = document.createElement("form");
    searchBarForm.classList.add("search-bar-input-container");

    const inputBoxNode = document.createElement("div");
    inputBoxNode.classList.add("input-box");
    searchBarForm.appendChild(inputBoxNode);

    this.inputNode = document.createElement("input");
    this.inputNode.classList.add("search-bar-input");
    this.inputNode.placeholder = "Search for company stock symbol";
    inputBoxNode.appendChild(this.inputNode);

    this.resultsLoaderNode = document.createElement("div");
    this.resultsLoaderNode.classList.add("lds-dual-ring");
    this.resultsLoaderNode.classList.add("input-box-loader");
    this.resultsLoaderNode.classList.add("d-none");
    inputBoxNode.appendChild(this.resultsLoaderNode);

    this.inputButtonNode = document.createElement("input");
    this.inputButtonNode.classList.add("button");
    this.inputButtonNode.classList.add("search-bar-input-button");
    this.inputButtonNode.type = "submit";
    this.inputButtonNode.value = "Search";
    searchBarForm.appendChild(this.inputButtonNode);

    return searchBarForm;
  }
  activateAutoSearch() {
    this.inputNode.addEventListener("input", this.autoSearch);
  }
  deactivateAutoSearch() {
    this.inputNode.removeEventListener("input", this.autoSearch);
  }
  abortAutoSearchInProgress() {
    if (this.autoSearchCooldownTimeout) {
      window.clearTimeout(this.autoSearchCooldownTimeout);
      this.autoSearchCooldownTimeout = undefined;
    }
  }
  autoSearch() {
    const inputValue = this.inputNode.value;

    this.abortAutoSearchInProgress();

    this.autoSearchCooldownTimeout = setTimeout(() => {
      this.abortAutoSearchInProgress();

      if (inputValue == "") return;
      if (inputValue == this.lastSearchQuery) return;

      // console.log(inputValue);
      this.search(inputValue);
    }, this.autoSearchDelayDuration);
  }
  onSearch(listener) {
    this.onSearchListeners.push(listener);
  }
  submitSearch(event) {
    event.preventDefault();
    this.abortAutoSearchInProgress();

    this.search(this.inputNode.value);
  }
  async search(searchQuery) {
    this.lastSearchQuery = searchQuery;
    this.resultsLoaderNode.classList.remove("d-none");
    try {
      const results = await this.fetchResults(searchQuery);
      const symbols = results.map((result) => result.symbol);
      const companyProfiles = await fetchCompaniesDataAsync(symbols);

      if (this.lastSearchQuery != searchQuery)
        //Abort search as a new search is underway
        return;

      const searchQueryUrlParam = `?query=${searchQuery}`;
      history.replaceState({}, "", searchQueryUrlParam);

      for (const listener of this.onSearchListeners) {
        listener(searchQuery, companyProfiles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.resultsLoaderNode.classList.add("d-none");
    }
  }
  async fetchResults(searchTarget) {
    const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`;
    const data = fetchAsync(url);
    return data;
  }
}
