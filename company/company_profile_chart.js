const chartNode = document.getElementById('companyProfileChart').getContext('2d');

export function updateGraph(historicalPriceData){
    
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
    const myChart = new Chart(chartNode, config);
}