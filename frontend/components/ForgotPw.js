import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const WHITE = '#FFFFFF';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const BLACK = '#111111';
const CARD = '#F3F4F6';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = async () => {
    try {
      if (loading) return;
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        setError('Enter the email address associated with your account.');
        return;
      }
      setError('');
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log('Verification code sent locally to:', normalizedEmail);
      navigation.navigate('Code Verification', { email: normalizedEmail });
    } catch (error) {
      console.error('Error sending verification code:', error);
      setError('Could not send the code. Try again.');
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

        <Text style={styles.heading}>Forgot password?</Text>
        <Text style={styles.subheading}>
          Enter your email and we’ll send a verification code.
        </Text>

        {!!error && <Text style={styles.errorText}>{error}</Text>}

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            accessibilityLabel="Account email"
            autoCorrect={false}
            spellCheck={false}
            value={email}
            onChangeText={(text) => { setEmail(text); setError(''); }}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSendCode}
          disabled={loading}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Sending…' : 'Send code'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={() => navigation.goBack()}>
          <Text style={styles.linkText}>Back to sign in</Text>
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
    marginBottom: 20,
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
  errorText: {
    fontSize: 13,
    color: '#DC2626',
    marginBottom: 14,
    textAlign: 'center',
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
  button: {
    backgroundColor: AMBER,
    borderRadius: 10,
    paddingVertical: 14,
    minHeight: 52,
    alignItems: 'center',
    marginTop: 8,
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
  link: {
    alignSelf: 'center',
  },
  linkText: {
    fontSize: 14,
    color: AMBER,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
