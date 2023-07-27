function WeatherOutput({forecastData, icon, day}) {
    return(
        <div className={`weather__data`}>
            <p className={`${day}`}>{day}</p>
            <div className="weather__icon">
                <img src={icon} alt="weather icon"/>
            </div>
            <div className="weather__output">
                <p className="weather__ temp">{forecastData.temp} ° C</p>
                <p className="weather__feels">Feels like {forecastData.feels_like} ° C</p>
                <p className="weather__descr">{forecastData.descr}</p>
            </div>
        </div>
    )
}

export default WeatherOutput;