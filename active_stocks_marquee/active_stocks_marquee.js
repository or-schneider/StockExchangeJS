import { fetchAsync } from "../scripts/fetchAsync.js";
import {Marquee} from "./marquee/marquee.js"
const marqueeNodeContainer = document.getElementById("activeStocksMarquee");
class ActiveStocksMarquee{
    nodeContainer;
    marqueeComponent;

    marqueeElementWidth = '7%';
    totalStocksToDisplay = 160;
    activeStocksUrl = `${STOCK_EXCHANGE_API_ROOT_URL}actives`;

    constructor(nodeContainer){
        this.nodeContainer = nodeContainer;
        this.init();
    }
    async init(){
        let activeStocksData = await fetchAsync(this.activeStocksUrl)
        activeStocksData.splice(this.totalStocksToDisplay);
        
        let activeStocksNodes = this.generateActiveStocksNodes(activeStocksData);
        this.marqueeComponent = new Marquee(this.nodeContainer, activeStocksNodes, this.marqueeElementWidth);
    }
    generateActiveStocksNodes(activeStocksData){
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
}

new ActiveStocksMarquee(marqueeNodeContainer);