export class Marquee{
    elementWidthPercentage = '7%';
    
    constructor(rootNode,nodeItems,elementWidthPercentage){
        this.elementWidthPercentage = elementWidthPercentage;
        this.rootNode = rootNode;
        
        const marqueeNode = this.generate(nodeItems)
        rootNode.appendChild(marqueeNode)
    }
    generate(nodeItems){
    
        const marqueeNode = document.createElement("div");
        marqueeNode.classList.add("marquee");
        
        marqueeNode.style.width = `calc(${this.elementWidthPercentage}*${nodeItems.length})`;
        const sliderNode = this.generateMarqueeSlider(nodeItems);
        sliderNode.classList.add("marquee-slider");
        
        marqueeNode.appendChild(sliderNode);

        const followItems = nodeItems.map((node)=>node.cloneNode(true))
        
        const sliderFollowNode = this.generateMarqueeSlider(followItems);
        sliderFollowNode.classList.add("marquee-slider-follow");
        
        marqueeNode.appendChild(sliderFollowNode);
        return marqueeNode;
    }
    generateMarqueeSlider(itemNodes){
        const sliderNode = document.createElement("div");
        for (const itemNode of itemNodes) {
            itemNode.classList.add("marquee-element");
            sliderNode.appendChild(itemNode)
        }
        return sliderNode;
    }
}