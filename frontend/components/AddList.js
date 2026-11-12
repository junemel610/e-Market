import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import theme from '../src/theme';

const AMBER = theme.colors.primary;
const BLACK = theme.colors.text;

const AddList = ({ navigation }) => {
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [isPickingImage, setIsPickingImage] = useState(false);

  const pickImage = async () => {
    if (isPickingImage) return;
    setIsPickingImage(true);
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Photo access needed', 'Allow photo access to choose an item image.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });

      if (!result.canceled && !result.cancelled) {
        const uri = result.assets?.[0]?.uri || result.uri;
        if (uri) setImage(uri);
      }
    } catch (error) {
      console.error('Error picking image', error);
      Alert.alert('Image not selected', 'Could not open the photo library. Try again.');
    } finally {
      setIsPickingImage(false);
    }
  };

  const handleAddList = () => {
    try {
      if (!itemName || !description || !price || !quantity) {
        Alert.alert('All fields required', 'Please fill in every field before publishing.');
        return;
      }

      Alert.alert('Item ready', 'Your listing details are saved. Publishing listings is not connected yet.');
    } catch (error) {
      Alert.alert('Failed on Adding Item', error.message);
      console.error('Failed on Adding Item:', error);
    }
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>Add your item</Text>
            <Text style={styles.subheader}>TSe-Marketplace listing</Text>
          </View>

          <View style={styles.imageContainer}>
            {image && (
              <View style={styles.borderContainer}>
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  onLoad={() => console.log('Image loaded successfully')}
                  onError={(error) => console.error('Error loading image', error.nativeEvent.error)}
                />
              </View>
            )}
            {!image && (
              <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="image-outline" size={48} color={theme.colors.textLight} />
                <Text style={styles.placeholderText}>No image selected</Text>
              </View>
            )}
          </View>
          <Text style={styles.label}>Pick an image from your gallery for your item.</Text>
          <TouchableOpacity style={styles.createButton} onPress={pickImage} disabled={isPickingImage} activeOpacity={0.85}>
            <MaterialCommunityIcons name="image-plus" size={18} color={theme.colors.onPrimary} />
            <Text style={styles.createButtonText}>{isPickingImage ? 'Opening photos…' : 'Choose image'}</Text>
          </TouchableOpacity>

          <Text style={styles.text1}>Enter your item details below:</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Item name"
              placeholder="e.g. T-Square Ruler"
              onChangeText={(text) => setItemName(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Item description"
              placeholder="Describe your item…"
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price (₱)</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Price"
              keyboardType="decimal-pad"
              placeholder="0.00"
              onChangeText={(text) => setPrice(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Item Quantity</Text>
            <TextInput
              style={styles.input}
              accessibilityLabel="Item quantity"
              keyboardType="number-pad"
              placeholder="1"
              onChangeText={(text) => setQuantity(text)}
            />
          </View>
          <TouchableOpacity style={[styles.createButton, styles.primaryButton]} onPress={handleAddList} activeOpacity={0.85}>
            <Text style={styles.createButtonText}>Publish listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollView: { flexGrow: 1, padding: theme.spacing.lg },
  card: { backgroundColor: theme.colors.surface, borderRadius: 16, padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border },
  headerRow: { gap: theme.spacing.xs, marginBottom: theme.spacing.md },
  header: { fontSize: theme.fontSize['2xl'], fontWeight: theme.fontWeight.bold, color: BLACK },
  subheader: { fontSize: theme.fontSize.sm, color: theme.colors.textLight },
  imageContainer: { alignItems: 'center', marginBottom: theme.spacing.md },
  image: { width: 160, height: 160, borderRadius: 12, backgroundColor: theme.colors.surfaceMuted },
  imagePlaceholder: { width: 160, height: 160, borderRadius: 12, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { marginTop: theme.spacing.sm, color: theme.colors.textLight },
  borderContainer: { borderWidth: 2, borderColor: AMBER, borderRadius: 12, overflow: 'hidden' },
  label: { fontSize: theme.fontSize.xs, fontWeight: theme.fontWeight.bold, color: theme.colors.primary, marginBottom: theme.spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  text1: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, marginBottom: theme.spacing.md },
  inputContainer: { width: '100%', marginBottom: theme.spacing.md },
  input: { fontSize: theme.fontSize.base, color: BLACK, backgroundColor: theme.colors.surfaceMuted, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 10, paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.md, minHeight: 52 },
  createButton: { borderRadius: 10, paddingVertical: theme.spacing.md, minHeight: 52, alignItems: 'center', justifyContent: 'center', marginTop: theme.spacing.sm },
  primaryButton: { backgroundColor: AMBER },
  createButtonText: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.onPrimary },
});

export default AddList;
