const marqueeNodeContainer = document.getElementById("activeStocksMarquee");

function generateMarqueeSlider(items){
    const sliderNode = document.createElement("div");
    
    for (const item of items) {
        const itemNode = document.createElement("div");
        itemNode.classList.add("marquee-element");
        itemNode.textContent = item;
        sliderNode.appendChild(itemNode)
    }
    return sliderNode;
}
function createMarquee(containerNode, items){
    const marqueeNode = document.createElement("div");
    marqueeNode.classList.add("marquee");

    const sliderNode = generateMarqueeSlider(items);
    sliderNode.classList.add("marquee-slider");
    
    marqueeNode.append(sliderNode);
    
    const sliderFollowNode = generateMarqueeSlider(items);
    sliderFollowNode.classList.add("marquee-slider-follow");
    
    marqueeNode.appendChild(sliderFollowNode);

    containerNode.appendChild(marqueeNode)
}
function init(){
    const items = [0,1,2,3,4,5];
    
    createMarquee(marqueeNodeContainer, items);
}
init();