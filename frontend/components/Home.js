import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import Search from './Search';
import UserProfile from './UserProfile';
import MyBag from './MyBag';
import Settings from './Settings';
import AddList from './AddList';
import theme from '../src/theme';

const AMBER = theme.colors.primary;
const BLACK = theme.colors.text;

const Stack = createStackNavigator();

const categories = [
  { label: 'For Sale', icon: 'tag', color: '#6366F1' },
  { label: 'Electronics', icon: 'cellphone', color: '#EC4899' },
  { label: 'Fashion', icon: 'shirt', color: '#10B981' },
  { label: 'Books', icon: 'book-open', color: '#F59E0B' },
  { label: 'Home', icon: 'home', color: '#EF4444' },
  { label: 'Services', icon: 'handyman', color: '#14B8A6' },
];

const listings = [
  { id: 1, title: 'T-Square Ruler', price: '₱150', location: 'Sampaloc, Manila', image: require('../assets/1.jpg'), time: '2h ago' },
  { id: 2, title: 'Architecture Scale', price: '₱280', location: 'España, Manila', image: require('../assets/2.jpg'), time: '5h ago' },
  { id: 3, title: 'Drawing Pencil Set', price: '₱120', location: 'Quiapo, Manila', image: require('../assets/4.jpg'), time: '1d ago' },
  { id: 4, title: 'Sketchbook A4', price: '₱180', location: 'Sampaloc, Manila', image: require('../assets/5.jpg'), time: '1d ago' },
  { id: 5, title: 'Laptop Stand', price: '₱450', location: 'P. Gil, Manila', image: require('../assets/6.jpg'), time: '2d ago' },
  { id: 6, title: 'Desk Organizer', price: '₱320', location: 'Legarda, Manila', image: require('../assets/1.jpg'), time: '2d ago' },
];

function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
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

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.placeholder} />
            <TextInput
              placeholder="Search TSe-Marketplace"
              placeholderTextColor={theme.colors.placeholder}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
          <Pressable style={styles.sellButton} onPress={goToAddList} activeOpacity={0.85}>
            <MaterialCommunityIcons name="plus" size={20} color={theme.colors.onPrimary} />
            <Text style={styles.sellText}>Sell something</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <Pressable
              key={index}
              style={[styles.categoryPill, index === 0 && styles.categoryPillActive]}
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name={cat.icon} size={18} color={cat.color === AMBER ? theme.colors.onPrimary : cat.color} />
              <Text style={[styles.categoryLabel, index === 0 && styles.categoryLabelActive]}>{cat.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Marketplace listings</Text>
        </View>
        <ScrollView contentContainerStyle={styles.listingsContainer} showsVerticalScrollIndicator={false}>
          {listings.map((listing, index) => (
            <Pressable key={index} style={styles.listingCard} onPress={() => {}} activeOpacity={0.85}>
              <Image source={listing.image} style={styles.listingImage} />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle}>{listing.title}</Text>
                <View style={styles.listingMeta}>
                  <Text style={styles.listingPrice}>{listing.price}</Text>
                  <Text style={styles.listingLocation}>{listing.location} · {listing.time}</Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Pressable style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.85}>
          <MaterialCommunityIcons name="logout" size={20} color={theme.colors.danger} />
          <Text style={[styles.logoutText, { color: theme.colors.danger }]}>Log out</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable style={styles.navItem} onPress={goToSearch} activeOpacity={0.85}>
          <MaterialCommunityIcons name="magnify" size={24} color={AMBER} />
          <Text style={[styles.navLabel, { color: AMBER }]}>Search</Text>
        </Pressable>
        <Pressable style={styles.navItem()} onPress={goToUserProfile} activeOpacity={0.85}>
          <MaterialCommunityIcons name="account" size={24} color={theme.colors.textLight} />
          <Text style={[styles.navLabel, { color: theme.colors.textLight }]}>Profile</Text>
        </Pressable>
        <Pressable style={styles.navFab} onPress={goToAddList} activeOpacity={0.85}>
          <MaterialCommunityIcons name="plus" size={24} color={theme.colors.onPrimary} />
        </Pressable>
        <Pressable style={styles.navItem()} onPress={goToMyBag} activeOpacity={0.85}>
          <MaterialCommunityIcons name="cart" size={24} color={theme.colors.textLight} />
          <Text style={[styles.navLabel, { color: theme.colors.textLight }]}>Bag</Text>
        </Pressable>
        <Pressable style={styles.navItem()} onPress={goToSettings} activeOpacity={0.85}>
          <MaterialCommunityIcons name="settings" size={24} color={theme.colors.textLight} />
          <Text style={[styles.navLabel, { color: theme.colors.textLight }]}>Settings</Text>
        </Pressable>
      </View>
    </SafeAreaView>
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
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: BLACK },
          headerStyle: { backgroundColor: AMBER, borderBottomWidth: 0 },
          headerTintColor: BLACK,
        }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: 'Search for items',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: BLACK },
          headerStyle: { backgroundColor: AMBER, borderBottomWidth: 0 },
          headerTintColor: BLACK,
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerTitle: 'User profile',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: BLACK },
          headerStyle: { backgroundColor: AMBER, borderBottomWidth: 0 },
          headerTintColor: BLACK,
        }}
      />
      <Stack.Screen
        name="MyBag"
        component={MyBag}
        options={{
          headerTitle: 'My bag',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: BLACK },
          headerStyle: { backgroundColor: AMBER, borderBottomWidth: 0 },
          headerTintColor: BLACK,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: '700', color: BLACK },
          headerStyle: { backgroundColor: AMBER, borderBottomWidth: 0 },
          headerTintColor: BLACK,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { flexGrow: 1, padding: theme.spacing.lg },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 10,
    flex: 1,
    marginRight: theme.spacing.sm,
    height: 44,
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    color: BLACK,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
  sellButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
  },
  sellText: { color: theme.colors.onPrimary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold },
  sectionHeader: { marginTop: theme.spacing.md, marginBottom: theme.spacing.sm },
  sectionTitle: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: BLACK },
  categoriesContainer: { paddingHorizontal: 0, gap: theme.spacing.sm },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    minHeight: 36,
  },
  categoryPillActive: {
    backgroundColor: AMBER,
    borderColor: AMBER,
  },
  categoryLabel: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: BLACK },
  categoryLabelActive: { color: theme.colors.onPrimary },
  listingsContainer: { paddingHorizontal: 0, gap: theme.spacing.md },
  listingCard: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, overflow: 'hidden', marginBottom: theme.spacing.sm },
  listingImage: { width: '100%', height: 160 },
  listingInfo: { padding: theme.spacing.md, gap: theme.spacing.xs },
  listingTitle: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: BLACK },
  listingMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing.xs },
  listingPrice: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.primary },
  listingLocation: { fontSize: theme.fontSize.xs, color: theme.colors.textLight },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: theme.spacing.md,
    minHeight: 52,
    width: '100%',
    marginTop: theme.spacing.md,
  },
  logoutText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, marginLeft: theme.spacing.sm },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: { alignItems: 'center', paddingVertical: theme.spacing.xs },
  navFab: { alignItems: 'center', paddingVertical: theme.spacing.xs },
  navLabel: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, marginTop: theme.spacing.xs },
});
