import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Input from "./components/Input";
import Home from "./components/Home";
import CreateAcc from "./components/CreateAcc";
import SignIn from "./components/SignIn";
import ForgotPw from "./components/ForgotPw";
import CodeVerif from "./components/CodeVerif";
import ResetPw from "./components/ResetPw";
import React, { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
        headerTintColor: '#111111',
        headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
        headerTitleAlign: 'center',
      }}>
        <Stack.Screen
          name="Welcome to TSe-Market!"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Homepage" component={Home} />
        <Stack.Screen
          name="Create Account"
          component={CreateAcc}
          options={{ title: 'Create new account' }}
        />
        <Stack.Screen
          name="Forgot Password"
          component={ForgotPw}
          options={{ title: 'Forgot password?' }}
        />
        <Stack.Screen
          name="Code Verification"
          component={CodeVerif}
          options={{ title: 'Verify your code' }}
        />
        <Stack.Screen
          name="Reset Password"
          component={ResetPw}
          options={{ title: 'Reset your password' }}
        />
        <Stack.Screen
          name="Account Sign-In"
          component={SignIn}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <View style={styles.card}>
        <View style={styles.mark}>
          <Text style={styles.markText}>TS</Text>
        </View>
        <Text style={styles.heading}>TSe-Market</Text>
        <Text style={styles.subheading}>
          Second-hand finds for TIPians.
        </Text>

        <Input onSignInPress={() => navigation.navigate('Homepage')} />

        <View style={styles.links}>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Forgot Password')}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Create Account')}>
            <Text style={styles.linkText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  accentTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#F59E0B',
  },
  accentBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: '#BEBEBE',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: '#BEBEBE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  mark: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  markText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 12,
  },
  link: {
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});