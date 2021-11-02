import {fetchAsync} from "../scripts/fetchAsync.js";
import {fetchCompanyDataAsync} from "../company/companyProfile.js";
import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

const inputButtonNode = document.getElementById("searchBarInputButton");
const inputNode = document.getElementById("searchBarInput");
const resultsLoaderNode = document.getElementById("searchBarResultsLoader");
const resultsListNode = document.getElementById("searchBarResultsList");
const resultNodes = resultsListNode.querySelectorAll(".search-bar-results-list-result");

const resultLocalUrl = "./company/company.html";
function hideResults(startIndex){
    for (let i = startIndex; i < resultNodes.length; i++) {
        const resultNode = resultNodes[i];
        resultNode.classList.add("d-none");
    }
    if(startIndex==0)
        resultsListNode.classList.add("d-none");
}
function showResults(endIndex){
    if(endIndex>0)
        resultsListNode.classList.remove("d-none");
    for (let i = 0; i < endIndex; i++) {
        const resultNode = resultNodes[i];
        resultNode.classList.remove("d-none");
    }
}
function searchClick(){
    search(inputNode.value);   
}
async function search(searchString){
    resultsLoaderNode.classList.remove("d-none");
    
    let results = await fetchResults(searchString);
    
    resultsLoaderNode.classList.add("d-none");

    let companyProfiles = [];
    for (const result of results) {
        let companyProfile = await fetchCompanyDataAsync(result.symbol);
        companyProfiles.push(companyProfile);
    }
    updateResults(results,companyProfiles)
}
async function fetchResults(searchTarget){
    const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`
    let data = fetchAsync(url);
    return data;
}
function updateResults(results,companyProfiles){
    let endIndex = Math.min(results.length,resultNodes.length);
    showResults(endIndex);
    for (let i = 0; i < endIndex; i++) {
        let result = results[i];
        let resultNode = resultNodes[i];

        let companyNameNode = resultNode.querySelector(".search-bar-results-list-result-company-name");
        companyNameNode.textContent = result.name;
        
        let symbolNode = resultNode.querySelector(".search-bar-results-list-result-symbol");
        symbolNode.textContent = `(${result.symbol})`;

        let linkNode = resultNode.querySelector(".search-bar-results-list-result-link");
        linkNode.href = `${resultLocalUrl}?symbol=${result.symbol}`
        let priceChangesNode = resultNode.querySelector(".search-bar-results-list-result-price-changes");
        updatePriceChangesNode(priceChangesNode,companyProfiles[i].profile.changesPercentage);
        
        let imageNode = resultNode.querySelector(".search-bar-results-list-result-image");
        imageNode.src = companyProfiles[i].profile.image;
        

    }
    hideResults(endIndex);

}
inputButtonNode.addEventListener('click',searchClick)
hideResults(0);