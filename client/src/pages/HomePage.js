import React from "react";
import Header from "../components/Header";
import WeatherInput from "../components/WeatherInput";

function HomePage() {
    return(
        <div className="home">
            <Header/>
            <WeatherInput/>
        </div>
    )
}

export default HomePage;