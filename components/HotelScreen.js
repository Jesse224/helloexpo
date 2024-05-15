import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, FlatList, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import Geocoder from 'react-native-geocoding';

Geocoder.init("AIzaSyCxNStPUnSPj7WtgMQP9fvqfTjw7rCJCZc");

function HotelScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    latitude: 60.1699,
    longitude: 24.9384,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchLocations = async () => {
    const options = {
      method: 'GET',
      url: 'https://airbnb13.p.rapidapi.com/autocomplete',
      params: { query: query },
      headers: {
        'X-RapidAPI-Key': '5bfd6155c1mshe2c7a35b161a1a6p1ee18cjsn885144d2cee3',
        'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
      }
    };

    setLoading(true);
    try {
      const response = await axios.request(options);
      if (Array.isArray(response.data)) {
        setResults(response.data);
        const firstLocation = response.data[0];
        getCoordinates(firstLocation.query);
      } else {
        console.error('Data format is incorrect:', response.data);
        setResults([]);
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
    setLoading(false);
  };

  const getCoordinates = async (address) => {
    try {
      const geo = await Geocoder.from(address);
      const coords = geo.results[0].geometry.location;
      setRegion({
        latitude: coords.lat,
        longitude: coords.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  const renderResult = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.query}</Text>
      <Text>{item.country}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter city or location"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search Locations" onPress={fetchLocations} />
      {loading ? <Text>Loading...</Text> :
        <FlatList
          data={results}
          renderItem={renderResult}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker coordinate={region} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  map: {
    width: '100%',
    height: 200,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default HotelScreen;