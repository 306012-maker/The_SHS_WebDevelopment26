// Global Configuration
const apiKey = '3b3d7ee928112590da0656922ffe4c02'; 

// FUNCTION 1: Main orchestrator triggered by the button click
function getWeatherData() {
    const city = document.getElementById('cityInput').value;
    const days = document.getElementById('daysInput').value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }
    if (days === "" || days < 1) {
        alert("Please enter a valid number of days (1 or more)!");
        return;
    }
    fetchWeatherAPI(city, days);
}

// FUNCTION 2: Handles the asynchronous API call fetching live data
function fetchWeatherAPI(city, days) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            displayWeather(data, days);
        })
        .catch(error => {
            alert(error.message);
        });
}

// FUNCTION 3: Manipulates the DOM to render the weather data beautifully
function displayWeather(data, days) {
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°F`;
    document.getElementById('description').innerText = data.weather[0].description.toUpperCase();

    // Generate custom packing checkboxes using temperature AND trip duration calculations
    generatePackingCheckboxes(data.main.temp, parseInt(days));

    // Unhide the card layout panel
    document.getElementById('weatherCard').classList.remove('d-none');
}

// FUNCTION 4: Custom algorithmic function to build interactive checkboxes with calculated weights
function generatePackingCheckboxes(temp, days) {
    const listContainer = document.getElementById('packingList');
    listContainer.innerHTML = ""; // Clear out old items

    // Base items where clothes multiply dynamically by the number of days
    let items = [
        { name: "Essentials Kit (Passport/Chargers)", weight: 2, qty: 1 },
        { name: "Daily Outfits (Shirts/Socks/Underwear)", weight: 1.2, qty: days }, // Multiplier feature!
        { name: "Toiletries Kit", weight: 3, qty: 1 }
    ];

    // Weather conditional multipliers based on trip duration variables
    if (temp < 50) {
        items.push({ name: "Heavy Winter Coat", weight: 5, qty: 1 });
        items.push({ name: "Warm Sweaters", weight: 1.5, qty: Math.ceil(days / 2) });
        items.push({ name: "Gloves & Beanie Set", weight: 1, qty: 1 });
    } else if (temp >= 50 && temp < 75) {
        items.push({ name: "Light Jacket", weight: 2.5, qty: 1 });
        items.push({ name: "Long Pants/Jeans", weight: 1.5, qty: Math.ceil(days / 2) });
        items.push({ name: "Travel Umbrella", weight: 1, qty: 1 });
    } else {
        items.push({ name: "Sunscreen & Sunglasses", weight: 0.5, qty: 1 });
        items.push({ name: "Casual Shorts", weight: 1, qty: Math.ceil(days / 2) });
        items.push({ name: "Swimsuit", weight: 0.8, qty: 1 });
    }

    // Build the inputs dynamically into the DOM with calculated total item weights
    items.forEach((item, index) => {
        let calculatedWeight = (item.weight * item.qty).toFixed(1);
        let div = document.createElement('div');
        div.className = "form-check list-group-item d-flex align-items-center mb-2 shadow-sm";
        
        div.innerHTML = `
            <input class="form-check-input me-3 bag-item-checkbox" type="checkbox" data-weight="${calculatedWeight}" id="item-${index}" onchange="calculateBagWeight()">
            <label class="form-check-label w-100 style-text" for="item-${index}">
                ✔️ [x${item.qty}] ${item.name} <span class="text-muted float-end">(${calculatedWeight} lbs)</span>
            </label>
        `;
        listContainer.appendChild(div);
    });

    // Reset weights layout status
    calculateBagWeight();
}

// FUNCTION 5: Tracking selected weights and evaluating airline safety bounds
function calculateBagWeight() {
    const checkboxes = document.querySelectorAll('.bag-item-checkbox');
    let totalWeight = 0;

    // Loop through checked items to add up mathematical weight attributes
    checkboxes.forEach(box => {
        if (box.checked) {
            totalWeight += parseFloat(box.getAttribute('data-weight'));
        }
    });

    // Handle updates to interface elements
    document.getElementById('weightDisplay').innerText = totalWeight.toFixed(1);
    
    const progressBar = document.getElementById('weightProgress');
    const warningText = document.getElementById('weightWarning');
    
    // Scale percentages for calculation representation (Max standard bag limit = 40 lbs for this sample)
    let percentMax = (totalWeight / 40) * 100;
    progressBar.style.width = `${Math.min(percentMax, 100)}%`;

    // Logical condition checks to evaluate safe limits
    if (totalWeight === 0) {
        warningText.innerText = "Empty Bag";
        progressBar.className = "progress-bar bg-secondary";
    } else if (totalWeight <= 15) {
        warningText.innerText = "Safe Light Load! ✅";
        progressBar.className = "progress-bar bg-success";
    } else if (totalWeight <= 35) {
        warningText.innerText = "Getting Heavy! ⚠️";
        progressBar.className = "progress-bar bg-warning text-dark";
    } else {
        warningText.innerText = "OVERWEIGHT LIMIT! ❌";
        progressBar.className = "progress-bar bg-danger";
    }
}

// FUNCTION 6: User-Created Explanatory Function (Requirement 6.i.1)
function convertFahrenheitToCelsius(fahrenheitTemp) {
    let celsius = (fahrenheitTemp - 32) * (5 / 9);
    return Math.round(celsius) + "°C";
}