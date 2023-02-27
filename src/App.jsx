import './App.css'
import React from "react"

export default function App() {
  const [weather, setWeather] = React.useState(null);
  const [location, setLocation] = React.useState('');

  React.useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=metric`);
        const data = await response.json();
        if (data) {
          setWeather(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(event.target.elements.location.value);
  };

  return (
    <div className="App">
      <h1 className="App-header">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="location" className="App-input" placeholder="Enter location" />
        <button type="submit" className="App-button">Search</button>
      </form>
      {weather && (
        <div className="App-weather">
          <h2 className="App-location">{weather.name}, {weather.sys.country}</h2>
          <p className="App-temperature">Temperature: {weather.main.temp}°C</p>
          <p className="App-description">Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
