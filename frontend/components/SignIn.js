import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler  } from 'react-native';
import axios from 'axios';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendUrl = Constants.expoConfig.extra.REACT_APP_BACKEND_URL;

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignInAccount = async () => {
    try {
      if (loading) return;
      if (!username.trim() || !password) {
        Alert.alert('Sign in required', 'Enter your username or email and password.');
        return;
      }
      setLoading(true);
      const response = await axios.post(`${backendUrl}/sign-in`, {
        username: username.trim(),
        password: password,
      });
  
      console.log('Login Response:', response.data);
  
      if (response.data && response.data.success) {
        const token = response.data.token;
        if (!token) throw new Error('The server did not return a session token.');
        await AsyncStorage.setItem('token', token);
        navigation.navigate('Homepage');
        
      } else {
        console.error('Error during login:', response.data.message);
  
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
  
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Prevent going back when the user is on the Sign In screen
      return true;
    });

    return () => backHandler.remove(); // Cleanup the event listener on component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, dear TIPian!</Text>
      <Text style={styles.text1}>Log in below and enter your credentials:</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          autoCapitalize="none"
          textContentType="username"
          accessibilityLabel="Username or email"
          onChangeText={(text) => setUsername(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          textContentType="password"
          accessibilityLabel="Password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSignInAccount}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>{loading ? 'Signing in…' : 'Sign In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newAccountButton}
        onPress={() => navigation.navigate('Forgot Password')}
      >
        <View style={styles.but}>
          <Text style={styles.style2}>Forgot Password?</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.newAccountButton}
        onPress={() => navigation.navigate('Create Account')}
      >
        <View style={styles.but}>
          <Text style={styles.style2}>New Here? Create an Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  but: {
    paddingBottom: 10,
    paddingTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EFD02C',
    marginBottom: 10,
  },
  text1: {
    fontSize: 17,
    color: '#EFD02C',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#EFD02C',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    minHeight: 44,
    padding: 10,
    borderColor: '#EFD02C',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 5,
    color: '#EFD02C',
  },
  createButton: {
    backgroundColor: '#EFD02C',
    paddingVertical: 10,
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#545F71',
  },
  style2: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#EFD02C',
    textDecorationLine: 'underline',
  },
});
