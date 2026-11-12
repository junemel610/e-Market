import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';

const WHITE = '#FFFFFF';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const BLACK = '#111111';
const CARD = '#F3F4F6';

export default function SignIn({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignInAccount = async () => {
    if (loading) return;
    if (!username.trim() || !password) {
      setError('Enter your username or email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      Alert.alert('Signed in', 'Welcome back, ' + username.trim() + '.');
      navigation.navigate('Homepage');
    } catch (error) {
      console.error('Error during sign in:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <View style={styles.card}>
        <View style={styles.mark}>
          <Text style={styles.markText}>TS</Text>
        </View>

        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subheading}>
          Sign in to your TSe-Market account
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Username or email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username or email"
            autoCapitalize="none"
            textContentType="username"
            accessibilityLabel="Username or email"
            autoCorrect={false}
            spellCheck={false}
            value={username}
            onChangeText={(text) => { setUsername(text); setError(''); }}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            textContentType="password"
            accessibilityLabel="Password"
            value={password}
            onChangeText={(text) => { setPassword(text); setError(''); }}
          />
        </View>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignInAccount}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.socialButton} activeOpacity={0.85}>
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Create Account')}>
            <Text style={styles.linkText}>Create an account</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Forgot Password')}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: WHITE,
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
    backgroundColor: AMBER,
  },
  accentBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: GRAY,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: GRAY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mark: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 24,
  },
  markText: {
    fontSize: 24,
    fontWeight: '800',
    color: WHITE,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: BLACK,
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
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: AMBER,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    color: BLACK,
    backgroundColor: CARD,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 52,
  },
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    marginBottom: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: AMBER,
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 52,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#D97706',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: WHITE,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: GRAY,
  },
  dividerText: {
    fontSize: 13,
    color: '#666666',
    marginHorizontal: 12,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 16,
  },
  socialText: {
    fontSize: 15,
    color: BLACK,
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#666666',
  },
  link: {
    alignSelf: 'center',
    marginBottom: 6,
  },
  linkText: {
    fontSize: 14,
    color: AMBER,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
