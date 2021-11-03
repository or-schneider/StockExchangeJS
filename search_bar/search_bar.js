import {fetchAsync} from "../scripts/fetch_async.js";
import {fetchCompanyDataAsync} from "../company/company_profile.js";

export class SearchBar{
    inputButtonNode;
    inputNode = document;
    resultsLoaderNode;

    onSearchListeners = [];

    constructor(){
        this.init();    
    }
    init(){
        this.inputButtonNode = document.getElementById("searchBarInputButton");
        this.inputNode = document.getElementById("searchBarInput");
        this.resultsLoaderNode = document.getElementById("searchBarResultsLoader");

        this.inputButtonNode.addEventListener('click',this.submitSearch.bind(this))
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
