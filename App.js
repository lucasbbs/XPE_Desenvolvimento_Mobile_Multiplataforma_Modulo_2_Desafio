import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ListMovies } from './src/pages/ListMovies';
import { DetailsMovie } from './src/pages/DetailsMovie';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={ListMovies} />
        <Stack.Screen name='Details' component={DetailsMovie} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
