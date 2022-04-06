import { update as updatePriceChangesNode } from "../price_changes/price_changes_updater.js";

export class CompanyProfileView {
  constructor(rootNode, symbol) {
    this.symbol = symbol;
    this.rootNode = rootNode;

    this.init();
  }
  init() {
    const containerNode = this.generate();
    this.rootNode.appendChild(containerNode);

    this.contentContainerNode.classList.add("d-none");
    this.loaderNodeContainer.classList.add("d-none");
  }
  generate() {
    this.containerNode = document.createElement("div");
    this.containerNode.classList.add("main-body-container");

    this.loaderNodeContainer = document.createElement("div");
    this.loaderNodeContainer.classList.add("company-profile-loader-container");
    this.containerNode.appendChild(this.loaderNodeContainer);

    this.loaderNode = document.createElement("div");
    this.loaderNode.classList.add("lds-dual-ring");
    this.loaderNodeContainer.appendChild(this.loaderNode);

    this.contentContainerNode = document.createElement("div");
    this.contentContainerNode.classList.add(
      "company-profile-content-container"
    );
    this.containerNode.appendChild(this.contentContainerNode);

    this.headerNode = document.createElement("div");
    this.headerNode.classList.add("company-profile-header");
    this.contentContainerNode.appendChild(this.headerNode);

    this.imageNode = document.createElement("img");
    this.imageNode.classList.add("company-profile-image");
    this.headerNode.appendChild(this.imageNode);

    this.linkNode = document.createElement("a");
    this.linkNode.classList.add("company-profile-header-link");
    this.headerNode.appendChild(this.linkNode);

    this.nameNode = document.createElement("h2");
    this.nameNode.classList.add("company-profile-name");
    this.linkNode.appendChild(this.nameNode);

    this.stockPricesContainerNode = document.createElement("div");
    this.stockPricesContainerNode.classList.add(
      "company-profile-prices-container"
    );
    this.contentContainerNode.appendChild(this.stockPricesContainerNode);

    this.stockPriceLabelNode = document.createElement("p");
    this.stockPriceLabelNode.classList.add("company-profile-stock-price-label");
    this.stockPriceLabelNode.textContent = "Stock price:";
    this.stockPricesContainerNode.appendChild(this.stockPriceLabelNode);

    this.stockPriceNode = document.createElement("p");
    this.stockPriceNode.classList.add("company-profile-stock-price");
    this.stockPricesContainerNode.appendChild(this.stockPriceNode);

    this.stockPriceChangesNode = document.createElement("p");
    this.stockPriceChangesNode.classList.add(
      "company-profile-stock-price-changes"
    );
    this.stockPriceChangesNode.classList.add("price-changes");
    this.stockPricesContainerNode.appendChild(this.stockPriceChangesNode);

    this.descriptionNode = document.createElement("div");
    this.descriptionNode.classList.add("company-profile-description-container");
    this.contentContainerNode.appendChild(this.descriptionNode);

    this.descriptionNodeText = document.createElement("p");
    this.descriptionNodeText.classList.add("company-profile-description-text");
    this.descriptionNode.appendChild(this.descriptionNodeText);

    return this.containerNode;
  }
  hide() {
    this.contentContainerNode.classList.add("d-none");
  }
  show() {
    this.contentContainerNode.classList.remove("d-none");
  }
  updateProfileView(companyData) {
    this.imageNode.src = companyData.profile.image;
    this.nameNode.textContent = companyData.profile.companyName;
    this.stockPriceNode.textContent = companyData.profile.price;
    updatePriceChangesNode(
      this.stockPriceChangesNode,
      companyData.profile.changesPercentage
    );
    this.descriptionNodeText.textContent = companyData.profile.description;
    this.linkNode.href = companyData.profile.website;
  }
  addChart(chartConfigData) {
    this.chartNode = document.createElement("canvas");
    this.chartNode.style = "max-height:50%;";
    window.addEventListener("resize", this.refreshChart.bind(this), false);

    this.contentContainerNode.appendChild(this.chartNode);

    const chartNodeContext = this.chartNode.getContext("2d");
    this.Chart = new Chart(chartNodeContext, chartConfigData);
  }
  hideLoader() {
    this.loaderNodeContainer.classList.add("d-none");
  }
  showLoader() {
    this.loaderNodeContainer.classList.remove("d-none");
  }
  async refreshChart() {
    // The following is done so that when screen size changes, flexbox could take into account the new size of the chart
    // Without this css set up flex-wrap would not work on screen resize

    let originalDisplay = this.chartNode.style.display;
    this.chartNode.style.display = "none";
    this.chartNode.getContext("2d").width = "100%";

    await this.timeout(0);
    this.chartNode.style.display = originalDisplay;
  }
  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
