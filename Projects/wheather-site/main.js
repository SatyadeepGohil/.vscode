let weatherChart;

$(document).ready(function() {
    $('#fetchWeather').click(function () {
        const city = $('#cityName').val();
        fetchWeatherData(city);
    }) 
})
function fetchWeatherData(city) {
    $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/weather?city=' + city,
    headers: { 'X-Api-Key': 'hYvhlakb/sNP2K+Sj+hk6Q==S36RxeN1u39dgbm2'},
    contentType: 'application/json',
    success: function(result) {
        console.log(result);

        $('#sunriseSunset').text('');

        const weatherData = result;
        renderChart(weatherData);

        function convertTimeStamp(timestamp) {
            const date = new Date(timestamp * 1000);
            return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'});
        }
        const sunrise = convertTimeStamp(weatherData.sunrise);
        const sunset = convertTimeStamp(weatherData.sunset);

        $('#sunriseSunset').text(`Sunrise: ${sunrise}, Sunset: ${sunset}`);
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
});
}

function renderChart(weatherData) {

    if (weatherChart) {
        weatherChart.destroy();
    }
    const ctx = document.getElementById('weatherChart').getContext('2d');
    weatherChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Min Temp', 'Current Temp', 'Max Temp', 'Feels Like', 'Humidity', 'Cloud Coverage', 'Wind Speed'],
            datasets: [{
                label: 'Weather Data',
                data: [
                    weatherData.min_temp,
                    weatherData.temp,
                    weatherData.max_temp,
                    weatherData.feels_like,
                    weatherData.humidity,
                    weatherData.cloud_pct,
                    weatherData.wind_speed
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugin: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                                switch (context.dataIndex) {
                                    case 0:
                                        case 1:
                                            case 2:
                                                case 3:
                                                    label += ' ℃';
                                                    break;
                                                    case 4:
                                                        case 5:
                                                            label += ' %';
                                                            break;
                                                            case 6:
                                                                label += ' m/s';
                                                                break;
                                }
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
}