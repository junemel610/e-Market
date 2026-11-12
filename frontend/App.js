import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from "./components/Input";
import Home from "./components/Home";
import CreateAcc from "./components/CreateAcc";
import SignIn from "./components/SignIn";
import ForgotPw from "./components/ForgotPw";
import CodeVerif from "./components/CodeVerif";
import ResetPw from "./components/ResetPw";
import theme from './src/theme';
import React, { useState } from 'react';

const tseMarketLogo = require('./assets/TSeMarketLogo.jpg');

const Stack = createStackNavigator();

export default function App() {
  return (
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
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <View style={styles.card}>
        <View style={styles.markContainer}>
          <Image source={tseMarketLogo} style={styles.markImage} />
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  accentTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 60, backgroundColor: theme.colors.primary },
  accentBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, backgroundColor: theme.colors.border },
  card: { width: '100%', maxWidth: 360, backgroundColor: theme.colors.surface, borderRadius: 20, padding: theme.spacing.xl, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4, alignItems: 'center' },
  markContainer: { alignItems: 'center', marginBottom: theme.spacing.md },
  markImage: { width: 72, height: 72, borderRadius: 16 },
  heading: { fontSize: 26, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs, lineHeight: 32 },
  subheading: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.lg, lineHeight: 22 },
  links: { flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.md, marginTop: theme.spacing.sm },
  link: { alignSelf: 'center' },
  linkText: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: theme.colors.primary, textDecorationLine: 'underline' },
});
