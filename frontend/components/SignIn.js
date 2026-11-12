import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler } from 'react-native';

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
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Welcome back</Text>
        <Text style={styles.subheading}>Sign in to your TSe-Market account</Text>

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
          style={styles.button}
          onPress={handleSignInAccount}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <Text style={styles.dividerText}>Or</Text>
        </View>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Forgot Password')}
        >
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Create Account')}
        >
          <Text style={styles.linkText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 32,
    backgroundColor: '#1E293B',
    borderRadius: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 24,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#F8FAFC',
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 48,
  },
  errorText: {
    fontSize: 13,
    color: '#F87171',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 14,
    minHeight: 48,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerText: {
    fontSize: 13,
    color: '#64748B',
    marginHorizontal: 12,
  },
  linkButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 15,
    color: '#F59E0B',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
