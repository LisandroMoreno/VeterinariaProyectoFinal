import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "../css/ApiClima.css";

const ApiClima = () => {
  const [currentTemp, setCurrentTemp] = useState(null);
  const [minTemp, setMinTemp] = useState(null);
  const [maxTemp, setMaxTemp] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(null);
  const [state, setState] = useState("San Miguel de Tucuman");

  const apiKey = "232e32153bfe7c18c89ebc060432d510";
  const currentWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;
  const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${state}&appid=${apiKey}`;

  function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
  }

  const getWeatherIconClass = (iconCode) => {
    const iconMap = {
      "01d": "wi-day-sunny",
      "01n": "wi-night-clear",
      "02d": "wi-day-cloudy",
      "02n": "wi-night-alt-cloudy",
      "03d": "wi-cloud",
      "03n": "wi-cloud",
      "04d": "wi-cloudy",
      "04n": "wi-cloudy",
      "09d": "wi-showers",
      "09n": "wi-showers",
      "10d": "wi-day-rain",
      "10n": "wi-night-alt-rain",
      "11d": "wi-thunderstorm",
      "11n": "wi-thunderstorm",
      "13d": "wi-snow",
      "13n": "wi-snow",
      "50d": "wi-fog",
      "50n": "wi-fog",
    };
    return iconMap[iconCode] || "wi-na";
  };

  useEffect(() => {
    // Fetch current weather data
    axios
      .get(currentWeatherApiUrl)
      .then((response) => {
        const { temp } = response.data.main;
        setCurrentTemp(kelvinToCelsius(temp).toFixed(1));
        setWeatherIcon(response.data.weather[0].icon);
      })
      .catch((error) => {
        console.error("Error fetching current weather data:", error);
      });

    // Fetch forecast data to get min and max temperatures of the day
    axios
      .get(forecastApiUrl)
      .then((response) => {
        const today = new Date().getDate();
        const temps = response.data.list
          .filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            return forecastDate === today;
          })
          .map((forecast) => kelvinToCelsius(forecast.main.temp));

        if (temps.length > 0) {
          setMinTemp(Math.min(...temps).toFixed(1));
          setMaxTemp(Math.max(...temps).toFixed(1));
        } else {
          setMinTemp("N/A");
          setMaxTemp("N/A");
        }
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
      });
  }, [state]);

  return (
    <>
      <Container>
        <Row>
          <Col sm="12" md="6" className="mt-3 mb-3">
            <div id="weatherWrapper">
              <div className="weatherCard">
                <div className="currentTemp">
                  <span className="temp">{currentTemp}°C</span>
                  <span className="location">
                    {state === "San Miguel de Tucuman" ? "SMT" : state}
                  </span>
                </div>
                <div className="currentWeather">
                  <span className="conditions">
                    {weatherIcon && (
                      <i
                        className={`wi ${getWeatherIconClass(weatherIcon)}`}
                      ></i>
                    )}
                  </span>
                  <div className="info">
                    <span>
                      {minTemp}°C / {maxTemp}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col sm="12" md="6">
            <div className="search-container mt-3 mb-3">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar..."
              />
              <button className="search-button">Buscar</button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ApiClima;
