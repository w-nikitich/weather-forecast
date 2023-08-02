import axios from "axios";

export const getLocation = async (location) => {
    const urlLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=2&appid=adf38b48f7dadb4280bc1f2b2a841845`; //  ? cookies.location: location
    return (await axios.get(urlLocation)).data[0];
}

export const getWeather = async (locationRes) => {
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${locationRes.lat}&lon=${locationRes.lon}&units=metric&appid=adf38b48f7dadb4280bc1f2b2a841845`;
    return (await axios.get(urlWeather)).data;
}

export const getForecast = async (locationRes) => {
    const urlForecast = `https://api.weatherapi.com/v1/forecast.json?key=7cca29f03a674182a96160005230108&q=${locationRes.lat},${locationRes.lon}&days=7&aqi=no&alerts=no`;
    return (await axios.get(urlForecast)).data.forecast.forecastday;
}