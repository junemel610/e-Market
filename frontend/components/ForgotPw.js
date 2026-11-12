import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendCode = async () => {
    try {
      if (loading) return;
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        setErrorMessage('Enter the email address associated with your account.');
        return;
      }
      setErrorMessage('');
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Verification code sent locally to:', normalizedEmail);
      navigation.navigate('Code Verification', { email: normalizedEmail });
    } catch (error) {
      console.error('Error sending verification code:', error);
      setErrorMessage('Could not send the code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Did you forget your password?</Text>
      <Text style={styles.text1}>Enter your email and wait for the verification code</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          accessibilityLabel="Account email"
          onChangeText={(text) => { setEmail(text); setErrorMessage(''); }}
        />
      </View>
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSendCode}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>{loading ? 'Sending…' : 'Next'}</Text>
      </TouchableOpacity>
      {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}
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
  error: { color: '#FFD2D2', marginTop: 12, textAlign: 'center' },
});
