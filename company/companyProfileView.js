import * as companyGraph from "./companyProfileChart.js";
import { fetchCompanyDataAsync,fetchHistoricalPriceAsync } from "./companyProfile.js";
import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


const contentContainerNode = document.getElementById("companyProfileContentContainer");
const loaderNode = document.getElementById("companyProfileLoader");
const imageNode = document.getElementById("companyProfileImage");
const nameNode = document.getElementById("companyProfileName");
const linkNode = document.getElementById("companyProfileHeaderLink");
const stockPriceNode = document.getElementById("companyProfileStockPrice");
const stockPriceChangesNode = document.getElementById("companyProfileStockPriceChanges");
const descriptionNode = document.getElementById("companyProfileStockDescription");


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
    updatePriceChangesNode(stockPriceChangesNode, profileData.changesPercentage)
    descriptionNode.textContent = profileData.description;
    linkNode.href = profileData.website;
}
function init(){
    contentContainerNode.classList.add("d-none");
    loaderNode.classList.add("d-none");
    refresh();
}
init();