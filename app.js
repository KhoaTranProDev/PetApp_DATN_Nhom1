document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://apipetapp.onrender.com/orderdetail';
    
    // Tỷ giá hối đoái
    const exchangeRates = {
        USD: 23000,
        EUR: 25000, 
        PKR: 150,   
        INR: 300,   
        GBP: 28000, 
        VND: 1      
    };

    axios.get(apiUrl)
        .then(response => {
            const data = response.data;


            const totalPriceVND = data.reduce((sum, item) => sum + item.price, 0);
            console.log('Tổng giá trị của price (VND):', totalPriceVND);


            const totalInCurrencies = {
                USD: totalPriceVND / exchangeRates.USD,
                EUR: totalPriceVND / exchangeRates.EUR,
                PKR: totalPriceVND / exchangeRates.PKR,
                INR: totalPriceVND / exchangeRates.INR,
                GBP: totalPriceVND / exchangeRates.GBP,
                VND: totalPriceVND
            };

            document.querySelector('#totalBalanceDollar').innerHTML = `${totalInCurrencies.USD.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
            document.querySelector('#totalBalanceEuro').innerHTML = `${totalInCurrencies.EUR.toLocaleString('en-US', { style: 'currency', currency: 'EUR' })}`;
            document.querySelector('#totalBalancePKR').innerHTML = `${totalInCurrencies.PKR.toLocaleString('en-US', { style: 'currency', currency: 'PKR' })}`;
            document.querySelector('#totalBalanceINR').innerHTML = `${totalInCurrencies.INR.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}`;
            document.querySelector('#totalBalancePound').innerHTML = `${totalInCurrencies.GBP.toLocaleString('en-US', { style: 'currency', currency: 'GBP' })}`;
            document.querySelector('#totalBalanceVND').innerHTML = `${totalInCurrencies.VND.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`;


            const speciesCount = {};
            data.forEach(pet => {
                const species = pet.alike;
                if (speciesCount[species]) {
                    speciesCount[species]++;
                } else {
                    speciesCount[species] = 1;
                }
            });

            const labels = Object.keys(speciesCount);
            const likeData = Object.values(speciesCount);
            const ctx = document.getElementById('salesChart').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Mức độ yêu thích (Theo số lượng bán)',
                        data: likeData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Giống loài'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Mức độ yêu thích'
                            },
                            beginAtZero: true,
                            ticks: {
                                stepSize: 2,
                                
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching pet data:', error);
        });
});
