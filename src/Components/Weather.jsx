import React, {useState} from "react";
import "./style.css";

function Weather() {

    const [cityName, setCityName] = useState("")
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const submitHandler = async (e) => {
        e.preventDefault()
        setError("")
        setWeatherData(null)

        if(cityName.trim().length == 0){
            setError("Please Enter CityName")
            return;
        }

        setLoading(true)

        try{
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f169dbc911f45c5832acc8fcddcabb4b&units=metric`);

            console.log(response);

            if(!response.ok){
                setError("City Not Found...")
                setLoading(false);
                return;
            }

            let data = await response.json();
            console.log(data);
            
            setWeatherData(data);
            setLoading(false);
        }catch (error){
            setError(error.msg || "Something Went Wrong")
        }
    }

    return(
        <div className="weather-container">
            <h1>Weather Application</h1>
            <form onSubmit={submitHandler}>
                <input type="text" placeholder="Enter City Name" value={cityName} onChange={(e) => setCityName(e.target.value)}/>
                <br />
                <br />
                <button type="submit">Get Weather Details</button>
            </form>

            {loading && <span className="loading">Loading Weather Data...</span>}
            {error && <span className="error">{error}</span>}

            {weatherData && (
                <div className="weather-details"> 
                <h2>
                    {weatherData.name}, {weatherData.sys.country}
                </h2>
                <p>Temprature: {weatherData.main.temp} °C</p>
                <p>Weather: {weatherData.weather[0].description}</p>
                <p>Humidity: {weatherData.main.humidity} %</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}

        </div>
    )
}

export default Weather;
