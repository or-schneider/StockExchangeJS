const chartNode = document.getElementById('companyProfileChart').getContext('2d');

export class CompanyProfileChartConfig{
    config;
    constructor(nodeContainer){
        this.nodeContainer = nodeContainer;
    }
    generate(historicalPriceData){
    
        let historicalData = historicalPriceData.historical;
        let recentHistoricalData = historicalData.slice(0,100).reverse();
        let labels = recentHistoricalData.map((data)=>data.date);
        let inputData = recentHistoricalData.map((data)=>data.close);

        let data =  {
            labels: labels,
            datasets: [{
                label: 'Stock Price History',
                data: inputData,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderColor: 'rgba(255, 99, 132, 0.8)',
                borderWidth: 1,
                fill: true,
            }]
        }
        const config = {
            type: 'line',
            data: data,
            options: {}
        };
        this.config = config;
        return config;
    }
}