import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

const BLACK = '#000000';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const WHITE = '#FFFFFF';
const CARD = '#111111';

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

    await new Promise((resolve) => setTimeout(resolve, 800));

    onSignInPress();
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.inputGroup}>
      <View style={styles.container}>
        <Text style={styles.textColor}>Username or email</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          autoCapitalize="none"
          textContentType="username"
          accessibilityLabel="Username or email"
          autoCorrect={false}
          spellCheck={false}
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
          autoCorrect={false}
          spellCheck={false}
          onChangeText={(text) => { setPassword(text); setErrorMessage(''); }}
        />
      </View>
      {!!errorMessage && <Text accessibilityRole="alert" style={styles.error}>{errorMessage}</Text>}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleSignInPress}
        disabled={loading}
        activeOpacity={0.85}
      >
        <Text style={styles.createButtonText}>{loading ? 'Signing in…' : 'Sign in'}</Text>
      </TouchableOpacity>
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
    minHeight: 52,
    borderColor: GRAY,
    borderWidth: 1,
    fontSize: 16,
    borderRadius: 10,
    fontStyle: 'italic',
    width: 300,
    color: WHITE,
    backgroundColor: BLACK,
  },
  container: {
    width: '100%',
    padding: 10,
  },
  textColor: {
    color: AMBER,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  createButton: {
    backgroundColor: AMBER,
    paddingVertical: 14,
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: BLACK,
  },
  error: { color: '#FCA5A5', marginTop: 12, textAlign: 'center', fontSize: 13 },
});
