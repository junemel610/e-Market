import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

  const handleCreateAccount = async () => {
    try {
      if (loading) return;
      if (!email.trim() || !username.trim() || !password || !fullname.trim() || !contactNumber.trim() || !selectedProgram || !selectedYearLevel) {
        alert('All fields are required');
        console.error('All fields are required');
        return;
      }

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
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Create an account</Text>
        <Text style={styles.text1}>Enter your account details below:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Username"
            textContentType="username"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Password"
            textContentType="newPassword"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Full name"
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Contact number"
            keyboardType="phone-pad"
            onChangeText={(text) => setContactNumber(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Program</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedProgram}
            onValueChange={(itemValue) => setSelectedProgram(itemValue)}
          >
            <Picker.Item label="Select Program" value="" />
            {programs.map((program, index) => (
              <Picker.Item key={index} label={program} value={program} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Year Level</Text>
          <Picker
            style={styles.input}
            selectedValue={selectedYearLevel}
            onValueChange={(itemValue) => setSelectedYearLevel(itemValue)}
          >
            <Picker.Item label="Select Year Level" value="" />
            {yearLevels.map((level, index) => (
              <Picker.Item key={index} label={level} value={level} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAccount}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>{loading ? 'Creating account…' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#545454',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EFD02C',
    marginBottom: 10,
  },
  text1: {
    fontSize: 17,
    color: '#EFD02C',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#EFD02C',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    minHeight: 44,
    padding: 10,
    borderColor: '#EFD02C',
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 5,
    color: '#EFD02C',
  },
  createButton: {
    backgroundColor: '#EFD02C',
    paddingVertical: 10,
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  createButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#545F71',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default CreateAcc;
