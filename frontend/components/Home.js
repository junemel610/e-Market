import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Search from '../components/Search';
import UserProfile from '../components/UserProfile';
import MyBag from '../components/MyBag';
import Settings from './Settings';
import AddList from './AddList';

const AMBER = '#F59E0B';
const MUTED = '#666666';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: async () => {
            await new Promise((resolve) => setTimeout(resolve, 300));
            Alert.alert('Logged out', 'See you next time.');
            navigation.navigate('Account Sign-In');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const goToAddList = () => navigation.navigate('Add Item Listing');
  const goToSearch = () => navigation.navigate('Search');
  const goToUserProfile = () => navigation.navigate('UserProfile');
  const goToMyBag = () => navigation.navigate('MyBag');
  const goToSettings = () => navigation.navigate('Settings');

  const dashboardItems = [
    { label: 'Search', icon: 'shopping-search', iconComp: Icon2, color: '#A78BFA', onPress: goToSearch },
    { label: 'Profile', icon: 'account-edit-outline', iconComp: Icon2, color: '#FBBF24', onPress: goToUserProfile },
    { label: 'Add item', icon: 'pluscircleo', iconComp: Icon3, color: '#34D399', onPress: goToAddList },
    { label: 'My Bag', icon: 'bag-personal-outline', iconComp: Icon2, color: '#60A5FA', onPress: goToMyBag },
    { label: 'Settings', icon: 'settings-outline', iconComp: Icon, color: '#F472B6', onPress: goToSettings },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/TSeMarketLogo.jpg')} style={styles.img} />
        <Text style={styles.tagline}>Second-hand finds for TIPians.</Text>
      </View>

      <View style={styles.grid}>
        {dashboardItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconCard}
            onPress={item.onPress}
            activeOpacity={0.85}
          >
            <View style={[styles.iconBadge, { backgroundColor: item.color + '20' }]}>
              <item.iconComp name={item.icon} size={26} color={item.color} />
            </View>
            <Text style={styles.iconLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.85}
      >
        <Icon name="log-out" size={20} color="#FCA5A5" />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default function Home() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Add Item Listing"
        component={AddList}
        options={{
          headerTitle: 'Add an item listing',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
          headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
          headerTintColor: '#111111',
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: 'Search for items',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
          headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
          headerTintColor: '#111111',
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: 'User profile',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
          headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
          headerTintColor: '#111111',
        }}
      />
      <Stack.Screen
        name="MyBag"
        component={MyBag}
        options={{
          headerTitle: 'My bag',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
          headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
          headerTintColor: '#111111',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: '#111111' },
          headerStyle: { backgroundColor: '#F59E0B', borderBottomWidth: 0 },
          headerTintColor: '#111111',
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 24,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 15,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  iconCard: {
    width: 96,
    alignItems: 'center',
  },
  iconBadge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  iconLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111111',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingVertical: 14,
    minHeight: 52,
    width: '100%',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCA5A5',
    marginLeft: 8,
  },
});
