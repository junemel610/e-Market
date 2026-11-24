import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from "./components/Home";
import CreateAcc from "./components/CreateAcc";
import SignIn from "./components/SignIn";
import ForgotPw from "./components/ForgotPw";
import CodeVerif from "./components/CodeVerif";
import ResetPw from "./components/ResetPw";
import theme from './src/theme';
import { apiRequest } from './src/api';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          try {
            await apiRequest('/user-data', { token });
            if (active) setInitialRoute('Homepage');
          } catch (error) {
            if (error.status === 401) {
              await AsyncStorage.removeItem('token');
              if (active) setInitialRoute('Welcome to TSe-Market!');
            } else if (active) {
              // A local API outage should not prevent offline marketplace development.
              setInitialRoute('Homepage');
            }
          }
        } else if (active) setInitialRoute('Welcome to TSe-Market!');
      } catch {
        if (active) setInitialRoute('Welcome to TSe-Market!');
      }
    })();
    return () => { active = false; };
  }, []);

  if (!initialRoute) {
    return <View style={styles.bootstrap}><ActivityIndicator color={theme.colors.primary} accessibilityLabel="Loading your session" /></View>;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{
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
      <TouchableOpacity style={styles.signInButton} onPress={() => navigation.navigate('Account Sign-In')} activeOpacity={0.85}>
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
  bootstrap: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background },
  heading: { fontSize: 26, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs, lineHeight: 32 },
  subheading: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.lg, lineHeight: 22 },
  signInButton: { backgroundColor: theme.colors.primary, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 300 },
  signInText: { color: theme.colors.onPrimary, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold },
  createButton: { borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 300, marginTop: theme.spacing.sm },
  createText: { color: theme.colors.text, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold },
});
