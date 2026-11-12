import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../src/theme';

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
    <View style={styles.inputGroup}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: { margin: 5 },
  input: { padding: 10, minHeight: 52, borderColor: theme.colors.border, borderWidth: 1, fontSize: theme.fontSize.base, borderRadius: 10, fontStyle: 'italic', width: 300, color: theme.colors.text, backgroundColor: theme.colors.surfaceMuted },
  container: { width: '100%', padding: 10 },
  textColor: { color: theme.colors.primary, marginBottom: theme.spacing.xs, fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, textTransform: 'uppercase', letterSpacing: 0.5 },
  createButton: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, minHeight: 52, paddingHorizontal: 20, borderRadius: 10, marginTop: theme.spacing.sm },
  createButtonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary },
  error: { color: theme.colors.danger, marginTop: theme.spacing.xs, textAlign: 'center', fontSize: theme.fontSize.xs },
});
