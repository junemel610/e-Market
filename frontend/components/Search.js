import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import theme from '../src/theme';

const BLACK = theme.colors.text;

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);

  const data = [
    { id: 1, name: 'T-Square Ruler', author: 'Nebula Admin', img: require('../assets/1.jpg'), description: 'T-Square from TIPC 3rd Year Architecture.', price: '₱150' },
    { id: 2, name: 'Architecture Scale', author: 'Nebula Admin', img: require('../assets/2.jpg'), description: 'Triangular scale ruler.', price: '₱280' },
    { id: 3, name: 'Drawing Pencil Set', author: 'Nebula Admin', img: require('../assets/4.jpg'), description: 'Complete drawing pencil set.', price: '₱120' },
    { id: 4, name: 'Sketchbook A4', author: 'Nebula Admin', img: require('../assets/5.jpg'), description: 'A4 sketchbook for design students.', price: '₱180' },
  ];

  const filterItem = (text) => {
    const normalizedQuery = text.trim().toLowerCase();
    setQuery(text);
    const filtered = normalizedQuery
      ? dataBackup.filter((item) => item.name.toLowerCase().includes(normalizedQuery))
      : dataBackup;
    setDataSource(filtered);
  };

  const handleAddToBag = (item) => {
    Alert.alert('Add to bag', `Add ${item.name} to My Bag?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Add', onPress: () => navigation.navigate('MyBag') },
    ]);
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <FlatList
        data={dataSource}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={(
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>
              {query ? 'No items match your search.' : 'No items available yet.'}
            </Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.listingCard}>
            <Image source={item.img} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => handleAddToBag(item)} activeOpacity={0.85}>
                <MaterialCommunityIcons name="cart-plus" size={18} color={theme.colors.primary} />
                <Text style={styles.addText}>Add to bag</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.placeholder} />
            <TextInput
              placeholder="Search items, brands, stores"
              placeholderTextColor={theme.colors.placeholder}
              value={query}
              onChangeText={filterItem}
              style={styles.searchInput}
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
            />
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  listContent: { padding: theme.spacing.lg },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: 10,
    marginBottom: theme.spacing.md,
    height: 44,
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    color: BLACK,
    fontSize: theme.fontSize.sm,
    marginLeft: theme.spacing.xs,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  image: { width: 90, height: 90, borderRadius: 10, backgroundColor: theme.colors.surfaceMuted },
  details: { flex: 1, marginLeft: theme.spacing.md, gap: theme.spacing.xs },
  title: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: BLACK },
  price: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.primary },
  author: { fontSize: theme.fontSize.xs, color: theme.colors.textLight },
  description: { fontSize: theme.fontSize.xs, color: theme.colors.textLight, marginTop: theme.spacing.xs },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs, marginTop: theme.spacing.xs },
  addText: { color: theme.colors.primary, fontSize: theme.fontSize.sm, fontWeight: theme.fontWeight.bold },
  separator: { height: 1, backgroundColor: theme.colors.border },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing['2xl'],
  },
  emptyTitle: { fontSize: theme.fontSize.base, color: theme.colors.textLight, textAlign: 'center' },
});

export default Search;
