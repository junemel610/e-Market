import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      } else {
        // Cancelling the picker leaves the current draft unchanged.
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
        alert('All fields are required');
        console.error('All fields are required');
        return;
      }

      console.log('Request Data:', {
        itemName,
        description,
        price,
        quantity,
        image,
      });

      // Perform your API call or data storage here
      alert('Your item details are ready. Publishing listings is not connected yet.');

    } catch (error) {
      alert('Failed on Adding Item: ' + error);
      console.error('Failed on Adding Item:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Add your Item to TSe-Market</Text>
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
        </View>
        <Text style={styles.label}>
          Pick an image from your gallery for the picture of your item.
        </Text>
        <TouchableOpacity
          style={styles.createButton}
          onPress={pickImage}
          disabled={isPickingImage}
        >
          <Text style={styles.createButtonText}>{isPickingImage ? 'Opening photos…' : 'Choose Image'}</Text>
        </TouchableOpacity>
        <Text style={styles.text1}>Enter your item details below:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Item name"
            onChangeText={(text) => setItemName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Item description"
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Price</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Price"
            keyboardType="decimal-pad"
            onChangeText={(text) => setPrice(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Item Quantity</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Item quantity"
            keyboardType="number-pad"
            onChangeText={(text) => setQuantity(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleAddList}
        >
          <Text style={styles.createButtonText}>Add Item</Text>
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
    marginTop: 30,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden', // Clip child components to the image container
    marginBottom: 10,
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    borderColor: '#EFD02C',
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
  },
});

export default AddList;
