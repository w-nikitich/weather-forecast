import React from "react";

function WeatherHours({hour}) {
// redux hour pass
// redux forecastRes pass
    return(
        <div className="details__info__hours">
            <p>{hour}</p>
            <p></p>
        </div>
    );
}

export default WeatherHours;