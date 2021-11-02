export function update(PriceChangesNode, changesPercentage){
    PriceChangesNode.textContent = changesPercentage;
    if(changesPercentage>=0){
        PriceChangesNode.classList.add("price-changes-positive")
        PriceChangesNode.classList.remove("price-changes-negative")
    }
    else{
        PriceChangesNode.classList.add("price-changes-negative")
        PriceChangesNode.classList.remove("price-changes-positive")
    }
}