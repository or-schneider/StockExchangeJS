import * as companyGraph from "./companyProfileChart.js";
import { fetchAsync } from "../scripts/fetchAsync.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const historicalPriceApiUrl = `${STOCK_EXCHANGE_API_ROOT_URL}historical-price-full/`

const contentContainerNode = document.getElementById("companyProfileContentContainer");
const loaderNode = document.getElementById("companyProfileLoader");
const imageNode = document.getElementById("companyProfileImage");
const nameNode = document.getElementById("companyProfileName");
const linkNode = document.getElementById("companyProfileHeaderLink");
const stockPriceNode = document.getElementById("companyProfileStockPrice");
const stockPriceChangesNode = document.getElementById("companyProfileStockPriceChanges");
const descriptionNode = document.getElementById("companyProfileStockDescription");

async function fetchCompanyDataAsync(symbol){
    const url = `${STOCK_EXCHANGE_API_COMPANY_PROFILE_URL}${symbol}`
    let data = await fetchAsync(url);
    
    return data;
}
async function fetchHistoricalPriceAsync(symbol){
    const url = `${historicalPriceApiUrl}${symbol}?serietype=line`

    let data = await fetchAsync(url);
    
    return data;
}

async function refresh(){
    loaderNode.classList.remove("d-none");
    let companyData = await fetchCompanyDataAsync(params.symbol);
    updateProfileView(companyData.profile);
    let historicalPriceData = await fetchHistoricalPriceAsync(params.symbol);

    companyGraph.updateGraph(historicalPriceData);

    contentContainerNode.classList.remove("d-none");
    loaderNode.classList.add("d-none");
}
function updateProfileView(profileData){
    imageNode.src = profileData.image;
    nameNode.textContent = profileData.companyName;
    stockPriceNode.textContent = profileData.price;
    updateStockPriceChangesView(profileData.changesPercentage);
    descriptionNode.textContent = profileData.description;
    linkNode.href = profileData.website;
}
function updateStockPriceChangesView(changesPercentage){
    stockPriceChangesNode.textContent = changesPercentage;
    if(changesPercentage>=0){
        stockPriceChangesNode.classList.add("price-changes-positive")
        stockPriceChangesNode.classList.remove("price-changes-negative")
    }
    else{
        stockPriceChangesNode.classList.add("price-changes-negative")
        stockPriceChangesNode.classList.remove("price-changes-positive")
    }
}
function init(){
    contentContainerNode.classList.add("d-none");
    loaderNode.classList.add("d-none");
    refresh();
}
init();