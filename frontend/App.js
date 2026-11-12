import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Input from "./components/Input";
import Home from "./components/Home";
import CreateAcc from "./components/CreateAcc";
import SignIn from "./components/SignIn";
import ForgotPw from "./components/ForgotPw";
import CodeVerif from "./components/CodeVerif";
import ResetPw from "./components/ResetPw";
import theme from './src/theme';
import React, { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: theme.colors.primary, borderBottomWidth: 0 },
          headerTintColor: theme.colors.onPrimary,
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: theme.colors.onPrimary },
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
    </SafeAreaProvider>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TSe-Market</Text>
      <Text style={styles.subheading}>Second-hand finds for TIPians.</Text>
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Homepage')} activeOpacity={0.85}>
        <Text style={styles.signInText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('Create Account')} activeOpacity={0.85}>
        <Text style={styles.createText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  heading: { fontSize: 26, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs, lineHeight: 32 },
  subheading: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.lg, lineHeight: 22 },
  signInButton: { backgroundColor: theme.colors.primary, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 300 },
  signInText: { color: theme.colors.onPrimary, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold },
  createButton: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 300, marginTop: theme.spacing.sm },
  createText: { color: theme.colors.text, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold },
});
