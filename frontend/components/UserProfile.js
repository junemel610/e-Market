import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import theme from '../src/theme';

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
    } catch (error) {
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
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator color={theme.colors.primary} style={styles.spinner} />
        <Text style={styles.loadingText}>Loading your profile…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.pageHeadingBand}>
          <Text accessibilityRole="header" style={styles.title}>My profile</Text>
          <Text style={styles.subtitle}>Your TSe-Market account</Text>
        </View>

        <View style={styles.accountCard}>
          <Image source={user.profileImage || defaultProfileImage} style={styles.avatar} />
          <View style={styles.accountDetails}>
            <Text style={styles.accountLabel}>Signed in as</Text>
            <Text style={styles.username}>{user.username}</Text>
          </View>
          <Pressable
            onPress={() => setEditing(true)}
            style={styles.editButton}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="pencil" size={18} color={theme.colors.primary} />
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.infoCard}>
          <MaterialCommunityIcons name="information-outline" size={20} color={theme.colors.primary} />
          <Text style={styles.infoText}>Your profile details and saved items.</Text>
        </View>

        <Pressable
          disabled={savingProfile}
          onPress={handleSaveProfile}
          accessibilityRole="button"
          style={({ pressed }) => [styles.saveButton, savingProfile && styles.disabled, pressed && styles.pressed]}
        >
          {savingProfile
            ? <ActivityIndicator size="small" color={theme.colors.onPrimary} />
            : <MaterialCommunityIcons name="content-save" size={18} color={theme.colors.onPrimary} />}
          <Text style={styles.saveLabel}>{savingProfile ? 'Saving…' : 'Save changes'}</Text>
        </Pressable>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { width: '100%', maxWidth: theme.layout.maxContentWidth, alignSelf: 'center', padding: theme.spacing.lg, gap: theme.spacing.md },
  pageHeadingBand: { marginHorizontal: -theme.spacing.lg, marginTop: -theme.spacing.lg, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md, backgroundColor: theme.colors.primary },
  title: { color: theme.colors.onPrimary, fontSize: theme.fontSize['2xl'], fontWeight: theme.fontWeight.bold },
  subtitle: { color: theme.colors.onPrimary, opacity: 0.82, fontSize: theme.fontSize.base, marginTop: theme.spacing.xs },
  accountCard: { minHeight: 104, flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, marginTop: theme.spacing.sm, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, backgroundColor: theme.colors.surface },
  avatar: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: 28, backgroundColor: theme.colors.primarySoft },
  accountDetails: { flex: 1, gap: theme.spacing.xs },
  accountLabel: { color: theme.colors.textLight, fontSize: theme.fontSize.sm },
  username: { color: theme.colors.text, fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold },
  editButton: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs },
  editButtonText: { color: theme.colors.primary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.semibold },
  infoCard: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: 12, backgroundColor: theme.colors.primarySoft },
  infoText: { flex: 1, color: theme.colors.primary, fontSize: theme.fontSize.sm, lineHeight: 21 },
  saveButton: { minHeight: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: theme.spacing.sm, paddingHorizontal: theme.spacing.lg, borderRadius: 12, backgroundColor: theme.colors.primary },
  saveLabel: { color: theme.colors.onPrimary, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold },
  disabled: { opacity: 0.6 },
  pressed: { opacity: 0.75 },
  divider: { width: '100%', height: 1, backgroundColor: theme.colors.border, marginVertical: theme.spacing.md },
  subheading: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.text, marginBottom: theme.spacing.sm, width: '100%' },
  categoryBlock: { width: '100%', marginBottom: theme.spacing.md },
  categoryTitle: { fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold, color: theme.colors.primary, marginBottom: theme.spacing.xs },
  itemsList: { gap: theme.spacing.xs },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.sm, backgroundColor: theme.colors.surfaceMuted, borderRadius: 8 },
  itemName: { fontSize: theme.fontSize.sm, color: theme.colors.text },
  loadingContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { fontSize: theme.fontSize.base, color: theme.colors.textLight, marginTop: theme.spacing.sm, textAlign: 'center' },
  spinner: { marginBottom: theme.spacing.sm },
});

export default UserProfile;
