export class CompanyComparisonList{
    cancelButtonNodes = []
    targetsSet = new Set();
    maxTargets = 5;
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
        this.compareLinkNode.href='#'
        this.compareLinkNode.textContent = "compare"
        this.compareLinkNode.classList.add("company-comparison-list-compare-link-disable");
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
        })
    }
    clear(){
        for (let i = cancelButtonNodes.length-1; i >= 0; i--) {
            cancelButtonNodes[i].remove();
            const cancelButtonNode = cancelButtonNodes.pop();
            cancelButtonNode.remove();
        }
    }
}