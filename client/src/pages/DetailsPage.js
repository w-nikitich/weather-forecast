import React from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import WeatherHours from "../components/WeatherHours";
import { useSelector } from "react-redux";
import rootReducer from "../rootReducer";
import { reducer } from "../reducer";

function DetailsPage() {
    const {city} = useParams();
    const forecastData = useSelector(state => state.reducer.forecastData);
    const forecastDataObj = forecastData.forecastBaseInfo;
    console.log(forecastData)

    function hourInfoRender() {
        let newArr = new Array();
        for(let i = 0; i < 24; i+=3) {
            newArr.push(<WeatherHours hour={i}/>)
        }

        return newArr;
    }

    return(
        <div className="details">
            <Container>
                <div className="details__base">
                    <p className="detail__city">Your city {city}</p>
                    <p className="detail__day">{forecastDataObj.day}</p>
                </div>
                {/* {/* <div className="details__icon">
                    <img src={forecastData.icon}/>
                </div> */}
                <div className="details__general">
                    <p>Minimum temperature: {forecastDataObj.minTemp} °C</p>
                    <p>Maximum temperature: {forecastDataObj.maxTemp} °C</p>
                </div>  

                {/* grid (every 3 hour)*/}
                <div className="details__info">
                    {
                        hourInfoRender()
                    }
                    {/* weather data for each new component (WeatherHours) with parametrs of the value*/}
                    
                </div>

                {/* info about wind */}
            </Container>
        </div>
    );  
}

export default DetailsPage;