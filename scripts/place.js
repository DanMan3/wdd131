
const tempElement = document.querySelector('.temp-value')
const windElement = document.querySelector('.wind-value')
const windChillElement = document.getElementById('wind-chill')


if (tempElement && windElement && windChillElement) {
    const temperature = parseFloat(tempElement.textContent)
    const windSpeed = parseFloat(windElement.textContent)

    if (temperature <= 50 && windSpeed > 3) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = Math.round(windChill) + '°F';
    } else {
        windChillElement.textContent = 'N/A';
    }
}


function calculateWindChill(temperature, windSpeed) {
    return 35.74 + 0.6215 * temperature - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temperature * Math.pow(windSpeed, 0.16);
}