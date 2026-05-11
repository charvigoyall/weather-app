 const detectBtn = document.getElementById("detectBtn");

detectBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, showError);
    } else {
        alert("Geolocation not supported by this browser");
    }
});

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    // 1️⃣ WEATHER API (Open-Meteo)
    const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    // 2️⃣ LOCATION API (Reverse Geocoding)
    const locationURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    // Fetch city name
    fetch(locationURL)
        .then(res => res.json())
        .then(locationData => {
            const city =
                locationData.address.city ||
                locationData.address.town ||
                locationData.address.village ||
                "Unknown location";

            document.getElementById("location").innerText =
                `📍 ${city}`;
        });

    // Fetch weather data
    //weather file
    /*comment */
    fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temperature").innerText =
                `${data.current_weather.temperature} °C`;

            document.getElementById("condition").innerText =
                `Wind Speed: ${data.current_weather.windspeed} km/h`;
        })
        .catch(() => {
            alert("Failed to fetch weather data");
        });
}

function showError() {
    alert("Location permission denied");
}

/**/
