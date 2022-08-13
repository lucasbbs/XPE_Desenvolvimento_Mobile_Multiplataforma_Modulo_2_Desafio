import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { apikey } from '@env';
import { api } from '../services/api';
import { MaterialIcons } from '@expo/vector-icons';

const ListMovies = ({ navigation }) => {
  const [pagination, setPagination] = useState(null);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const params = { s: search, type: 'Movie', page, apikey };

  const handleSubmit = async () => {
    try {
      const { data } = await api.get('', { params });

      setData(data);

      setPagination(Math.ceil(Number(data.totalResults) / 10));
    } catch (error) {}
  };

  const handlePrevious = async () => setPage(Math.max(1, page - 1));

  const handleNext = async () => setPage(Math.min(pagination, page + 1));

  useEffect(() => {
    data.length && handleSubmit();
  }, [page]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
      >
        <View style={{ width: '60%' }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            icon='mail'
            style={{ borderWidth: 1, paddingVertical: 0, paddingHorizontal: 5 }}
          />
        </View>
        <View>
          <Button title='Buscar Filmes' onPress={handleSubmit} />
        </View>
      </View>
      <View>
        {data.Search?.length > 0 && (
          <Text>Total Results: {data.totalResults}</Text>
        )}
      </View>
      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={handlePrevious}
          style={{
            width: 50,
            marginRight: 25,
            backgroundColor: 'blue',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name='navigate-before' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={{
            width: 50,
            marginRight: 25,
            backgroundColor: 'blue',
            alignItems: 'center',
          }}
        >
          <MaterialIcons name='navigate-next' size={24} color='white' />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.Search?.length &&
          data.Search.map((item) => (
            <TouchableOpacity
              key={item.imdbID}
              style={{ flexDirection: 'row', height: 60, alignItems: 'center' }}
              onPress={() =>
                navigation.navigate('Details', {
                  id: item.imdbID,
                })
              }
            >
              <Image
                source={{ uri: item.Poster }}
                style={{ borderRadius: 25 }}
                width={50}
                height={50}
              />
              <Text>{item.Title}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export { ListMovies };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  profile: {
    flexDirection: 'row',
    backgroundColor: '#EEE',
  },
  imageProfile: {
    width: 34,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 44 / 2,
    marginLeft: 10,
    height: 34,
  },
  name: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
  },
});
