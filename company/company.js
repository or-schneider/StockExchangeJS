const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const companyProfileApiUrl = `${STOCK_EXCHANGE_API_ROOT_URL}company/profile/`

const imageNode = document.getElementById("companyProfileImage");
const nameNode = document.getElementById("companyProfileName");
const linkNode = document.getElementById("companyProfileHeaderLink");
const stockPriceNode = document.getElementById("companyProfileStockPrice");
const stockPriceChangesNode = document.getElementById("companyProfileStockPriceChanges");
const descriptionNode = document.getElementById("companyProfileStockDescription");

async function fetchCompanyDataAsync(symbol){
    const url = `${companyProfileApiUrl}${symbol}`

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

async function refresh(){
    let companyData = await fetchCompanyDataAsync(params.symbol);
    updateProfileView(companyData.profile);
    
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
refresh();