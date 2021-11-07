export class CompanyComparisonList{
    targetsSet = new Set();
    maxTargets = 5;
    constructor(nodeContainer){
        this.nodeContainer = nodeContainer;
        this.init();
    }
    init(){
        
    }
    add(companyData){
        if(this.targetsSet.has(companyData))
            return;
        if(this.targetsSet.size>=this.maxTargets)
            return;
        
        const cancelButton = document.createElement("button");
        cancelButton.classList.add("button");
        cancelButton.textContent=companyData.symbol;
        this.nodeContainer.appendChild(cancelButton);
        this.targetsSet.add(companyData);

        cancelButton.addEventListener('click',()=>{
            this.targetsSet.delete(companyData);
            cancelButton.remove();
        })
    }
}