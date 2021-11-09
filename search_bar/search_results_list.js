import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

export class SearchResultsList{
    compareButtonsToCompanies = new Map();
    onCompareListeners = []
    resultsTotal = 10;
    constructor(rootNode){
        this.rootNode = rootNode;
        this.init();
    }
    init(){
        this.companyPageLocalUrl = "./pages/company.html";
        const resultNodesList = this.generateResultsListNode(this.resultsTotal);
        this.rootNode.appendChild(resultNodesList);

        this.hideResults(0);
    }
    generateResultsListNode(amount){
        const resultsListNode =document.createElement("ul"); 
        resultsListNode.classList.add("search-bar-results-list");
        
        const resultNodes = [];
        for (let i = 0; i < amount; i++) {
            
            const resultNode = document.createElement("li");
            resultNode.classList.add("search-bar-results-list-result");

            const imageContainerNode = document.createElement("div");
            imageContainerNode.classList.add("search-bar-results-list-result-image-container");
            resultNode.appendChild(imageContainerNode)

            const imageNode = document.createElement("img");
            imageNode.classList.add("search-bar-results-list-result-image");
            imageNode.alt="logo";
            imageContainerNode.appendChild(imageNode)
            
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
            
            const compareButtonNode = document.createElement("button");
            compareButtonNode.classList.add("button");
            compareButtonNode.classList.add("search-bar-results-list-result-compare-button");
            compareButtonNode.type="submit";
            compareButtonNode.textContent = "Compare";
            compareButtonNode.addEventListener('click', this.compareButtonClick.bind(this))
            resultNode.appendChild(compareButtonNode);

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
            this.rootNode.classList.add("d-none");
    }
    showResults(endIndex){
        if(endIndex>0)
            this.rootNode.classList.remove("d-none");
        for (let i = 0; i < endIndex; i++) {
            const resultNode = this.resultNodes[i];
            resultNode.classList.remove("d-none");
        }
    }
    findSequencesOfText(query,text, isCaseSensitive){
        let originalText = text;
        if(!isCaseSensitive){
            query = query.toLowerCase();
            text = text.toLowerCase();
        }
        const foundSequences = []

        let activeSequence = [];
        let activeSequenceStartIndex;

        for (let i = 0; i < text.length; i++){
            const letter = text[i];
            if (letter != query[activeSequence.length]){
                if(activeSequence.length>0)
                    activeSequence = [];
            }
            if (letter == query[activeSequence.length]){
                if(activeSequence.length == 0){
                    activeSequenceStartIndex = i;
                }
                activeSequence.push(originalText[i]);
                if(activeSequence.length == query.length)
                {
                    foundSequences.push({"startIndex":activeSequenceStartIndex,"text":activeSequence})
                    activeSequence=[];
                }
            }
        }
        return foundSequences;
    }
    highlightNodeText(queryToHighlight,targetNode){

        queryToHighlight = queryToHighlight.toLowerCase();
        const text = targetNode.textContent;

        const sequencesToHighlight = this.findSequencesOfText(queryToHighlight,text,false)
        
        if(sequencesToHighlight.length == 0)
            return
        targetNode.textContent = "";
        let textIndex = 0;
        
        for (const sequenceToHighlight of sequencesToHighlight) {
            if(sequenceToHighlight.startIndex>textIndex){
                const textNode = document.createTextNode(text.slice(textIndex,sequenceToHighlight.startIndex))
                textIndex = sequenceToHighlight.startIndex;
                targetNode.appendChild(textNode);
            }
            const highlightedNode = document.createElement("span");
            highlightedNode.classList.add("highlight-bg");
            highlightedNode.textContent = sequenceToHighlight.text.join('');
            textIndex += sequenceToHighlight.text.length;

            targetNode.appendChild(highlightedNode);
        }
        if(textIndex!=text.length){
            const textNode = document.createTextNode(text.slice(textIndex,text.length))
            targetNode.appendChild(textNode);
        }
    }
    renderResults(searchQuery, companyProfiles){
        let endIndex = Math.min(companyProfiles.length,this.resultNodes.length);
        this.showResults(endIndex);
        for (let i = 0; i < endIndex; i++) {

            let symbol = companyProfiles[i].symbol;
            let profile = companyProfiles[i].profile;
            let resultNode = this.resultNodes[i];

            let companyNameNode = resultNode.querySelector(".search-bar-results-list-result-company-name");
            companyNameNode.innerHTML ="";
            companyNameNode.textContent = profile.companyName;
            this.highlightNodeText(searchQuery, companyNameNode);

            let symbolNode = resultNode.querySelector(".search-bar-results-list-result-symbol");
            symbolNode.innerHTML ="";
            symbolNode.textContent = `(${symbol})`;
            this.highlightNodeText(searchQuery, symbolNode);

            let linkNode = resultNode.querySelector(".search-bar-results-list-result-link");
            linkNode.href = `${this.companyPageLocalUrl}?symbol=${symbol}`
            linkNode.title = profile.companyName;
            let priceChangesNode = resultNode.querySelector(".search-bar-results-list-result-price-changes");
            updatePriceChangesNode(priceChangesNode,profile.changesPercentage);
            
            let imageNode = resultNode.querySelector(".search-bar-results-list-result-image");
            imageNode.src = profile.image;
            
            let compareButtonNode = resultNode.querySelector(".search-bar-results-list-result-compare-button");
            this.compareButtonsToCompanies.set(compareButtonNode, companyProfiles[i]);
        }
        this.hideResults(endIndex);
    }
    compareButtonClick(event){
        const company = this.compareButtonsToCompanies.get(event.target);
        // this.addToCompanyComparison(company)
        this.onCompareListeners.forEach(callback => {
            callback(company);
        });
    }
    // addToCompanyComparison(company){
    //     console.log(company)
    // }
    onCompareClick(callback){
        this.onCompareListeners.push(callback);
    }
}