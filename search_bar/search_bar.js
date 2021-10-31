const inputButtonNode = document.getElementById("searchBarInputButton");
const inputNode = document.getElementById("searchBarInput");
const resultsListNode = document.getElementById("searchBarResultsList");
const resultNodes = resultsListNode.querySelectorAll(".search-bar-results-list-result");

function hideResults(startIndex){
    for (let i = startIndex; i < resultNodes.length; i++) {
        const resultNode = resultNodes[i];
        resultNode.classList.add("d-none");
        
    }
}
function showResults(endIndex){
    for (let i = 0; i < endIndex; i++) {
        const resultNode = resultNodes[i];
        resultNode.classList.remove("d-none");
    }
}
function searchClick(){
    search(inputNode.value);   
}
async function search(searchString){
    let results = await fetchResults(searchString);
    updateResults(results)
}
async function fetchResults(searchTarget){
    const url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchTarget}&limit=10&exchange=NASDAQ`
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
    showResults(results.length);
    for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const resultNode = resultNodes[i];
    }
}
inputButtonNode.addEventListener('click',searchClick)
hideResults(0);