import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

export class SearchResultsList{
    resultsTotal = 10;
    constructor(){
        this.init();
    }
    init(){
        this.resultsListNode = document.getElementById("searchBarResultsList");
        this.resultNodes = this.resultsListNode.querySelectorAll(".search-bar-results-list-result");

        this.generateResultNodes(this.resultsTotal);
        this.hideResults(0);
    }
    generateResultNodes(){
        
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
    renderResults(companyProfiles){
        let endIndex = Math.min(companyProfiles.length,this.resultNodes.length);
        this.showResults(endIndex);
        for (let i = 0; i < endIndex; i++) {

            let symbol = companyProfiles[i].symbol;
            let profile = companyProfiles[i].profile;
            let resultNode = this.resultNodes[i];

            let companyNameNode = resultNode.querySelector(".search-bar-results-list-result-company-name");
            companyNameNode.textContent = profile.companyName;
            
            let symbolNode = resultNode.querySelector(".search-bar-results-list-result-symbol");
            symbolNode.textContent = `(${symbol})`;

            let linkNode = resultNode.querySelector(".search-bar-results-list-result-link");
            linkNode.href = `${this.resultLocalUrl}?symbol=${symbol}`
            let priceChangesNode = resultNode.querySelector(".search-bar-results-list-result-price-changes");
            updatePriceChangesNode(priceChangesNode,profile.changesPercentage);
            
            let imageNode = resultNode.querySelector(".search-bar-results-list-result-image");
            imageNode.src = profile.image;
            

        }
        this.hideResults(endIndex);
    }
}