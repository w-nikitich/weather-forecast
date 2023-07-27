import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import {useCookies} from 'react-cookie';
import { DEFAULT_LOCATION } from "../config";
import sunny_icon from '../images/sunny_icon.png';
import rain_icon from '../images/rain_icon.png';
import clouds_icon from '../images/clouds_icon.png';
import snow_icon from '../images/snow_icon.png';
import thunderstorm_icon from '../images/thunderstorm_icon.png';
import drizzle_icon from '../images/drizzle_icon.png';
import mist_icon from '../images/mist_icon.png';
import sand_icon from '../images/sand_icon.png';
import ash_icon from '../images/ash_icon.png';
import tornado_icon from '../images/tornado_icon.png';
import squall_icon from '../images/squall_icon.png';
import Container from "react-bootstrap/esm/Container";

function Weather({sign}) {
    const city = localStorage.getItem('location') || DEFAULT_LOCATION;
    const [location, setLocation] = useState(city);
    // const [cookies, setCookie] = useCookies(['location']);
    const [forecast, setForecast] = useState([]);
    const [icon, setIcon] = useState('');
    const weatherData = {
        clear: sunny_icon,
        clouds: clouds_icon,
        // 'overcast clouds': overcast_clouds_icon,
        rain: rain_icon,
        snow: snow_icon,
        thunderstorm: thunderstorm_icon,
        drizzle: drizzle_icon,
        mist: mist_icon,
        smoke: mist_icon,
        haze: mist_icon,
        dust: mist_icon,
        fog: mist_icon,
        sand: sand_icon,
        ash: ash_icon,
        tornado: tornado_icon,
        squall: squall_icon
    }

    useEffect(() => {
        // if (location == '') {

        // }
        // console.log(city);
        localStorage.setItem('location', location);
        // setCookie('location', location);
    }, [location]); 

    useEffect(() => {
        // setCookie('location', location);
        async function fetchData() {
            await getWeatherData();
        }

        fetchData();
    }, []);

    function changeHandler(event) {
        setLocation(event.target.value);
        // setCookie('location', event.target.value);
        // console.log(location);
    }

    async function getWeatherData() {
        const cityOutput = document.getElementsByClassName('weather__location')[0].getElementsByTagName('p')[0];
        // console.log(cookies.location)

        try {
            cityOutput.innerHTML = `Your city: ${location}`; // || location

            const urlLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=adf38b48f7dadb4280bc1f2b2a841845`; //  ? cookies.location: location
            const response = await axios.get(urlLocation);
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&appid=adf38b48f7dadb4280bc1f2b2a841845`;
            
            axios.get(urlWeather).then((res) => {
                setForecast([res.data.main.temp, res.data.main.feels_like, res.data.clouds.all, res.data.weather[0].main]);
    
                Object.keys(weatherData).map((key, index) => {
                    if (key == res.data.weather[0].main.toLowerCase()) {
                        setIcon(weatherData[key]);
                    }
                })
            });
        }
        catch (error) {
            cityOutput.innerHTML = 'Sorry, there is not such city.';
        }
    }

    async function searchLocation(event) {
        if (event.key == 'Enter') {
            await getWeatherData();
        }
    }

    return(
        <div className="weather">
            <Container>
                <div className="weather__location">
                    <input 
                    value={location}
                    onChange={changeHandler}
                    placeholder="Enter location"
                    onKeyDown = {searchLocation}
                    type="text"/>

                    <p>Your city: <span>{location}</span></p>
                </div>
                <div className={`weather__data`}>
                    <div className="weather__output">
                        <p className="weather__ temp">{forecast[0]} ° C</p>
                        <p className="weather__feels">Feels like {forecast[1]} ° C</p>
                        <p className="weather__descr">{forecast[forecast.length-1]}</p>
                    </div>
                    <div className="weather__icon">
                        <img src={icon} alt="weather icon"/>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Weather;