import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const BLACK = '#000000';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const WHITE = '#FFFFFF';
const CARD = '#111111';

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
          <View style={styles.mark}>
            <Text style={styles.markText}>TS</Text>
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
  page: {
    flex: 1,
    backgroundColor: BLACK,
    padding: 16,
  },
  accentTop: {
    position: 'absolute',
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: AMBER,
    opacity: 0.15,
  },
  accentBottom: {
    position: 'absolute',
    bottom: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: GRAY,
    opacity: 0.1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: GRAY,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
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
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  markText: {
    fontSize: 24,
    fontWeight: '800',
    color: BLACK,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: WHITE,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 32,
  },
  subheading: {
    fontSize: 15,
    color: GRAY,
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
    color: AMBER,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    color: WHITE,
    backgroundColor: BLACK,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 52,
  },
  picker: {
    color: WHITE,
    backgroundColor: BLACK,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#B45309',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: BLACK,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 14,
    color: GRAY,
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

export default CreateAcc;
