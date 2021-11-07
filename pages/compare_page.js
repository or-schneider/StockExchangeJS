import { CompanyProfile } from "../company_profile/company_profile.js";

const companyProfileComparisonNode = document.getElementById("companyProfileComparison");

const companyProfileComparisonContainerNode = document.createElement('div');
companyProfileComparisonNode.appendChild(companyProfileComparisonContainerNode);
companyProfileComparisonContainerNode.classList.add("company-profile-comparison-container")

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const symbols = params.symbols.split(',');
console.log(symbols);

const companyProfileNode = document.createElement('div');
companyProfileNode.classList.add("company-profile-content-container")
companyProfileComparisonContainerNode.appendChild(companyProfileNode);
const companyProfile = new CompanyProfile(companyProfileNode , symbols[0]);
await companyProfile.load();

const companyProfileNode2 = document.createElement('div');
companyProfileNode2.classList.add("company-profile-content-container")

companyProfileComparisonContainerNode.appendChild(companyProfileNode2);
const companyProfile2 = new CompanyProfile(companyProfileNode2 , symbols[1]);
await companyProfile2.load();

const companyProfileNode3 = document.createElement('div');
companyProfileNode3.classList.add("company-profile-content-container")

companyProfileComparisonContainerNode.appendChild(companyProfileNode3);
const companyProfile3 = new CompanyProfile(companyProfileNode3 , symbols[0]);
await companyProfile3.load();

await companyProfile.addChart();
await companyProfile2.addChart();

await companyProfile3.addChart();