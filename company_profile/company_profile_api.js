import {fetchAsync} from "../scripts/fetch_async.js";

const historicalPriceApiUrl = `${STOCK_EXCHANGE_API_ROOT_URL}historical-price-full/`
const companyProfileRequestMaxSymbols = 3;

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
export async function fetchCompaniesDataAsync(symbols){
    const companiesData = [];

    const symbolsChunks = convertSymbolsToChunks(companyProfileRequestMaxSymbols, symbols)

    const promises = [];
    for (const symbolsChunk of symbolsChunks) {

        const symbolsString = symbolsChunk.join(',');

        const url = `${STOCK_EXCHANGE_API_COMPANY_PROFILE_URL}${symbolsString}`
        let promise = fetchAsync(url);
        promises.push(promise);
    }
    const values = await Promise.all(promises);

    for (const data of values) {
    if ("error" in data) break;
    if ("profile" in data) {
            companiesData.push(data);
    } else {
            const dataCompanyProfiles = data.companyProfiles;
            companiesData.push(...dataCompanyProfiles);
       }
    }
    return companiesData;
}
function convertSymbolsToChunks(chunkSize, symbols){
    const symbolsChunks = [];
    for (let i = chunkSize; i < symbols.length; i+=chunkSize) {
        const symbolsChunk = [];
        for (let j = chunkSize-1; j >= 0; j--) {
            symbolsChunk.push(symbols[i-1-j]);
            
        }
        symbolsChunks.push(symbolsChunk);
    }

  let leftOverStartIndex = Math.max(chunkSize, symbols.length) - (Math.max(chunkSize, symbols.length)%Math.min(chunkSize, symbols.length));
  if (symbols.length <= chunkSize) {
    leftOverStartIndex = 0;
  }
    const symbolsChunk = [];
    for (let i = leftOverStartIndex; i < symbols.length; i++) {
            symbolsChunk.push(symbols[i]);
    }
    symbolsChunks.push(symbolsChunk);
    return symbolsChunks;
}

