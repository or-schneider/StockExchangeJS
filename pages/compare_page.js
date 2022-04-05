import { CompanyProfilesComparison } from "../company_profile/company_profiles_comparison.js";

const companyProfileComparisonNode = document.getElementById(
  "companyProfileComparison"
);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const symbols = params.symbols.split(",");

const companyProfilesComparison = new CompanyProfilesComparison(
  companyProfileComparisonNode
);
companyProfilesComparison.createProfiles(symbols);
