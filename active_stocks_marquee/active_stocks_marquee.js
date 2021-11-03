import { fetchAsync } from "../scripts/fetchAsync.js";

const marqueeNodeContainer = document.getElementById("activeStocksMarquee");
const activeStocksUrl = `${STOCK_EXCHANGE_API_ROOT_URL}actives`
const marqueElementWidth = '7%';

const totalStocksToDisplay = 160;
function generateMarqueeSlider(itemNodes){
    const sliderNode = document.createElement("div");
    for (const itemNode of itemNodes) {
        itemNode.classList.add("marquee-element");
        sliderNode.appendChild(itemNode)
    }
    return sliderNode;
}
function createMarquee(containerNode, nodeItems){
    
    const marqueeNode = document.createElement("div");
    marqueeNode.classList.add("marquee");
    
    marqueeNode.style.width = `calc(${marqueElementWidth}*${nodeItems.length})`;
    const sliderNode = generateMarqueeSlider(nodeItems);
    sliderNode.classList.add("marquee-slider");
    
    marqueeNode.appendChild(sliderNode);

    const followItems = nodeItems.map((node)=>node.cloneNode(true))
    
    const sliderFollowNode = generateMarqueeSlider(followItems);
    sliderFollowNode.classList.add("marquee-slider-follow");
    
    marqueeNode.appendChild(sliderFollowNode);

    containerNode.appendChild(marqueeNode)
}
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
    createMarquee(marqueeNodeContainer, activeStocksNodes);
}
init();