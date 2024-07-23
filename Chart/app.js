// document.addEventListener('DOMContentLoaded', () => {
//     const apiUrl = 'https://apipetapp.onrender.com/';

//     axios.get(apiUrl)
//         .then(response => {
//             const data = response.data;

//    
//             const labels = data.map(order => order.date);
//             const salesData = data.map(order => order.sales); 

//             const ctx = document.getElementById('salesChart').getContext('2d');
//             new Chart(ctx, {
//                 type: 'line', 
//                 data: {
//                     labels: labels,
//                     datasets: [{
//                         label: 'Doanh số đơn hàng',
//                         data: salesData,
//                         borderColor: 'rgba(75, 192, 192, 1)',
//                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     scales: {
//                         x: {
//                             title: {
//                                 display: true,
//                                 text: 'Ngày'
//                             }
//                         },
//                         y: {
//                             title: {
//                                 display: true,
//                                 text: 'Doanh số'
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching sales data:', error);
//         });
// });
document.addEventListener('DOMContentLoaded', () => {
    const mockData = [
        { date: '01-07-2024', sales: 120 },
        { date: '02-07-2024', sales: 150 },
        { date: '03-07-2024', sales: 170 },
        { date: '04-07-2024', sales: 200 },
        { date: '05-07-2024', sales: 180 },
        { date: '06-07-2024', sales: 160 },
        { date: '07-07-2024', sales: 190 }
    ];


    const labels = mockData.map(order => order.date);
    const salesData = mockData.map(order => order.sales);

    const ctx = document.getElementById('salesChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Doanh số đơn hàng',
                data: salesData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Doanh số: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Ngày bán'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Doanh số'
                    },
                    beginAtZero: true
                }
            }
        }
    });
});
