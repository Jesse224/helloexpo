import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getDatabase, ref, push } from 'firebase/database';
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const addPlanStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0'
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      borderRadius: 5,
      backgroundColor: 'white'
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      color: 'white'
    }
  });

function AddPlanScreen({ navigation }) {
    const [destination, setDestination] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
  
    const addPlan = () => {
      if (destination.trim() === '' || description.trim() === '' || budget === '' || startTime === '' || endTime === '') {
        alert('All fields are required');
        return;
      }
  
      const planData = {
        destination: destination,
        description: description,
        budget: parseInt(budget, 10),
        startTime: startTime,
        endTime: endTime
      };
      const plansRef = ref(database, 'plans');
      push(plansRef, planData);
      navigation.goBack();
    };
  
    return (
      <View style={addPlanStyles.container}>
        <TextInput
          placeholder="Enter destination"
          value={destination}
          onChangeText={(text) => setDestination(text)}
          style={addPlanStyles.input}
        />
        <TextInput
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => setDescription(text)}
          style={addPlanStyles.input}
        />
        <TextInput
          placeholder="Enter budget"
          value={budget}
          onChangeText={(text) => setBudget(text)}
          style={addPlanStyles.input}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter start time"
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
          style={addPlanStyles.input}
        />
        <TextInput
          placeholder="Enter end time"
          value={endTime}
          onChangeText={(text) => setEndTime(text)}
          style={addPlanStyles.input}
        />
        <Button title="Add Plan" onPress={addPlan} color="blue" style={addPlanStyles.button} />
      </View>
    );
  }

  export default AddPlanScreen;