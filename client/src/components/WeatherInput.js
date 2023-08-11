import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { DEFAULT_CITY, DEFAULT_COUNTRY } from "../config";
import Container from "react-bootstrap/esm/Container";
import WeatherOutput from './WeatherOutput';
import {WEATHER_DATA, DAY_OF_WEEK, COUNTRY_CODES} from '../constants.js';
import * as http from '../http';
import * as helpers from '../helpers';
import { useDispatch } from "react-redux";
import { setBaseInfo, setForecastCity } from "../setObjects";

function WeatherInput() {
    const localStorageCity = localStorage.getItem('city') || DEFAULT_CITY; 
    const localStorageCountry = localStorage.getItem('country') || DEFAULT_COUNTRY;
    const [city, setCity] = useState(localStorageCity); 
    const [country, setCountry] = useState(localStorageCountry); 
    const [location, setLocation] = useState([localStorageCity, localStorageCountry]);
    const [forecast, setForecast] = useState([{
        day: 'current',
        temp: '',
        minTemp: '',
        maxTemp: '',
        feels_like: '',
        descr: '',
        icon: ''
    }]);
    let forecastRes;
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await getWeatherData();
         }
         fetchData();
 
         forecast.forEach((value, index) => {
             <WeatherOutput forecastData={value} day={value.day}/>
         });
    }, []);

    useEffect(() => {
        const locationArr = location[0].split(/,|, /);
        const locationCity = locationArr[0];
        const locationCountry = locationArr[1];
        setCity(locationCity);
        setCountry(locationCountry);

    }, [forecast, location]); 

    useEffect(() => {
        localStorage.setItem('city', city);
    }, [city]);

    useEffect(() => {
        localStorage.setItem('country', country);
    }, [country]);

    function changeHandler(event) {
        setLocation([event.target.value]);
    }

    async function getWeatherData() {
        let cityStr = document.getElementsByClassName('weather__location')[0].getElementsByTagName('p')[0].innerHTML;

        try {
            cityStr = `Your city: ${city}`; 

            const locationRes = await http.getLocation(city);
            const weatherRes = await http.getWeather(locationRes);
            forecastRes = await http.getForecast(locationRes);
            const updateForecast = [{
                day: 'current',
                temp: weatherRes.main.temp, 
                feels_like: weatherRes.main.feels_like, 
                descr: weatherRes.weather[0].main, 
                icon: helpers.getAppropriateIcon(WEATHER_DATA, weatherRes.weather[0].main)
            }]

            for (const day of forecastRes) {   
                updateForecast.push({
                    day: DAY_OF_WEEK[await helpers.getShortNameOfDay(day.date_epoch)],
                    temp: day.hour[6].temp_c,
                    minTemp: day.day.mintemp_c,
                    maxTemp: day.day.maxtemp_c,
                    feels_like: day.hour[6].feelslike_c,
                    descr: day.hour[6].condition.text,
                    icon: helpers.getAppropriateIcon(WEATHER_DATA, day.hour[6].condition.text)
                })
            }
            

            setForecast(updateForecast);

        }
        catch (error) {
            cityStr = 'Sorry, there is not such city.';
        }
    }

    async function searchLocation(event) {
        if (event.key == 'Enter') {
            await getWeatherData();
        }
    }

    function handleLinkClick({baseInfoData, cityData}) {
        dispatch(setBaseInfo(baseInfoData));
        dispatch(setForecastCity(cityData));
    }

    return(
        <div className="weather">
            <Container>
                <div className="weather__location">
                    <p>Enter your city and country with coma</p>
                    <input 
                    value={location}
                    onChange={changeHandler}
                    placeholder="Enter location"
                    onKeyDown = {searchLocation}
                    type="text"/>

                    <p>Your city: <span>{city}</span></p>
                </div>
                <div className="weather__forecast">
                    {new Array(forecast.length).fill().map((value, index) =>
                        <Link to={`/DetailsPage/${city}`} relative="path" onClick={() => handleLinkClick({
                            baseInfoData:forecast[index], 
                            cityData: forecastRes
                            })
                        }>
                            <WeatherOutput forecastData={forecast[index]} day={forecast[index].day}/>
                        </Link>
                     )}
                </div>
            </Container>
        </div>
    );
}

export default WeatherInput;