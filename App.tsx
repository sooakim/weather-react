import React from 'react';
import Loading from './Loading';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getLocation = () => {
    Location.requestPermissionsAsync()
      .then(() => {
        return Location.getCurrentPositionAsync();
      }).then((location) => {
        const { coords: {latitude, longitude} } = location;
        // TODO: send to API and get weather
        this.setState({ isLoading: false });
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
    const { isLoading } = this.state;
    return isLoading ? <Loading/> : null;
  }
}
