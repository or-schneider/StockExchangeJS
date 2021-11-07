import { CompanyProfile } from "../company_profile/company_profile.js";

const companyProfileNode = document.getElementById("companyProfile");

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const companyProfile = new CompanyProfile(companyProfileNode , params.symbol);
await companyProfile.load();
await companyProfile.addChart();