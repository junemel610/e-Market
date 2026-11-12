import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

const BLACK = '#000000';
const AMBER = '#F59E0B';
const GRAY = '#BEBEBE';
const WHITE = '#FFFFFF';
const CARD = '#111111';

const defaultProfileImage = require('../assets/profilePic.jpg');

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [user, setUser] = useState({
    username: 'juan23',
    fullname: 'Juan Dela Cruz',
    contactNumber: '+639123456789',
    email: 'juan@tip.edu.ph',
    program: 'Computer Science',
    yearLevel: '3rd Year',
    profileImage: defaultProfileImage,
  });

  const [savedItems, setSavedItems] = useState({
    Electronics: [],
    Clothing: [],
    School: [
      { id: 1, name: 'T - Square' },
    ],
    Uniform: [],
  });

  const handleSaveProfile = async () => {
    if (savingProfile) return;
    try {
      setSavingProfile(true);

      await new Promise((resolve) => setTimeout(resolve, 800));

      setEditing(false);
      Alert.alert('Profile updated', 'Your profile changes have been saved locally.');
    } catch (error) {
      Alert.alert('Profile not updated', 'Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setSavingProfile(false);
    }
  };

  const programs = [
    'Computer Science',
    'Computer Engineering',
    'Civil Engineering',
    'Architecture',
    'Mechanical Engineering',
    'Business Management',
  ];

  const yearLevels = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];

  const savedItemsData = Object.entries(savedItems).map(([category, items]) => ({
    category,
    items,
  }));

  const renderItem = ({ item }) => (
    <View key={item.category} style={styles.categoryBlock}>
      <Text style={styles.categoryTitle}>{item.category}</Text>
      <View style={styles.itemsList}>
        {item.items.map((savedItem) => (
          <View key={savedItem.id} style={styles.itemRow}>
            <Text style={styles.itemName}>{savedItem.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  useEffect(() => {
    setLoadingProfile(false);
  }, []);

  if (loadingProfile) {
    return (
      <View style={styles.page}>
        <ActivityIndicator color={AMBER} style={styles.spinner} />
        <Text style={styles.loadingText}>Loading your profile…</Text>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.accentTop} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Image source={user.profileImage || defaultProfileImage} style={styles.profileImage} />

          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.fullName}>{user.fullname}</Text>
          <Text style={styles.contactNumber}>{user.contactNumber}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.programYear}>
            {user.program}, {user.yearLevel}
          </Text>

          <View style={styles.buttonRow}>
            {editing ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.buttonOutline, savingProfile && styles.buttonDisabled]}
                  onPress={handleSaveProfile}
                  disabled={savingProfile}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.buttonText, styles.buttonOutlineText]}>
                    {savingProfile ? 'Saving…' : 'Update profile'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.buttonFill]}
                  onPress={() => setEditing(true)}
                  activeOpacity={0.85}
                >
                  <Text style={styles.buttonText}>Edit profile</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          {editing && (
            <>
              <View style={styles.divider} />
              <Text style={styles.subheading}>Profile details</Text>

              <View style={styles.field}>
                <Input
                  label="Username"
                  placeholder="i.e. Juan23"
                  value={user.username}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.profileInput}
                  onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, username: text }))}
                />
              </View>
              <View style={styles.field}>
                <Input
                  label="Full Name"
                  placeholder="i.e. Juan dela Cruz"
                  value={user.fullname}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.profileInput}
                  onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, fullname: text }))}
                />
              </View>
              <View style={styles.field}>
                <Input
                  label="Contact Number"
                  placeholder="+639........."
                  value={user.contactNumber.toString()}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.profileInput}
                  onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, contactNumber: text }))}
                />
              </View>
              <View style={styles.field}>
                <Input
                  label="School Email"
                  placeholder="username@tip.edu.ph"
                  value={user.email}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.profileInput}
                  onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, email: text }))}
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.pickerLabel}>Program</Text>
                <Picker
                  style={styles.profilePicker}
                  selectedValue={user.program}
                  onValueChange={(itemValue) => setUser((prevUser) => ({ ...prevUser, program: itemValue }))}
                >
                  {programs.map((program, index) => (
                    <Picker.Item key={index} label={program} value={program} />
                  ))}
                </Picker>
              </View>

              <View style={styles.field}>
                <Text style={styles.pickerLabel}>Year Level</Text>
                <Picker
                  style={styles.profilePicker}
                  selectedValue={user.yearLevel}
                  onValueChange={(itemValue) => setUser((prevUser) => ({ ...prevUser, yearLevel: itemValue }))}
                >
                  {yearLevels.map((year, index) => (
                    <Picker.Item key={index} label={year} value={year} />
                  ))}
                </Picker>
              </View>
            </>
          )}

          <View style={styles.divider} />
          <Text style={styles.subheading}>Your saved items</Text>

          <FlatList
            data={savedItemsData}
            renderItem={renderItem}
            keyExtractor={(item) => item.category}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </ScrollView>

      <View style={styles.accentBottom} />
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
    paddingBottom: 40,
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
    alignItems: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: AMBER,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: WHITE,
    marginBottom: 4,
  },
  fullName: {
    fontSize: 16,
    color: GRAY,
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 14,
    color: GRAY,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: GRAY,
    marginBottom: 8,
  },
  programYear: {
    fontSize: 14,
    fontWeight: '600',
    color: AMBER,
    marginBottom: 24,
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    minWidth: 140,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonFill: {
    backgroundColor: AMBER,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: AMBER,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '800',
  },
  buttonOutlineText: {
    color: WHITE,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: GRAY,
    marginVertical: 24,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '700',
    color: WHITE,
    marginBottom: 16,
    textAlign: 'center',
    width: '100%',
  },
  field: {
    width: '100%',
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: AMBER,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 0,
  },
  profileInput: {
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
  profilePicker: {
    color: WHITE,
    backgroundColor: BLACK,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 10,
    minHeight: 52,
    width: '100%',
  },
  categoryBlock: {
    width: '100%',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: AMBER,
    marginBottom: 8,
  },
  itemsList: {
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 14,
    color: WHITE,
  },
  loadingText: {
    fontSize: 15,
    color: GRAY,
    marginTop: 12,
    textAlign: 'center',
  },
  spinner: {
    marginBottom: 12,
  },
});
