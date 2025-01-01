const apiKey = "2f06b423aed0fa7f3900f4b4bf3f4399";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const dropdown = document.querySelector(".dropdown");
const card = document.querySelector(".card");
const weatherIcon = document.querySelector(".weather-icon");

// Predefined list of cities
const cities = ["London", "New York", "Los Angeles", "Mumbai", "Paris", "Tokyo", "Berlin", "Beijing", "Sydney", "Cairo"];

// Function to display dropdown suggestions
function showSuggestions(query) {
    dropdown.innerHTML = ""; // Clear previous suggestions
    if (!query) return; // If query is empty, hide suggestions

    const filteredCities = cities.filter(city => 
        city.toLowerCase().startsWith(query.toLowerCase())
    );

    filteredCities.forEach(city => {
        const suggestion = document.createElement("div");
        suggestion.classList.add("suggestion");
        suggestion.textContent = city;
        suggestion.addEventListener("click", () => {
            searchbox.value = city; // Auto-fill search box
            dropdown.innerHTML = ""; // Clear dropdown
            checkWeather(city); // Fetch weather for selected city
        });
        dropdown.appendChild(suggestion);
    });
}

// Function to add animations
function showWeather() {
    weatherIcon.style.opacity = 1;
    document.querySelector(".temp").style.opacity = 1;
    document.querySelector(".temp").style.transform = "translateY(0)";
    document.querySelector(".city").style.opacity = 1;
    document.querySelector(".city").style.transform = "translateY(0)";
    document.querySelector(".details").style.opacity = 1;
    document.querySelector(".details").style.transform = "translateY(0)";
}

// Function to check the weather
async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Populate the weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Update weather icon dynamically
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        // Change card background dynamically
        if (data.weather[0].main === "Rain") {
            card.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        } else if (data.weather[0].main === "Clouds") {
            card.style.background = "linear-gradient(135deg, #636fa4, #e8cbc0)";
        } else {
            card.style.background = "linear-gradient(135deg, #f093fb, #f5576c)";
        }

        // Show the weather animations
        showWeather();
    } catch (error) {
        alert(error.message);
    }
}

// Event listener for search button
searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

// Event listener for input box to show suggestions
searchbox.addEventListener("input", () => {
    showSuggestions(searchbox.value);
});
