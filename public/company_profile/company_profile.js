import {
  fetchCompanyDataAsync,
  fetchHistoricalPriceAsync,
} from "./company_profile_api.js";
import { CompanyProfileChartConfig } from "./company_profile_chart_config.js";
import { CompanyProfileView } from "./company_profile_view.js";

export class CompanyProfile {
  constructor(rootNode, symbol) {
    this.symbol = symbol;
    this.rootNode = rootNode;
    this.view = new CompanyProfileView(rootNode, this.symbol);
    this.chartConfig = new CompanyProfileChartConfig();

    this.view.hideLoader();
    this.view.hide();
  }
  async load() {
    this.view.showLoader();

    const companyData = await fetchCompanyDataAsync(this.symbol);

    this.view.updateProfileView(companyData);

    this.view.show();
    this.view.hideLoader();
  }
  async addChart() {
    this.view.showLoader();

    const historicalPriceData = await fetchHistoricalPriceAsync(this.symbol);
    const chartConfigData = this.chartConfig.generate(historicalPriceData);

    this.view.addChart(chartConfigData);

    this.view.hideLoader();
  }
}
