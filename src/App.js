import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

class App extends React.Component {

  state = {
    temp: "",
    city: "",
    country: "",
    windspeed: "",
    description: "",
    humidity: "",
    error: ""
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    if(city) {
      const api = await fetch(`HTTPS://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ceeb6d2cd47c2a59d70272403971e35&units=metric`);
      const data = await api.json();  
      console.log(data)
      try{
      this.setState({
        temp: Math.round(data.main.temp),
        city: data.name,
        country: data.sys.country,
        windspeed: Math.round(data.wind.speed),
        description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
        humidity: data.main.humidity,
        error: ""
      });
    } catch (e) {
      alert('Enter correct city name')
      window.location.reload();
    }
    } else {
      this.setState({
    temp: "",
    city: "",
    country: "",
    windspeed: "",
    description: "",
    humidity: "",
    error: "Enter city name"
      });
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
              <Info />
              </div>
              <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather} />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                windspeed={this.state.windspeed}
                description={this.state.description}
                humidity={this.state.humidity}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default App;