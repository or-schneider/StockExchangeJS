import { fetchAsync } from "../scripts/fetch_async.js";
import {Marquee} from "./marquee/marquee.js"
export class ActiveStocksMarquee{
    rootNode;
    marqueeComponent;

    marqueeElementWidth = '80px';
    totalStocksToDisplay = 160;
    activeStocksUrl = `${STOCK_EXCHANGE_API_ROOT_URL}actives`;

    constructor(rootNode){
        this.rootNode = rootNode;
    }
    async load(){
        if(this.marqueeComponent)
            this.rootNode.removeChild(this.rootNode.firstChild);

        let activeStocksData = await fetchAsync(this.activeStocksUrl)
        activeStocksData.splice(this.totalStocksToDisplay);
        
        let activeStocksNodes = this.generateActiveStocksNodes(activeStocksData);
        this.marqueeComponent = new Marquee(this.rootNode, activeStocksNodes, this.marqueeElementWidth);
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
