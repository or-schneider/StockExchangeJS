import {fetchAsync} from "../scripts/fetch_async.js";
import {fetchCompanyDataAsync} from "../company_profile/company_profile_api.js";

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
        // this.resultsLoaderNode = document.getElementById("searchBarResultsLoader");
        
        
        this.generate(this.searchBarNode);

        this.inputButtonNode.addEventListener('click',this.submitSearch.bind(this));
    }
    generate(searchBarNode){
        let searchBarForm = document.createElement("form");
        searchBarForm.classList.add("search-bar-input-container");
        searchBarNode.appendChild(searchBarForm);

        const inputBoxNode = document.createElement("div");
        inputBoxNode.classList.add("input-box");
        searchBarForm.appendChild(inputBoxNode);
        
        this.inputNode = document.createElement("input");
        this.inputNode.classList.add("search-bar-input");
        this.inputNode.placeholder = "Search for company stock symbol"
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
        
    }
    onSearch(listener){
        this.onSearchListeners.push(listener);
    }
    submitSearch(event){
        event.preventDefault();
        this.search(this.inputNode.value);   
    }
    async search(searchQuery){
        this.resultsLoaderNode.classList.remove("d-none");
        try {
            let results = await this.fetchResults(searchQuery);
            
            let companyProfiles = [];
            for (const result of results) {
                let companyProfile = await fetchCompanyDataAsync(result.symbol);
                companyProfiles.push(companyProfile);
            }
            for (const listener of this.onSearchListeners) {
                listener(searchQuery, companyProfiles);
            }
        } catch (error) {
            console.log(error);
        }
        finally{
            this.resultsLoaderNode.classList.add("d-none");
        }
    }
    async fetchResults(searchTarget){
        const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`
        let data = fetchAsync(url);
        return data;
    }
}
