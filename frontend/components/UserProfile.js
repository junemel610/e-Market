import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

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
    <View key={item.category}>
      <Text style={styles.savedItemsCategory}>{item.category}:</Text>
      <View style={styles.bulletList}>
        {item.items.map((savedItem) => (
          <View key={savedItem.id} style={styles.bulletListItem}>
            <Text style={styles.bulletPoint}>➜</Text>
            <Text style={styles.savedItem}>{savedItem.name}</Text>
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
      <View style={styles.stateContainer}>
        <ActivityIndicator color="#545F71" />
        <Text style={styles.stateMessage}>Loading your profile…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={user.profileImage || defaultProfileImage} style={styles.profileImage} />

      {editing ? (
        <>
          <Input
            label="Username"
            placeholder="i.e. Juan23"
            value={user.username}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, username: text }))}
          />
          <Input
            label="Full Name"
            placeholder="i.e. Juan dela Cruz"
            value={user.fullname}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, fullname: text }))}
          />
          <Input
            label="Contact Number"
            placeholder="+639........."
            value={user.contactNumber.toString()}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, contactNumber: text }))}
          />
          <Input
            label="School Email"
            placeholder="username@tip.edu.ph"
            value={user.email}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, email: text }))}
          />
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Program:</Text>
            <Picker
              style={styles.picker}
              selectedValue={user.program}
              onValueChange={(itemValue) => setUser((prevUser) => ({ ...prevUser, program: itemValue }))}
            >
              {programs.map((program, index) => (
                <Picker.Item key={index} label={program} value={program} />
              ))}
            </Picker>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Year Level:</Text>
            <Picker
              style={styles.picker}
              selectedValue={user.yearLevel}
              onValueChange={(itemValue) => setUser((prevUser) => ({ ...prevUser, yearLevel: itemValue }))}
            >
              {yearLevels.map((year, index) => (
                <Picker.Item key={index} label={year} value={year} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity style={styles.editUpdateButton} onPress={handleSaveProfile} disabled={savingProfile}>
            <Text style={styles.editUpdateButtonText}>{savingProfile ? 'Saving…' : 'Update Profile'}</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.fullName}>{user.fullname}</Text>
          <Text style={styles.contactNumber}>{user.contactNumber}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.programYear}>
            {user.program}, {user.yearLevel}
          </Text>
          <TouchableOpacity style={styles.editUpdateButton} onPress={() => setEditing(true)}>
            <Text style={styles.editUpdateButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.separator} />
      <Text style={styles.savedItemsListHeader}>Your Saved Items ✅🏷️</Text>

      <FlatList
        data={savedItemsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.category}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  stateMessage: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 125,
    height: 125,
    borderRadius: 65,
    marginTop: 20,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  fullName: {
    fontSize: 20,
    paddingBottom: 5,
  },
  contactNumber: {
    fontSize: 20,
    paddingBottom: 5,
  },
  email: {
    fontSize: 20,
    paddingBottom: 5,
  },
  programYear: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingBottom: 5,
  },
  pickerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerLabel: {
    marginRight: 10,
    fontSize: 18,
    paddingLeft: 20,
  },
  picker: {
    flex: 1,
  },
  separator: {
    borderBottomWidth: 3,
    borderBottomColor: 'gray',
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
  },
  editUpdateButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  editUpdateButtonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  savedItemsListHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 9,
    marginBottom: 15,
  },
  savedItemsCategory: {
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  savedItem: {
    fontSize: 16,
    paddingBottom: 3,
  },
  bulletList: {
    marginLeft: 20,
  },
  bulletListItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPoint: {
    fontSize: 18,
    marginRight: 5,
  },
});

export default UserProfile;
