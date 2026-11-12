import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const AMBER = '#F59E0B';
const CREAM = '#F8FAFC';
const MUTED = '#94A3B8';

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

      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Code verified locally for:', email);
      navigation.navigate('Reset Password', { email });
    } catch (error) {
      console.error('Verification Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <View style={styles.card}>
        <View style={styles.mark}>
          <Text style={styles.markText}>TS</Text>
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
            value={enteredCode}
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
  page: {
    flex: 1,
    backgroundColor: '#1E1B4B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  accentTop: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#5B21B6',
    opacity: 0.6,
  },
  accentBottom: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#BE185D',
    opacity: 0.5,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#4338CA',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  mark: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  markText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: CREAM,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 13,
    color: '#FCA5A5',
    marginBottom: 14,
    textAlign: 'center',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 20,
    color: CREAM,
    backgroundColor: '#3730A3',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    textAlign: 'center',
    paddingVertical: 14,
    minHeight: 52,
  },
  button: {
    backgroundColor: AMBER,
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 52,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#D97706',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B4B',
  },
  link: {
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '#FBBF24',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
