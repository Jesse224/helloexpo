import { useEffect, useState } from "react";
import { Text, FlatList, View, Button } from "react-native";
import { onValue, remove } from "firebase/database";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { getDatabase, ref } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f0f0f0'
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333'
    },
    planContainer: {
      backgroundColor: '#ffffff',
      padding: 20,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginBottom: 10
    },
    planHeader: {
      fontWeight: 'bold',
      marginBottom: 5
    },
    planText: {
      marginBottom: 5
    },
    button: {
      backgroundColor: 'red',
      color: 'white'
    }
  });

function HomeScreen({ navigation }) {
    const [plans, setPlans] = useState([]);
    const [markedDates, setMarkedDates] = useState({});
  
    useEffect(() => {
      const db = getDatabase();
      const plansRef = ref(db, 'plans');
      onValue(plansRef, (snapshot) => {
        const data = snapshot.val() || {};
        const loadedPlans = Object.keys(data).map((key) => ({
          key: key,
          ...data[key]
        }));
  
        const newMarkedDates = {};
        loadedPlans.forEach(plan => {
          for (let d = new Date(plan.startTime); d <= new Date(plan.endTime); d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            newMarkedDates[dateStr] = { marked: true, dotColor: 'blue', activeOpacity: 0.5 };
          }
        });
  
        setPlans(loadedPlans);
        setMarkedDates(newMarkedDates);
      });
    }, []);
  
    const deletePlan = (key) => {
      const planRef = ref(database, `plans/${key}`);
      remove(planRef);
    };
  
    const renderPlan = ({ item }) => (
      <View style={styles.planContainer}>
        <Text style={styles.planHeader}>Destination:</Text>
        <Text style={styles.planText}>{item.destination}</Text>
        <Text style={styles.planHeader}>Description:</Text>
        <Text style={styles.planText}>{item.description}</Text>
        <Text style={styles.planHeader}>Budget:</Text>
        <Text style={styles.planText}>{item.budget + "€"}</Text>
        <Text style={styles.planHeader}>Start Time:</Text>
        <Text style={styles.planText}>{item.startTime}</Text>
        <Text style={styles.planHeader}>End Time:</Text>
        <Text style={styles.planText}>{item.endTime}</Text>
        <Button title="Delete" onPress={() => deletePlan(item.key)} color="red" />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>TravelPlanner</Text>
        <Calendar
          markingType={'simple'}
          markedDates={markedDates}
        />
        <Button title="Add Plan" onPress={() => navigation.navigate('AddPlan')} color="blue" />
        <FlatList
          data={plans}
          renderItem={renderPlan}
          keyExtractor={(item) => item.key.toString()}
        />
        <Button title="Search for Airbnb" onPress={() => navigation.navigate('Hotels')} color="blue" />
      </View>
    );
  }

  export default HomeScreen;