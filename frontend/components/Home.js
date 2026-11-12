import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Search from './Search';
import UserProfile from './UserProfile';
import MyBag from './MyBag';
import Settings from './Settings';
import AddList from './AddList';

const AMBER = '#F59E0B';
const BLACK = '#111111';
const GRAY = '#BEBEBE';
const WHITE = '#FFFFFF';
const CARD = '#F3F4F6';
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

  const categories = [
    { label: 'Electronics', icon: 'smartphone', color: '#6366F1' },
    { label: 'Fashion', icon: 'tshirt-crew', color: '#EC4899' },
    { label: 'Books', icon: 'book-open', color: '#10B981' },
    { label: 'Home', icon: 'home', color: '#F59E0B' },
    { label: 'Sports', icon: 'basketball', color: '#EF4444' },
    { label: 'Auto', icon: 'car', color: '#14B8A6' },
  ];

  const flashDeals = [
    { id: 1, name: 'T-Square Ruler', price: '₱150', image: require('../assets/1.jpg'), discount: '-40%' },
    { id: 2, name: 'Architecture Scale', price: '₱280', image: require('../assets/2.jpg'), discount: '-25%' },
    { id: 3, name: 'Drawing Pencil Set', price: '₱120', image: require('../assets/4.jpg'), discount: '-15%' },
    { id: 4, name: 'Sketchbook A4', price: '₱180', image: require('../assets/5.jpg'), discount: '-30%' },
  ];

  const featuredItems = [
    { id: 5, name: 'Laptop Stand', price: '₱450', image: require('../assets/6.jpg'), rating: 4.5 },
    { id: 6, name: 'Desk Organizer', price: '₱320', image: require('../assets/1.jpg'), rating: 4.8 },
    { id: 7, name: 'Mouse Pad', price: '₱90', image: require('../assets/2.jpg'), rating: 4.2 },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={MUTED} />
          <TextInput
            placeholder="Search items, brands, stores"
            placeholderTextColor={MUTED}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Icon name="send" size={20} color={WHITE} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton} onPress={goToMyBag} activeOpacity={0.85}>
          <Icon name="bag" size={24} color={BLACK} />
          <Text style={styles.cartCount}>0</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.promoBanner}>
        <View style={styles.promoContent}>
          <Text style={styles.promoTitle}>Flash Sale</Text>
          <Text style={styles.promoSubtitle}>Up to 50% off on school essentials</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={styles.promoButtonText}>Shop now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.sectionSeeAll}>See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryChip, cat.color === '#F59E0B' && styles.categoryChipActive]}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.85}
          >
            <Icon2 name={cat.icon} size={20} color={cat.color} />
            <Text style={[styles.categoryLabel, cat.color === '#F59E0B' && styles.categoryLabelActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Flash Deals</Text>
        <Text style={styles.sectionSeeAll}>See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContainer}>
        {flashDeals.map((deal, index) => (
          <TouchableOpacity key={index} style={styles.dealCard} onPress={() => {}} activeOpacity={0.85}>
            <View style={styles.dealImageContainer}>
              <Image source={deal.image} style={styles.dealImage} />
              <Text style={styles.dealDiscount}>{deal.discount}</Text>
            </View>
            <Text style={styles.dealName}>{deal.name}</Text>
            <Text style={styles.dealPrice}>{deal.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <Text style={styles.sectionSeeAll}>See all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContainer}>
        {featuredItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.featuredCard} onPress={() => {}} activeOpacity={0.85}>
            <Image source={item.image} style={styles.featuredImage} />
            <Text style={styles.featuredName}>{item.name}</Text>
            <View style={styles.featuredFooter}>
              <Text style={styles.featuredPrice}>{item.price}</Text>
              <View style={styles.ratingRow}>
                <Icon name="star" size={14} color={AMBER} />
                <Text style={styles.featuredRating}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={goToSearch} activeOpacity={0.85}>
          <Icon2 name="magnify" size={24} color={AMBER} />
          <Text style={[styles.navLabel, { color: AMBER }]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={goToUserProfile} activeOpacity={0.85}>
          <Icon2 name="account" size={24} color={GRAY} />
          <Text style={[styles.navLabel, { color: GRAY }]}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={goToAddList} activeOpacity={0.85}>
          <View style={styles.navFab}>
            <Icon3 name="plus" size={24} color={WHITE} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={goToMyBag} activeOpacity={0.85}>
          <Icon name="bag" size={24} color={GRAY} />
          <Text style={[styles.navLabel, { color: GRAY }]}>Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={goToSettings} activeOpacity={0.85}>
          <Icon name="settings" size={24} color={GRAY} />
          <Text style={[styles.navLabel, { color: GRAY }]}>Settings</Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    flexGrow: 1,
    backgroundColor: WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 10,
    flex: 1,
    marginRight: 12,
    height: 44,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: BLACK,
    fontSize: 14,
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: AMBER,
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
  cartButton: {
    position: 'relative',
  },
  cartCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: AMBER,
    color: WHITE,
    fontSize: 10,
    fontWeight: '800',
    width: 16,
    height: 16,
    borderRadius: 8,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoBanner: {
    backgroundColor: AMBER,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoContent: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: WHITE,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
  },
  promoButton: {
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: BLACK,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: BLACK,
  },
  sectionSeeAll: {
    fontSize: 14,
    fontWeight: '600',
    color: AMBER,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryChip: {
    backgroundColor: CARD,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 80,
  },
  categoryChipActive: {
    backgroundColor: AMBER,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: BLACK,
    marginTop: 6,
  },
  categoryLabelActive: {
    color: WHITE,
  },
  dealsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  dealCard: {
    width: 140,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: GRAY,
    borderRadius: 12,
    alignItems: 'center',
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dealImageContainer: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: CARD,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  dealImage: {
    width: '100%',
    height: '100%',
  },
  dealDiscount: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#DC2626',
    color: WHITE,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  dealName: {
    fontSize: 13,
    fontWeight: '700',
    color: BLACK,
    marginTop: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  dealPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: AMBER,
    marginTop: 4,
  },
  featuredCard: {
    width: 120,
    marginRight: 8,
    alignItems: 'center',
  },
  featuredImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: CARD,
    marginBottom: 8,
  },
  featuredName: {
    fontSize: 13,
    fontWeight: '700',
    color: BLACK,
    marginBottom: 6,
    width: 100,
    textAlign: 'center',
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: AMBER,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredRating: {
    fontSize: 12,
    color: MUTED,
    marginLeft: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: GRAY,
    paddingVertical: 10,
    paddingBottom: 30,
  },
  navItem: {
    alignItems: 'center',
  },
  navFab: {
    backgroundColor: AMBER,
    borderRadius: 24,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  navLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
});
