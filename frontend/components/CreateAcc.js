import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../src/theme';

const tseMarketLogo = require('../assets/TSeMarketLogo.jpg');

const programs = [
  'Computer Science',
  'Computer Engineering',
  'Civil Engineering',
  'Architecture',
  'Mechanical Engineering',
  'Business Management',
];

const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

const CreateAcc = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAccount = async () => {
    try {
      if (loading) return;
      if (!email.trim() || !username.trim() || !password || !fullname.trim() || !contactNumber.trim() || !selectedProgram || !selectedYearLevel) {
        setError('All fields are required.');
        return;
      }
      setError('');
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      Alert.alert('Account created', 'Your account has been created locally.');
      navigation.navigate('Account Sign-In');
    } catch (error) {
      Alert.alert('Could not create account', 'Please try again.');
      console.error('Error creating account:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.accentTop} />
      <View style={styles.accentBottom} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
        <View style={styles.markContainer}>
          <Image source={tseMarketLogo} style={styles.markImage} />
        </View>

          <Text style={styles.heading}>Create account</Text>
          <Text style={styles.subheading}>
            Join TSe-Market and start trading with fellow TIPians.
          </Text>

          {!!error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              spellCheck={false}
              value={email}
              onChangeText={(text) => { setEmail(text); setError(''); }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Username"
              textContentType="username"
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
              accessibilityLabel="Password"
              textContentType="newPassword"
              autoCorrect={false}
              spellCheck={false}
              value={password}
              secureTextEntry
              onChangeText={(text) => { setPassword(text); setError(''); }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Full name"
              autoCorrect={false}
              spellCheck={false}
              value={fullname}
              onChangeText={(text) => { setFullName(text); setError(''); }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Contact number"
              keyboardType="phone-pad"
              value={contactNumber}
              onChangeText={(text) => { setContactNumber(text); setError(''); }}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Program</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedProgram}
              onValueChange={(itemValue) => { setSelectedProgram(itemValue); setError(''); }}
            >
              <Picker.Item label="Select Program" value="" />
              {programs.map((program, index) => (
                <Picker.Item key={index} label={program} value={program} />
              ))}
            </Picker>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Year Level</Text>
            <Picker
              style={styles.picker}
              selectedValue={selectedYearLevel}
              onValueChange={(itemValue) => { setSelectedYearLevel(itemValue); setError(''); }}
            >
              <Picker.Item label="Select Year Level" value="" />
              {yearLevels.map((level, index) => (
                <Picker.Item key={index} label={level} value={level} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCreateAccount}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating account…' : 'Sign up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Account Sign-In')}>
              <Text style={styles.linkText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.lg },
  accentTop: { position: 'absolute', top: 0, left: 0, right: 0, height: 60, backgroundColor: theme.colors.primary },
  accentBottom: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 20, backgroundColor: theme.colors.border },
  scrollContent: { flexGrow: 1, alignItems: 'center' },
  card: { width: '100%', maxWidth: 360, backgroundColor: theme.colors.surface, borderRadius: 20, padding: theme.spacing.xl, borderWidth: 1, borderColor: theme.colors.border, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  markContainer: { alignItems: 'center', marginBottom: theme.spacing.md },
  markImage: { width: 72, height: 72, borderRadius: 16 },
  heading: { fontSize: 26, fontWeight: '800', color: theme.colors.text, textAlign: 'center', marginBottom: theme.spacing.xs, lineHeight: 32 },
  subheading: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginBottom: theme.spacing.lg, lineHeight: 22 },
  errorText: { fontSize: theme.fontSize.xs, color: theme.colors.danger, marginBottom: theme.spacing.md, textAlign: 'center' },
  field: { marginBottom: theme.spacing.md },
  label: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, color: theme.colors.primary, marginBottom: theme.spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  input: { fontSize: theme.fontSize.base, color: theme.colors.text, backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, minHeight: 52 },
  picker: { color: theme.colors.text, backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, minHeight: 52 },
  button: { backgroundColor: theme.colors.primary, borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', marginTop: theme.spacing.sm, marginBottom: theme.spacing.md },
  buttonDisabled: { opacity: 0.6, backgroundColor: theme.colors.warning },
  buttonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary },
  footerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  footerText: { fontSize: theme.fontSize.base, color: theme.colors.textLight },
  link: { alignSelf: 'center' },
  linkText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.colors.primary, textDecorationLine: 'underline' },
});

export default CreateAcc;
