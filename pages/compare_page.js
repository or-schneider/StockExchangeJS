import { CompanyProfilesComparison } from "../company_profile/company_profiles_comparison.js";

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const companyProfileComparisonNode = document.getElementById(
  "companyProfileComparison"
);

const companyProfilesComparison = new CompanyProfilesComparison(
  companyProfileComparisonNode
);

const symbols = params.symbols.split(",");
companyProfilesComparison.createProfiles(symbols);
