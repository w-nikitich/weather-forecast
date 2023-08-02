import axios from "axios";
import React, { useEffect, useState } from "react";
import { DEFAULT_LOCATION } from "../config";
import Container from "react-bootstrap/esm/Container";
import WeatherOutput from './WeatherOutput';
import {WEATHER_DATA, DAY_OF_WEEK} from '../constants.js';
import * as http from '../http';
import * as helpers from '../helpers';

function WeatherInput() {
    const localStorageLocation = localStorage.getItem('location') || DEFAULT_LOCATION; // city
    const [location, setLocation] = useState(localStorageLocation); 
    const [forecast, setForecast] = useState([{
        day: 'current',
        temp: '',
        minTemp: '',
        maxTemp: '',
        feels_like: '',
        descr: '',
    }]);

    const [icon, setIcon] = useState('');

    useEffect(() => {
        localStorage.setItem('location', location);
        
        forecast.map((val) => {
            Object.keys(WEATHER_DATA).map((key, value) => {
                if (key == val.descr.toLowerCase()) {
                    setIcon(WEATHER_DATA[key]);
                }
            });
        })

    }, [location, forecast]); 

    useEffect(() => {
        async function fetchData() {
           await getWeatherData();
        }
        fetchData()

        forecast.forEach((value, index) => {
            <WeatherOutput forecastData={value} icon={icon} day={value.day}/>
        });

    }, []);

    function changeHandler(event) {
        setLocation(event.target.value);
    }

    async function getWeatherData() {
        let cityStr = document.getElementsByClassName('weather__location')[0].getElementsByTagName('p')[0].innerHTML;

        try {
            cityStr = `Your city: ${location}`; // || location
            
            const locationRes = await http.getLocation(location);
            const weatherRes = await http.getWeather(locationRes);
            const forecastRes = await http.getForecast(locationRes);
            const updateForecast = [{temp: weatherRes.main.temp, feels_like: weatherRes.main.feels_like, descr: weatherRes.weather[0].main}]

            for (const day of forecastRes) {
                updateForecast.push({
                    day: DAY_OF_WEEK[helpers.getShortNameOfDay(day.date_epoch)],
                    temp: day.hour[6].temp_c,
                    feels_like: day.hour[6].feelslike_c,
                    descr: day.hour[6].condition.text
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
                <div className="weather__forecast">
                    {new Array(forecast.length).fill().map((value, index) => <WeatherOutput forecastData={forecast[index]} icon={icon} day={forecast[index].day}/>)}
                </div>
                {/* <WeatherOutput forecastData={forecast} icon={icon} day={dayOfWeek[0]}/> */}
            </Container>
        </div>
    );
}

export default WeatherInput;