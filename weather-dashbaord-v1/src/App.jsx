import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name')
      return
    }

    setLoading(true)
    setError('')
    setWeather(null)

    try {
      // First, geocode the city name to get coordinates
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
      )
      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        setError('City not found. Please try another search.')
        setLoading(false)
        return
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      // Fetch weather data using the coordinates
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&timezone=auto`
      )
      const weatherData = await weatherResponse.json()

      setWeather({
        city: name,
        country: country,
        current: {
          temp: Math.round(weatherData.current.temperature_2m),
          feelsLike: Math.round(weatherData.current.apparent_temperature),
          humidity: weatherData.current.relative_humidity_2m,
          windSpeed: weatherData.current.wind_speed_10m,
          condition: getWeatherCondition(weatherData.current.weather_code),
          icon: getWeatherIcon(weatherData.current.weather_code)
        },
        daily: weatherData.daily.time.slice(0, 5).map((date, i) => ({
          date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
          maxTemp: Math.round(weatherData.daily.temperature_2m_max[i]),
          minTemp: Math.round(weatherData.daily.temperature_2m_min[i]),
          precipProb: weatherData.daily.precipitation_probability_max[i],
          condition: getWeatherCondition(weatherData.daily.weather_code[i]),
          icon: getWeatherIcon(weatherData.daily.weather_code[i])
        }))
      })
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.')
    }

    setLoading(false)
  }

  const getWeatherCondition = (code) => {
    const conditions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Thunderstorm with heavy hail'
    }
    return conditions[code] || 'Unknown'
  }

  const getWeatherIcon = (code) => {
    if (code === 0) return '☀️'
    if (code <= 3) return '⛅'
    if (code <= 48) return '🌫️'
    if (code <= 55) return '🌧️'
    if (code <= 65) return '🌧️'
    if (code <= 75) return '❄️'
    if (code <= 82) return '🌦️'
    if (code >= 95) return '⛈️'
    return '🌤️'
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  useEffect(() => {
    fetchWeather('Noida')
  }, [])

  return (
    <div className="app">
      <div className="weather-card">
        <h1 className="title">🌤️ Weather Dashboard</h1>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? '⏳' : '🔍'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {weather && (
          <>
            <div className="current-weather">
              <div className="location">
                <h2>{weather.city}, {weather.country}</h2>
              </div>
              <div className="main-info">
                <span className="temp-icon">{weather.current.icon}</span>
                <span className="temp">{weather.current.temp}°C</span>
              </div>
              <p className="condition">{weather.current.condition}</p>
              <div className="details">
                <div className="detail-item">
                  <span className="detail-label">Feels Like</span>
                  <span className="detail-value">{weather.current.feelsLike}°C</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weather.current.humidity}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{weather.current.windSpeed} km/h</span>
                </div>
              </div>
            </div>

            <div className="forecast">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {weather.daily.map((day, index) => (
                  <div key={index} className="forecast-item">
                    <p className="day-name">{day.date}</p>
                    <span className="day-icon">{day.icon}</span>
                    <p className="day-temps">
                      <span className="high">{day.maxTemp}°</span>
                      <span className="low">{day.minTemp}°</span>
                    </p>
                    <p className="rain-chance">💧 {day.precipProb}%</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
