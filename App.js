import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HotelScreen from './components/HotelScreen';
import HomeScreen from './components/HomeScreen';
import AddPlanScreen from './components/AddPlanScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddPlan" component={AddPlanScreen} />
        <Stack.Screen name="Hotels" component={HotelScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}