import { fetchAsync } from "../scripts/fetchAsync.js";
import {Marquee} from "./marquee/marquee.js"
const marqueeNodeContainer = document.getElementById("activeStocksMarquee");
const activeStocksUrl = `${STOCK_EXCHANGE_API_ROOT_URL}actives`

const marqueeElementWidth = '7%';
const totalStocksToDisplay = 160;

function generateActiveStocksNodes(activeStocksData){
    const activeStocksNodes = activeStocksData.map((activeStockData)=>{
        const activeStockNode = document.createElement("div");
        const tickerNode = document.createElement("div");
        tickerNode.textContent = activeStockData.ticker;
        activeStockNode.appendChild(tickerNode);
        activeStockNode.classList.add("active-stocks-marquee-symbol");

        const priceNode = document.createElement("div");
        priceNode.textContent = activeStockData.price;
        priceNode.classList.add("active-stocks-marquee-price");
        
        activeStockNode.appendChild(priceNode);

        return activeStockNode;
    })
    return activeStocksNodes;
}
async function init(){
    let activeStocksData = await fetchAsync(activeStocksUrl)
    activeStocksData.splice(totalStocksToDisplay);
    
    let activeStocksNodes = generateActiveStocksNodes(activeStocksData);
    let marquee = new Marquee(marqueeNodeContainer, activeStocksNodes, marqueeElementWidth);
}
init();