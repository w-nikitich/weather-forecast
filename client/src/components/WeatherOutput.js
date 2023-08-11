function WeatherOutput({forecastData, day}) {
    return(
        <div className={`weather__data`}>
            <p className={`${day}`}>{day}</p>
            <div className="weather__icon">
                <img src={forecastData.icon} alt="weather icon"/>
            </div>
            <div className="weather__output">
                <p className="weather__ temp">{forecastData.temp} ° C</p>
                <p className="weather__feels">Feels like {forecastData.feels_like} ° C</p>
                <p className="weather__descr">{forecastData.descr}</p>
                <div className="weather__temp__interval">
                    <p className="weather__temp--min">Min {forecastData.minTemp}° C</p>
                    <p className="weather__temp--max">Max {forecastData.maxTemp}° C</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherOutput;