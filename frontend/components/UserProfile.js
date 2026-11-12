import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useNavigation, useIsFocused } from '@react-navigation/native';  

const backendUrl = Constants.expoConfig.extra.REACT_APP_BACKEND_URL;

const UserProfile = () => {
  
  const isFocused = useIsFocused();
  const defaultProfileImage = require('../assets/profilePic.jpg');

  const [user, setUser] = useState(null);

  const [savedItems, setSavedItems] = useState({
    Electronics: [

    ],
    Clothing: [

    ],
    School: [
      { id: 1, name: 'T - Square' },
    ],
    Uniform: [
      
    ],
  });

  const [editing, setEditing] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [profileRetry, setProfileRetry] = useState(0);

  const handleSaveProfile = async () => {
    if (savingProfile) return;
    try {
      setSavingProfile(true);
      const storedToken = await AsyncStorage.getItem('token');

      if (storedToken) {
        const response = await axios.patch(`${backendUrl}/update-user`, user, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!response.data?.success) {
          Alert.alert('Profile not updated', response.data?.message || 'Please try again.');
          return;
        }
        setUser(response.data.user || user);
        setEditing(false);
        Alert.alert('Profile updated', 'Your profile changes have been saved.');
      } else {
        Alert.alert('Sign in required', 'Your session is missing. Please sign in again.');
      }
    } catch (error) {
      Alert.alert('Profile not updated', error.response?.data?.message || 'Please try again.');
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
    if (!isFocused) return undefined;
    let isCurrent = true;
    const fetchUserData = async () => {
      setLoadingProfile(true);
      setProfileError('');
      try {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          if (isCurrent) setProfileError('Your session is missing. Please sign in again.');
          return;
        }

        const response = await axios.get(`${backendUrl}/user-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.success) {
          throw new Error(response.data.message || 'Could not load your profile.');
        }
        if (isCurrent) {
          const userProfile = response.data.user;
          setUser({
            ...userProfile,
            profileImage: userProfile.profileImage || defaultProfileImage,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (isCurrent) setProfileError(error.response?.data?.message || error.message || 'Could not load your profile.');
      } finally {
        if (isCurrent) setLoadingProfile(false);
      }
    };

    fetchUserData();
    return () => { isCurrent = false; };
  }, [isFocused, profileRetry]);

  if (loadingProfile && !user) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator color="#545F71" />
        <Text style={styles.stateMessage}>Loading your profile…</Text>
      </View>
    );
  }

  if (profileError && !user) {
    return (
      <View style={styles.stateContainer}>
        <Text accessibilityRole="alert" style={styles.stateMessage}>{profileError}</Text>
        <TouchableOpacity style={styles.editUpdateButton} onPress={() => setProfileRetry((retry) => retry + 1)}>
          <Text style={styles.editUpdateButtonText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={user?.profileImage || defaultProfileImage} style={styles.profileImage} />

      {editing ? (
        <>
          <Input
            label="Username"
            placeholder="i.e. Juan23"
            value={user?.username}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, username: text }))}
          />
          <Input
            label="Full Name"
            placeholder="i.e. Juan dela Cruz"
            value={user?.fullname}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, fullname: text }))}
          />
          <Input
            label="Contact Number"
            placeholder="+639........."
            value={user?.contactNumber.toString()}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, contactNumber: text }))}
          />

          <Input
            label="School Email"
            placeholder="username@tip.edu.ph"
            value={user?.email}
            onChangeText={(text) => setUser((prevUser) => ({ ...prevUser, email: text }))}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Select Program:</Text>
            <Picker
              style={styles.picker}
              selectedValue={user?.program}
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
              selectedValue={user?.yearLevel}
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
          <Text style={styles.userName}>{user?.username}</Text>
          <Text style={styles.fullName}>{user?.fullname}</Text>
          <Text style={styles.contactNumber}>{user?.contactNumber}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.programYear}>
            {user?.program}, {user?.yearLevel}
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
