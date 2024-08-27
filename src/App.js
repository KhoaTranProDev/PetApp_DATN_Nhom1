import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './App.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
    const [totalInCurrencies, setTotalInCurrencies] = useState({
        USD: 0,
        EUR: 0,
        PKR: 0,
        INR: 0,
        GBP: 0,
        VND: 0,
    });

    const exchangeRates = {
        USD: 25000,
        EUR: 27000,
        PKR: 90,
        INR: 300,
        GBP: 28000,
        VND: 1,
    };

    useEffect(() => {
        const payApiUrl = 'https://apipetapp.onrender.com/pay';

        axios.get(payApiUrl)
            .then(response => {
                const orderData = response.data;

                const totalPriceVND = orderData.reduce((sum, item) => sum + item.total, 0);

                const convertedTotals = {
                    USD: totalPriceVND / exchangeRates.USD,
                    EUR: totalPriceVND / exchangeRates.EUR,
                    PKR: totalPriceVND / exchangeRates.PKR,
                    INR: totalPriceVND / exchangeRates.INR,
                    GBP: totalPriceVND / exchangeRates.GBP,
                    VND: totalPriceVND
                };

                setTotalInCurrencies(convertedTotals);

                const speciesCount = {};

                response.data.forEach(payItem => {
                    payItem.petId.forEach(pet => {
                        const species = pet.alike;
                        if (speciesCount[species]) {
                            speciesCount[species]++;
                        } else {
                            speciesCount[species] = 1;
                        }
                    });
                });

                const ctx = document.getElementById('salesChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(speciesCount),
                        datasets: [{
                            label: 'Mức độ yêu thích (Theo số lượng bán)',
                            data: Object.values(speciesCount),
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
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="App">
            <header className="header">
                <div className="logo">
                    <a href="#">Pet App</a>
                    <div className="search_box">
                        <input type="text" placeholder="Search Pet App" />
                    </div>
                </div>
            </header>
            <div className="main-content">
                <div className="container">
                    <h2>Dashboard</h2>
                    <div className="promo_card">
                        <h1>Thống kê sản phẩm yêu thích dựa trên số lượng bán ra</h1>
                    </div>
                    <div className="flex">
                        <div className="flexleft">
                            <canvas id="salesChart" width="500" height="200"></canvas>
                        </div>
                        <div className="flexright">
                            <div className="sidebar">
                                <h4>Tổng tiền đã bán</h4>
                                {Object.entries(totalInCurrencies).map(([currency, amount]) => (
                                    <div key={currency} className="balance">
                                        <i className={`fas ${currency === 'USD' ? 'fa-dollar-sign' : currency === 'EUR' ? 'fa-euro-sign' : currency === 'GBP' ? 'fa-pound-sign' : currency === 'INR' ? 'fa-indian-rupee-sign' : currency === 'PKR' ? 'fa-rupee-sign' : currency === 'VND' ? 'fa-solid fa-dong-sign' : ''} icon`}></i>
                                        <div className="info">
                                            <h5>{currency}</h5>
                                            <span>{amount.toLocaleString('en-US', { style: 'currency', currency })}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
