import { CompanyProfile } from "./company_profile.js";

export class CompanyProfilesComparison{
    constructor(rootNode){
        this.rootNode = rootNode;

        this.init();
    }
    init(){
        this.containerNode = document.createElement('div');
        this.containerNode.classList.add("company-profile-comparison-container")
        this.rootNode.appendChild(this.containerNode);
    
    }
    createProfiles(symbols){
        const companyProfiles = symbols.map((symbol)=>{
            const companyProfileNode = document.createElement('div');
            companyProfileNode.classList.add("company-profile-content-container")
            this.containerNode.appendChild(companyProfileNode);
            
            const companyProfile = new CompanyProfile(companyProfileNode , symbol);

            return companyProfile;
        })

        for (const companyProfile of companyProfiles) {
            companyProfile.load();
        }
        for (const companyProfile of companyProfiles) {
            companyProfile.addChart();
        }
    }
}