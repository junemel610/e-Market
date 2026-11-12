import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, BackHandler, Image } from 'react-native';
import theme from '../src/theme';

const tseMarketLogo = require('../assets/TSeMarketLogo.jpg');

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
        <View style={styles.markContainer}>
          <Image source={tseMarketLogo} style={styles.markImage} />
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
  page: { flex: 1, backgroundColor: theme.colors.background, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg },
  accentTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 60, backgroundColor: theme.colors.primary },
  accentBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, backgroundColor: theme.colors.border },
  card: { width: '100%', maxWidth: 360, backgroundColor: theme.colors.surface, borderRadius: 20, padding: theme.spacing.xl, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  markContainer: { alignItems: 'center', marginBottom: theme.spacing.md },
  markImage: { width: 72, height: 72, borderRadius: 16 },
  heading: { fontSize: 26, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs, lineHeight: 32 },
  subheading: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.lg, lineHeight: 22 },
  field: { marginBottom: theme.spacing.md },
  label: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, color: theme.colors.primary, marginBottom: theme.spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: theme.fontSize.base, color: theme.colors.text, backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, minHeight: 52 },
  errorText: { fontSize: theme.fontSize.xs, color: theme.colors.danger, marginBottom: theme.spacing.md, textAlign: 'center' },
  button: { backgroundColor: theme.colors.primary, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', marginBottom: theme.spacing.md },
  buttonDisabled: { opacity: 0.6, backgroundColor: theme.colors.warning },
  buttonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: theme.spacing.md },
  dividerLine: { flex: 1, height: 1, backgroundColor: theme.colors.border },
  dividerText: { fontSize: theme.fontSize.xs, color: theme.colors.textLight, marginHorizontal: theme.spacing.sm, fontWeight: theme.fontWeight.semibold },
  socialButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, marginBottom: theme.spacing.md },
  socialText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.colors.text },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.sm },
  footerText: { fontSize: theme.fontSize.base, color: theme.colors.textLight },
  link: { alignSelf: 'center', marginBottom: theme.spacing.xs },
  linkText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.colors.primary, textDecorationLine: 'underline' },
});
