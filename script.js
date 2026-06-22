function updateDateTime() {
    const now = new Date();

    // time
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("clock").innerText =
        `${hours}:${minutes}:${seconds} IST`;

    // day
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("day").innerText =days[now.getDay()];

        
    // date
    const options = { day: "numeric", month: "long", year: "numeric" };
    document.getElementById("date").innerText =now.toLocaleDateString("en-GB", options);
        
}

updateDateTime();
setInterval(updateDateTime, 1000);

//***********************************************************************//


function changeTheme() {
    const card = document.querySelector("#card");

    const hour = new Date().getHours();

    if(hour >= 5 && hour < 12) {
        card.style.background = "linear-gradient(135deg, #FFD86F, #FC6262)";
         icon.textContent = "🌅";
    }

    else if(hour >= 12 && hour < 16) {
        card.style.background = "linear-gradient(135deg, #56CCF2, #2F80ED)";
        icon.textContent = "☀️";
    }

    else if(hour >= 16 && hour < 19){
          card.style.background = "linear-gradient(135deg, #F2994A, #EB5757)";
          icon.textContent = "🌇";
    
    }
       

    else {
        card.style.background = "linear-gradient(135deg, #020a1b, #203650)";
        card.style.color = "white"
        icon.textContent = "🌙";
    }
}
changeTheme();

//***********************************************************************************/

let inp = document.querySelector("#inp");
let btn = document.querySelector("#btn");
let city = document.querySelector("#city");
btn.addEventListener("click", function(){
    const cityName = inp.value.trim();
    if (cityName === "") {
        alert("Please Enter City");
        return;
    }
    city.textContent = inp.value;
    
    showLoading();
    
     getWeather(cityName); 
     inp.value = "";
})

//**************************************************************************************//

function showLoading() {
    document.getElementById("temp").textContent = "Loading...";
    document.getElementById("cond").textContent = "Please wait";
    document.getElementById("hum").textContent = "";
    document.getElementById("wind").textContent = "";
}

async function getWeather(city) {
    try {
        console.log("Function called:", city);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&APPID=YOUR_API_KEY&units=metric`;

        const res = await fetch(url);
        const data = await res.json();

        console.log(data);

        if (data.cod !== 200) {
            alert("City not found");
            return;
        }

        updateUI(data);

    } catch (err) {
        console.error("ERROR:", err);
    }
}

//******************************************************************************************/

function updateUI(data) {

    document.getElementById("temp").textContent = data.main.temp + "°C";
    document.getElementById("city").textContent = data.name;

    const weather = data.weather[0].main;

let icon = "";

if (weather === "Rain") {
    icon = "🌧️";
} else if (weather === "Clouds") {
    icon = "☁️";
} else if (weather === "Clear") {
    icon = "☀️";
}

document.getElementById("cond").textContent = `${icon} ${weather}`;

    document.getElementById("hum").textContent = "💧 " + data.main.humidity + "%";
    document.getElementById("wind").textContent = "🌬️ " + data.wind.speed + " m/s";
}

function changeBackground() {
    const body = document.body;
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        body.style.background = "url('morning_sky.jpg') no-repeat center center/cover";
    }
    else if (hour >= 12 && hour < 16) {
        body.style.background = "url('afternoon_sky.jpg') no-repeat center center/cover";
    }
    else if (hour >= 16 && hour < 19) {
        body.style.background = "url('evening_sky.avif') no-repeat center center/cover";
    }
    else {
        body.style.background = "url('night_sky_1.png') no-repeat center center/cover";
    }

     body.style.backgroundSize = "cover";
}
changeBackground();


