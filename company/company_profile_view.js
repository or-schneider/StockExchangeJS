import * as companyGraph from "./company_profile_chart.js";
import { fetchCompanyDataAsync,fetchHistoricalPriceAsync } from "./company_profile.js";
import {update as updatePriceChangesNode} from "../price_changes/price_changes_updater.js"

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


class CompanyProfile{
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
    async load(){
        this.loaderNode.classList.remove("d-none");
        let companyData = await fetchCompanyDataAsync(params.symbol);
        this.updateProfileView(companyData.profile);
        

        this.contentContainerNode.classList.remove("d-none");
        this.loaderNode.classList.add("d-none");

    }
    updateProfileView(profileData){
        this.imageNode.src = profileData.image;
        this.nameNode.textContent = profileData.companyName;
        this.stockPriceNode.textContent = profileData.price;
        updatePriceChangesNode(this.stockPriceChangesNode, profileData.changesPercentage)
        this.descriptionNode.textContent = profileData.description;
        this.linkNode.href = profileData.website;
    }
    async addChart(){
        loaderNode.classList.remove("d-none");

        let historicalPriceData = await fetchHistoricalPriceAsync(params.symbol);

        companyGraph.updateGraph(historicalPriceData);

        this.loaderNode.classList.add("d-none");
    }
}

const companyProfile = new CompanyProfile(contentContainerNode , params.symbol);
await companyProfile.load();
await companyProfile.addChart();