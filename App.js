import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');

  const calculateSum = () => {
    const sum = parseFloat(number1) + parseFloat(number2);
    setResult(sum.toString());
  };

  const calculateDifference = () => {
    const difference = parseFloat(number1) - parseFloat(number2);
    setResult(difference.toString());
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number1}
        onChangeText={text => setNumber1(text)}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={number2}
        onChangeText={text => setNumber2(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateSum}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calculateDifference}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  result: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});