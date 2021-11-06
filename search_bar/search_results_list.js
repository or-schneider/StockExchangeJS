import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

export class SearchResultsList{
    resultsTotal = 10;
    constructor(resultsListContainerNode){
        this.resultListContainerNode = resultsListContainerNode;
        this.init();
    }
    init(){
        this.companyPageLocalUrl = "./company/company.html";
        const resultNodesList = this.generateResultsListNode(this.resultsTotal);
        this.resultListContainerNode.appendChild(resultNodesList);

        this.hideResults(0);
    }
    generateResultsListNode(amount){
        const resultsListNode =document.createElement("ul"); 
        resultsListNode.classList.add("search-bar-results-list");
        
        const resultNodes = [];
        for (let i = 0; i < amount; i++) {
            
            const resultNode = document.createElement("li");
            resultNode.classList.add("search-bar-results-list-result");

            const imageNode = document.createElement("img");
            imageNode.classList.add("search-bar-results-list-result-image");
            imageNode.alt="logo";
            resultNode.appendChild(imageNode)
            
            const textContainerNode = document.createElement("div");
            textContainerNode.classList.add("search-bar-results-list-result-text-container");
            resultNode.appendChild(textContainerNode)
            
            const linkNode = document.createElement("a");
            linkNode.classList.add("search-bar-results-list-result-link");
            textContainerNode.appendChild(linkNode)
            
            const nameNode = document.createElement("span");
            nameNode.classList.add("search-bar-results-list-result-company-name");
            linkNode.appendChild(nameNode);
            
            const textAsideContainerNode = document.createElement("div");
            textAsideContainerNode.classList.add("search-bar-results-list-result-text-aside-container");
            textContainerNode.appendChild(textAsideContainerNode)
            
            const symbolNode = document.createElement("span");
            symbolNode.classList.add("search-bar-results-list-result-symbol");
            textAsideContainerNode.appendChild(symbolNode);
            
            const priceChangesNode = document.createElement("span");
            priceChangesNode.classList.add("search-bar-results-list-result-price-changes");
            priceChangesNode.classList.add("price-changes");
            textAsideContainerNode.appendChild(priceChangesNode);
            
            resultNodes.push(resultNode);
            resultsListNode.appendChild(resultNode);    

        }
        this.resultNodes = resultNodes;
        return resultsListNode;
    }
    hideResults(startIndex){
        for (let i = startIndex; i < this.resultNodes.length; i++) {
            const resultNode = this.resultNodes[i];
            resultNode.classList.add("d-none");
        }
        if(startIndex==0)
            this.resultListContainerNode.classList.add("d-none");
    }
    showResults(endIndex){
        if(endIndex>0)
            this.resultListContainerNode.classList.remove("d-none");
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
            linkNode.href = `${this.companyPageLocalUrl}?symbol=${symbol}`
            let priceChangesNode = resultNode.querySelector(".search-bar-results-list-result-price-changes");
            updatePriceChangesNode(priceChangesNode,profile.changesPercentage);
            
            let imageNode = resultNode.querySelector(".search-bar-results-list-result-image");
            imageNode.src = profile.image;
            

        }
        this.hideResults(endIndex);
    }
}