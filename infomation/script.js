function getCityInfo() {
    const selectedCity = document.getElementById('citySelect').value;
    const apiKey = 'b190f16c2de3424f90ceaa25f79dd9a5';

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${selectedCity}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const cityInfoElement = document.getElementById('cityInfo');
            cityInfoElement.innerHTML = `<h2>${selectedCity}</h2>`;

            if (data.results.length > 0) {
                const result = data.results[0];
                const city = result.components.city || 'N/A';
                const state = result.components.state || 'N/A';
                const country = result.components.country || 'N/A';
                const lat = result.geometry.lat || 'N/A';
                const lng = result.geometry.lng || 'N/A';

                cityInfoElement.innerHTML += `
                    <p><strong>State:</strong> ${state}</p>
                    <p><strong>Country:</strong> ${country}</p>
                    <p><strong>Latitude:</strong> ${lat}</p>
                    <p><strong>Longitude:</strong> ${lng}</p>
                `;
            } else {
                cityInfoElement.innerHTML += '<p>No information available for this city.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching city information:', error);
        });
}