import {fetchAsync} from "../scripts/fetch_async.js";

const historicalPriceApiUrl = `${STOCK_EXCHANGE_API_ROOT_URL}historical-price-full/`

export async function fetchCompanyDataAsync(symbol){
    const url = `${STOCK_EXCHANGE_API_COMPANY_PROFILE_URL}${symbol}`
    let data = await fetchAsync(url);
    
    return data;
}
export async function fetchHistoricalPriceAsync(symbol){
    const url = `${historicalPriceApiUrl}${symbol}?serietype=line`

    let data = await fetchAsync(url);
    
    return data;
}
