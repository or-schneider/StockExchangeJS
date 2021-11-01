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

    updateResults(results)
}
async function fetchResults(searchTarget){
    const url = `${STOCK_EXCHANGE_API_ROOT_URL}search?query=${searchTarget}&limit=10&exchange=NASDAQ`
    let response = await fetch(url);
    let data;
    let contentType = response.headers.get("content-type");
    if(contentType.includes('application/json')){
        data = await response.json();
    }
    else{
        throw new Error("Unhandled contentType "+contentType);
    }
    
    return data;
}
function updateResults(results){
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
        

    }
    hideResults(endIndex);

}
inputButtonNode.addEventListener('click',searchClick)
hideResults(0);