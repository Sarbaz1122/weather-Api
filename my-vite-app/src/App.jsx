
import React, { useState } from "react";
import "./App.css";
// import Footer from "./Footer";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null); // ✅ Fixed
  const [showData, setShowData] = useState(false);

  const API_KEY = "8425ee5d4a0abec504de2f2a5ffef2ec";

  const fetchWeather = async () => {
    if (city.trim() === "") {
      alert("Please enter a city name!");
      return;
    }
    

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 404) {
        alert("City not found!");
        setWeather(null);
        return;
      }

      setWeather(data);
      setShowData(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const [darkMode, setDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{
      width: '160%',


       backgroundColor: 'lightblue',   // background color
       
      
      height: '100vh',                // full screen height
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
    >
          <Footer />

      
    <div className={`Weather-card ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <h1 className="title">☀️ Weather-Card</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="hide-btn"  onClick={fetchWeather}>Search</button>
        </div>

        {showData && weather && (
          <div className="weather-card">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <p>🌡️ Temperature: {weather.main.temp} °C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌬️ Wind: {weather.wind.speed} m/s</p>
            <p>☁️ Condition: {weather.weather[0].description}</p>

            <button className="hide-btn" onClick={() => setShowData(false)}>
              Hide Weather
            </button>
          </div>
        )}

        <div className="toggle-container">
          <label className="switch">
            <input type="checkbox" onChange={handleThemeToggle} />
            <span className="slider"></span>
          </label>
          <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
        </div>
      </div>
    </div>
   </div>
  
  );
}

export default App;

