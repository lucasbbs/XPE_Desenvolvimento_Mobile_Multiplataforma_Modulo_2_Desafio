import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { api } from '../services/api';
import { apikey } from '@env';
import { StatusBar } from 'expo-status-bar';

export const DetailsMovie = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  useEffect(() => {
    const getDataFromApi = async () => {
      const params = { i: id, apikey };
      try {
        const { data } = await api.get('', { params });
        setData(data);
        console.log(data);
      } catch (error) {}
    };
    getDataFromApi();
  }, []);
  return (
    data !== null && (
      <View style={styles.container}>
        <Image source={{ uri: data.Poster }} width={100} height={100} />
        <Text>Title: {data.Title}</Text>
        <Text>Year: {data.Year}</Text>
        <Text>Rated: {data.Rated}</Text>
        <Text>Runtime: {data.Runtime}</Text>
        <Text>Genre: {data.Genre}</Text>
        <Text>Director: {data.Director}</Text>
        <Text>Writer: {data.Writer}</Text>
        <Text>Actors: {data.Actors}</Text>
        <Text>Plot: {data.Plot}</Text>
        <Text>Language: {data.Language}</Text>
        <Text>Country: {data.Country}</Text>
        <Text>Awards: {data.Awards}</Text>
        <Text>Metascore: {data.Metascore}</Text>
        <Text>imdbRating: {data.imdbRating}</Text>
        <Text>imdbVotes: {data.imdbVotes}</Text>
        <Text>imdbID: {data.imdbID}</Text>
        <Text>DVD: {data.DVD}</Text>
        <Text>BoxOffice: {data.BoxOffice}</Text>
        <Text>Website: {data.Website}</Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});
