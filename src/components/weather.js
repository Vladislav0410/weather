import React from 'react'

const Weather = props => (
    <div className="infoWeath">
        { props.city &&
            <div>
                <p>Location: {props.city}, {props.country}</p>
                <p>Description: {props.description}</p>
                <p>Temperature: {props.temp}°С</p>
                <p>Wind speed: {props.windspeed} m/s</p>
                <p>Humidity: {props.humidity}%</p>
            </div>
        }
        <p className="error">{props.error}</p>
    </div>
);


export default Weather;