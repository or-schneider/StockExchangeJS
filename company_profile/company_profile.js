import {fetchCompanyDataAsync,fetchHistoricalPriceAsync} from "./company_profile_api.js";
import { CompanyProfileChartConfig } from "./company_profile_chart_config.js";
import {CompanyProfileView} from "./company_profile_view.js";

export class CompanyProfile{
    constructor(containerNode,symbol){
        this.symbol = symbol;
        this.containerNode = containerNode;
        this.view = new CompanyProfileView(containerNode , this.symbol);
        this.chartConfig = new CompanyProfileChartConfig();

        this.view.hideLoader();
        this.view.hide();
    }
    async load(){
        this.view.showLoader();

        let companyData = await fetchCompanyDataAsync(this.symbol);

        this.view.updateProfileView(companyData)

        this.view.show();
        this.view.hideLoader();
    }
    async addChart(){
        this.view.showLoader();

        let historicalPriceData = await fetchHistoricalPriceAsync(this.symbol);
        let chartConfigData = this.chartConfig.generate(historicalPriceData);

        this.view.addChart(chartConfigData);

        this.view.hideLoader();

    }
}