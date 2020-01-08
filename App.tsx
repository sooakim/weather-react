import React from 'react';
import Loading from './Loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import axios from 'axios';

const API_KEY = "0f9fcfa26b0049894f9765251a2baf35";

export default class extends React.Component {
  state = {
    isLoading: true,
    temp: 0
  };

  getLocation = () => {
    Location.requestPermissionsAsync()
      .then(() => {
        return Location.getCurrentPositionAsync();
      }).then((location) => {
        const { coords: {latitude, longitude} } = location;
        return `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`;
      }).then((url) => {
        return axios.get(url);
      }).then((response) => {
        const { data } = response;
        this.setState({ isLoading: false, temp: data.main.temp });
      }).catch((error) => {
        console.log(error);
        Alert.alert("failed!");
        this.setState({ isLoading: false });
      });
  }

  componentDidMount(){
    this.getLocation();
  }

  render(){
    const { isLoading, temp } = this.state;
    return isLoading ? <Loading/> : <Weather temp={ Math.round(temp) }/>;
  }
}
