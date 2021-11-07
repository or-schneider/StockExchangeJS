export class CompanyComparisonList{
    cancelButtonNodes = []
    targetsSet = new Set();
    maxTargets = 3;
    compareUrl = "./pages/compare.html";
    constructor(nodeContainer){
        this.nodeContainer = nodeContainer;
        this.init();
    }
    init(){
        const contentContainerNode = this.generate();
        this.nodeContainer.appendChild(contentContainerNode);

        this.disableCompareLink();
    }
    disableCompareLink(){
        this.updateCompareLink("compare",'#',false);
    }
    updateCompareLink(text,link,isEnabled){
        if(isEnabled)
            this.compareLinkNode.classList.remove("company-comparison-list-compare-link-disable");
        else
            this.compareLinkNode.classList.add("company-comparison-list-compare-link-disable");

        this.compareLinkNode.textContent = text;
        this.compareLinkNode.href = link;
    }
    refreshCompareLink(){
        if(this.targetsSet.size==0){
            this.disableCompareLink();
            return;
        }
        let text = `compare ${this.targetsSet.size} `;
        if(this.targetsSet.size==1)
            text+="company"
        else
            text+="companies"

        const targetSymbols =[];
        this.targetsSet.forEach(target => {
            targetSymbols.push(target.symbol);
        });
        const targetSymbolsString = targetSymbols.join(',');

        let link =  `${this.compareUrl}?symbols=${targetSymbolsString}`;
        
        this.updateCompareLink(text, link , true)
    }
    generate(){
        this.contentContainerNode = document.createElement('div');
        this.contentContainerNode.classList.add("company-comparison-list-content-container");
        
        this.companyComparisonButtonsNode = document.createElement('div');
        this.companyComparisonButtonsNode.classList.add("company-comparison-buttons");
        this.contentContainerNode.appendChild(this.companyComparisonButtonsNode);

        this.compareLinkNode = document.createElement('a');
        this.compareLinkNode.textContent = "compare"
        this.compareLinkNode.classList.add("company-comparison-list-compare-link");
        this.contentContainerNode.appendChild(this.compareLinkNode);
        
        return this.contentContainerNode;
    }
    add(companyData){
        if(this.targetsSet.has(companyData))
            return;
        if(this.targetsSet.size>=this.maxTargets)
            return;
            
        this.targetsSet.add(companyData);

        const cancelButtonNode = document.createElement("button");
        cancelButtonNode.classList.add("button");
        cancelButtonNode.classList.add("search-bar-results-list-result-compare-button");
        cancelButtonNode.innerHTML=companyData.symbol+" &#10006;";
        this.companyComparisonButtonsNode.appendChild(cancelButtonNode);
        
        this.cancelButtonNodes.push(cancelButtonNode)

        cancelButtonNode.addEventListener('click',()=>{
            this.targetsSet.delete(companyData);
            cancelButtonNode.remove();
            this.refreshCompareLink();

        })

        this.refreshCompareLink();
    }
    clear(){
        for (let i = cancelButtonNodes.length-1; i >= 0; i--) {
            cancelButtonNodes[i].remove();
            const cancelButtonNode = cancelButtonNodes.pop();
            cancelButtonNode.remove();
            this.refreshCompareLink();
        }
    }
}