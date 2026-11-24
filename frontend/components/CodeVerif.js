import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import theme from '../src/theme';
import { apiRequest } from '../src/api';

const tseMarketLogo = require('../assets/TSeMarketLogo.jpg');

export default function CodeVerification({ navigation, route }) {
  const { email } = route.params;
  const [enteredCode, setEnteredCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerifyCode = async () => {
    if (loading) return;
    if (!/^\d{6}$/.test(enteredCode.trim())) {
      setError('Enter the six-digit verification code.');
      return;
    }
    setError('');
    try {
      setLoading(true);

      await apiRequest('/verify-code', {
        method: 'POST',
        body: { email, code: Number(enteredCode) },
      });
      navigation.navigate('Reset Password', { email });
    } catch (error) {
      console.error('Verification Error:', error);
      setError(error.message || 'Could not verify this code. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <View style={styles.card}>
        <View style={styles.markContainer}>
          <Image source={tseMarketLogo} style={styles.markImage} />
        </View>

        <Text style={styles.heading}>Verify your code</Text>
        <Text style={styles.subheading}>
          Enter the verification code sent to {email}.
        </Text>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.field}>
          <Text style={styles.label}>Verification code</Text>
          <TextInput
            style={styles.input}
            value={enteredCode}
            keyboardType="number-pad"
            maxLength={6}
            accessibilityLabel="Six-digit verification code"
            autoCorrect={false}
            spellCheck={false}
            onChangeText={(text) => { setEnteredCode(text.replace(/\D/g, '')); setError(''); }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleVerifyCode}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verifying…' : 'Verify'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Back to email</Text>
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
  errorText: { fontSize: theme.fontSize.xs, color: theme.colors.danger, marginBottom: theme.spacing.md, textAlign: 'center' },
  field: { marginBottom: theme.spacing.md },
  label: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, color: theme.colors.primary, marginBottom: theme.spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: 20, color: theme.colors.text, backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, textAlign: 'center', paddingVertical: theme.spacing.md, minHeight: 52 },
  button: { backgroundColor: theme.colors.primary, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', marginTop: theme.spacing.sm, marginBottom: theme.spacing.md },
  buttonDisabled: { opacity: 0.6, backgroundColor: theme.colors.warning },
  buttonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary },
  link: { alignSelf: 'center' },
  linkText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.colors.primary, textDecorationLine: 'underline' },
});
