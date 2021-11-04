import {fetchAsync} from "../scripts/fetch_async.js";
import {fetchCompanyDataAsync} from "../company/company_profile.js";

export class SearchBar{
    searchBarNode;
    inputButtonNode;
    inputNode = document;
    resultsLoaderNode;

    onSearchListeners = [];

    constructor(searchBarNode){
        this.searchBarNode = searchBarNode;
        this.init();    
    }
    init(){
        // this.inputButtonNode = document.getElementById("searchBarInputButton");
        // this.inputNode = document.getElementById("searchBarInput");
        this.resultsLoaderNode = document.getElementById("searchBarResultsLoader");
        
        
        this.generate(this.searchBarNode);

        this.inputButtonNode.addEventListener('click',this.submitSearch.bind(this));
    }
    generate(searchBarNode){
        let searchBarForm = document.createElement("form");
        searchBarForm.classList.add("search-bar-input-container");
        searchBarNode.appendChild(searchBarForm);

        this.inputNode = document.createElement("input");
        this.inputNode.classList.add("search-bar-input");
        searchBarForm.appendChild(this.inputNode);
        
        this.inputButtonNode = document.createElement("input");
        this.inputButtonNode.classList.add("button");
        this.inputButtonNode.classList.add("search-bar-input-button");
        this.inputButtonNode.type = "submit";
        this.inputButtonNode.textContent = "Search";
        searchBarForm.appendChild(this.inputButtonNode);
        
    }
    onSearch(listener){
        this.onSearchListeners.push(listener);
    }
    submitSearch(event){
        event.preventDefault();
        this.search(this.inputNode.value);   
    }
    async search(searchString){
        this.resultsLoaderNode.classList.remove("d-none");
        
        let results = await this.fetchResults(searchString);

        let companyProfiles = [];
        for (const result of results) {
            let companyProfile = await fetchCompanyDataAsync(result.symbol);
            companyProfiles.push(companyProfile);
        }
        for (const listener of this.onSearchListeners) {
            listener(companyProfiles);
        }

        this.resultsLoaderNode.classList.add("d-none");
    }
    async fetchResults(searchTarget){
        const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`
        let data = fetchAsync(url);
        return data;
    }
}
