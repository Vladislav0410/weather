import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    windspeed: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    if(city) {
        const api = await fetch(`HTTPS://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0ceeb6d2cd47c2a59d70272403971e35&units=metric`);
        const data = await api.json();
      try{  
      var sunset = data.sys.sunset;
      } catch (e) {
        alert('Введите существующее название города по-русски по-английски ');
        window.location.reload()
      }
      var date = new Date();
      date.setTime(sunset);
      var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        windspeed: data.wind.speed,
        sunset: sunset_date,
        error: undefined
      });
    } else {
      this.setState({
    temp: undefined,
    city: undefined,
    country: undefined,
    windspeed: undefined,
    sunset: undefined,
    error: "Введите название города"
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
                sunset={this.state.sunset}
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