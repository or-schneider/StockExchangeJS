export function update(PriceChangesNode, changesPercentage) {
  changesPercentage = parseFloat(changesPercentage);
  PriceChangesNode.textContent = changesPercentage.toFixed(2);
  if (changesPercentage >= 0) {
    PriceChangesNode.classList.add("price-changes-positive");
    PriceChangesNode.classList.remove("price-changes-negative");
  } else {
    PriceChangesNode.classList.add("price-changes-negative");
    PriceChangesNode.classList.remove("price-changes-positive");
  }
}
