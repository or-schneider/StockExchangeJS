export async function fetchAsync(url){
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