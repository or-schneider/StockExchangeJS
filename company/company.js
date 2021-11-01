const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const companyProfileApiUrl = `${STOCK_EXCHANGE_API_ROOT_URL}company/profile/`

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
    console.log(companyData);

}
refresh();