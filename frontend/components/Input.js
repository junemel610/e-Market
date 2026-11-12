import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const backendUrl = Constants.expoConfig.extra.REACT_APP_BACKEND_URL;

export default function Input({ onSignInPress }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignInPress = async () => {
    if (loading) return;
    if (!username.trim() || !password) {
      setErrorMessage('Enter your username or email and password.');
      return;
    }
    setErrorMessage('');
    setLoading(true);
    try {
      // The API accepts either a username or an email in its `username` field.
      const response = await axios.post(`${backendUrl}/sign-in`, { username: username.trim(), password });
  
      if (response.data && response.data.success) {
        const token = response.data.token;
        if (!token) throw new Error('The server did not return a session token.');
        await AsyncStorage.setItem('token', token);
        onSignInPress();
      } else {
        setErrorMessage(response.data.message || 'Unable to sign in. Check your credentials.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.inputGroup}>
      <View style={styles.container}>
        <Text style={styles.textColor}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          autoCapitalize="none"
          textContentType="username"
          accessibilityLabel="Username or email"
          onChangeText={(text) => { setUsername(text); setErrorMessage(''); }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.textColor}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          textContentType="password"
          accessibilityLabel="Password"
          onChangeText={(text) => { setPassword(text); setErrorMessage(''); }}
        />
      </View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSignInPress}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>{loading ? 'Signing in…' : 'Log In'}</Text>
      </TouchableOpacity>
      {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  input: {
    padding: 10,
    minHeight: 44,
    borderColor: '#EFD02C',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 10,
    fontStyle: 'italic',
    width: 300,
    color: '#EFD02C',
  },
  container: {
    width: '100%',
    padding: 10,
  },
  textColor: {
    color: '#EFD02C',
    marginBottom: 5,
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
  error: { color: '#FFD2D2', marginTop: 12, textAlign: 'center' },
});
