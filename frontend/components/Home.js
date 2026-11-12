import React, { useEffect } from 'react';
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

  const categories = [
    { label: 'Electronics', icon: 'cellphone', color: '#6366F1' },
    { label: 'Fashion', icon: 'shirt', color: '#EC4899' },
    { label: 'Books', icon: 'book-open', color: '#10B981' },
    { label: 'Home', icon: 'home', color: AMBER },
    { label: 'Sports', icon: 'basketball', color: '#EF4444' },
    { label: 'Auto', icon: 'car', color: '#14B8A6' },
  ];

  const flashDeals = [
    { id: 1, name: 'T-Square Ruler', price: 150, image: require('../assets/1.jpg'), discount: '-40%' },
    { id: 2, name: 'Architecture Scale', price: 280, image: require('../assets/2.jpg'), discount: '-25%' },
    { id: 3, name: 'Drawing Pencil Set', price: 120, image: require('../assets/4.jpg'), discount: '-15%' },
    { id: 4, name: 'Sketchbook A4', price: 180, image: require('../assets/5.jpg'), discount: '-30%' },
  ];

  const featuredItems = [
    { id: 5, name: 'Laptop Stand', price: 450, image: require('../assets/6.jpg'), rating: 4.5 },
    { id: 6, name: 'Desk Organizer', price: 320, image: require('../assets/1.jpg'), rating: 4.8 },
    { id: 7, name: 'Mouse Pad', price: 90, image: require('../assets/2.jpg'), rating: 4.2 },
  ];

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.placeholder} />
            <TextInput
              placeholder="Search items, brands, stores"
              placeholderTextColor={theme.colors.placeholder}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
            <Pressable style={styles.searchButton}>
              <MaterialCommunityIcons name="send" size={20} color={theme.colors.onPrimary} />
            </Pressable>
          </View>
          <Pressable style={styles.cartButton} onPress={goToMyBag} activeOpacity={0.85}>
            <MaterialCommunityIcons name="cart" size={24} color={BLACK} />
            <Text style={styles.cartCount}>0</Text>
          </Pressable>
        </View>

        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Flash Sale</Text>
            <Text style={styles.promoSubtitle}>Up to 50% off on school essentials</Text>
            <Pressable style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Shop now</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <Text style={styles.sectionSeeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContainer}>
          {categories.map((cat, index) => (
            <Pressable
              key={index}
              style={[styles.categoryChip, cat.color === AMBER && styles.categoryChipActive]}
              onPress={() => navigation.navigate('Search')}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons name={cat.icon} size={20} color={cat.color} />
              <Text style={[styles.categoryLabel, cat.color === AMBER && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Flash Deals</Text>
          <Text style={styles.sectionSeeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContainer}>
          {flashDeals.map((deal, index) => (
            <Pressable key={index} style={styles.dealCard} onPress={() => {}} activeOpacity={0.85}>
              <View style={styles.dealImageContainer}>
                <Image source={deal.image} style={styles.dealImage} />
                <Text style={styles.dealDiscount}>{deal.discount}</Text>
              </View>
              <Text style={styles.dealName}>{deal.name}</Text>
              <Text style={styles.dealPrice}>₱{deal.price.toFixed(2)}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <Text style={styles.sectionSeeAll}>See all</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsContainer}>
          {featuredItems.map((item, index) => (
            <Pressable key={index} style={styles.featuredCard} onPress={() => {}} activeOpacity={0.85}>
              <Image source={item.image} style={styles.featuredImage} />
              <Text style={styles.featuredName}>{item.name}</Text>
              <View style={styles.featuredFooter}>
                <Text style={styles.featuredPrice}>₱{item.price.toFixed(2)}</Text>
                <View style={styles.ratingRow}>
                  <MaterialCommunityIcons name="star" size={14} color={AMBER} />
                  <Text style={styles.featuredRating}>{item.rating}</Text>
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
  searchButton: {
    backgroundColor: AMBER,
    borderRadius: 8,
    padding: theme.spacing.sm,
    marginLeft: theme.spacing.xs,
  },
  cartButton: { position: 'relative' },
  cartCount: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: AMBER,
    color: theme.colors.onPrimary,
    fontSize: 10,
    fontWeight: theme.fontWeight.bold,
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
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoContent: { flex: 1 },
  promoTitle: { fontSize: 18, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary, marginBottom: theme.spacing.xs },
  promoSubtitle: { fontSize: theme.fontSize.sm, color: 'rgba(17,17,17,0.85)', marginBottom: theme.spacing.sm },
  promoButton: { backgroundColor: theme.colors.onPrimary, borderRadius: 8, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs },
  promoButtonText: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: theme.colors.primary },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.md, paddingHorizontal: 0 },
  sectionTitle: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: BLACK },
  sectionSeeAll: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold, color: AMBER },
  categoriesContainer: { paddingHorizontal: 0, gap: theme.spacing.sm },
  categoryChip: { backgroundColor: theme.colors.surfaceMuted, borderRadius: 10, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.sm, alignItems: 'center', minWidth: 80 },
  categoryChipActive: { backgroundColor: AMBER },
  categoryLabel: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, color: BLACK, marginTop: theme.spacing.xs },
  categoryLabelActive: { color: theme.colors.onPrimary },
  dealsContainer: { paddingHorizontal: 0, gap: theme.spacing.sm },
  dealCard: { width: 140, backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, alignItems: 'center', paddingBottom: theme.spacing.sm },
  dealImageContainer: { width: '100%', height: 120, borderTopLeftRadius: 12, borderTopRightRadius: 12, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' },
  dealImage: { width: '100%', height: '100%' },
  dealDiscount: { position: 'absolute', top: theme.spacing.xs, left: theme.spacing.xs, backgroundColor: theme.colors.danger, color: theme.colors.onPrimary, fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, paddingHorizontal: 4, paddingVertical: 2, borderRadius: 4 },
  dealName: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: BLACK, marginTop: theme.spacing.sm, paddingHorizontal: theme.spacing.xs, textAlign: 'center' },
  dealPrice: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: AMBER, marginTop: theme.spacing.xs },
  featuredCard: { width: 120, marginRight: theme.spacing.sm, alignItems: 'center' },
  featuredImage: { width: 100, height: 100, borderRadius: 12, backgroundColor: theme.colors.surfaceMuted, marginBottom: theme.spacing.sm },
  featuredName: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: BLACK, marginBottom: theme.spacing.xs, width: 100, textAlign: 'center' },
  featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 100 },
  featuredPrice: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: AMBER },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  featuredRating: { fontSize: theme.fontSize.xs, color: theme.colors.textLight, marginLeft: theme.spacing.xs },
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
});
