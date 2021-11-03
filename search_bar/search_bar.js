import {fetchAsync} from "../scripts/fetchAsync.js";
import {fetchCompanyDataAsync} from "../company/companyProfile.js";
import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

class SearchBar{
    inputButtonNode;
    inputNode = document;
    resultsLoaderNode;
    resultsListNode;

    resultLocalUrl = "./company/company.html";

    constructor(){
        this.init();    
    }
    init(){
        this.inputButtonNode = document.getElementById("searchBarInputButton");
        this.inputNode = document.getElementById("searchBarInput");
        this.resultsLoaderNode = document.getElementById("searchBarResultsLoader");
        this.resultsListNode = document.getElementById("searchBarResultsList");
        this.resultNodes = this.resultsListNode.querySelectorAll(".search-bar-results-list-result");

        this.inputButtonNode.addEventListener('click',this.submitSearch.bind(this))
        this.hideResults(0);
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
        this.updateResults(results,companyProfiles)

        this.resultsLoaderNode.classList.add("d-none");
    }
    hideResults(startIndex){
        for (let i = startIndex; i < this.resultNodes.length; i++) {
            const resultNode = this.resultNodes[i];
            resultNode.classList.add("d-none");
        }
        if(startIndex==0)
            this.resultsListNode.classList.add("d-none");
    }
    showResults(endIndex){
        if(endIndex>0)
            this.resultsListNode.classList.remove("d-none");
        for (let i = 0; i < endIndex; i++) {
            const resultNode = this.resultNodes[i];
            resultNode.classList.remove("d-none");
        }
    }

    async fetchResults(searchTarget){
        const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`
        let data = fetchAsync(url);
        return data;
    }
    updateResults(results,companyProfiles){
        let endIndex = Math.min(results.length,this.resultNodes.length);
        this.showResults(endIndex);
        for (let i = 0; i < endIndex; i++) {
            let result = results[i];
            let resultNode = this.resultNodes[i];

            let companyNameNode = resultNode.querySelector(".search-bar-results-list-result-company-name");
            companyNameNode.textContent = result.name;
            
            let symbolNode = resultNode.querySelector(".search-bar-results-list-result-symbol");
            symbolNode.textContent = `(${result.symbol})`;

            let linkNode = resultNode.querySelector(".search-bar-results-list-result-link");
            linkNode.href = `${this.resultLocalUrl}?symbol=${result.symbol}`
            let priceChangesNode = resultNode.querySelector(".search-bar-results-list-result-price-changes");
            updatePriceChangesNode(priceChangesNode,companyProfiles[i].profile.changesPercentage);
            
            let imageNode = resultNode.querySelector(".search-bar-results-list-result-image");
            imageNode.src = companyProfiles[i].profile.image;
            

        }
        this.hideResults(endIndex);
    }

}

new SearchBar();
