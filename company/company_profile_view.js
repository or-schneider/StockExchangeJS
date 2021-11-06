import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

export class CompanyProfileView{
    
    constructor(containerNode,symbol){
        this.symbol = symbol;
        this.containerNode = containerNode;

        this.init();
    }
    init(){
        this.contentContainerNode = document.getElementById("companyProfileContentContainer");
        this.loaderNode = document.getElementById("companyProfileLoader");
        this.imageNode = document.getElementById("companyProfileImage");
        this.nameNode = document.getElementById("companyProfileName");
        this.linkNode = document.getElementById("companyProfileHeaderLink");
        this.stockPriceNode = document.getElementById("companyProfileStockPrice");
        this.stockPriceChangesNode = document.getElementById("companyProfileStockPriceChanges");
        this.descriptionNode = document.getElementById("companyProfileStockDescription");

        this.contentContainerNode.classList.add("d-none");
        this.loaderNode.classList.add("d-none");
    }
    hide(){
        this.contentContainerNode.classList.add("d-none");
    }
    show(){
        this.contentContainerNode.classList.remove("d-none");
    }
    updateProfileView(companyData){
        this.imageNode.src = companyData.profile.image;
        this.nameNode.textContent = companyData.profile.companyName;
        this.stockPriceNode.textContent = companyData.profile.price;
        updatePriceChangesNode(this.stockPriceChangesNode, companyData.profile.changesPercentage)
        this.descriptionNode.textContent = companyData.profile.description;
        this.linkNode.href = companyData.profile.website;
    }
    addChart(chartConfigData){
        this.chartNode = document.getElementById('companyProfileChart').getContext('2d');

        this.Chart = new Chart(this.chartNode, chartConfigData);
    }
    hideLoader(){
        this.loaderNode.classList.add("d-none");
    }
    showLoader(){
        this.loaderNode.classList.remove("d-none");
    }
    
}
