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

    imageNode.src = companyData.profile.image;
    nameNode.textContent = companyData.profile.companyName;
    stockPriceNode.textContent = companyData.profile.price;
    stockPriceChangesNode.textContent = companyData.profile.changesPercentage;
    descriptionNode.textContent = companyData.profile.description;
    linkNode.href = companyData.profile.website;
}
refresh();