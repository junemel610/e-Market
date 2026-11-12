import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import theme from '../src/theme';

const MyBag = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'T-Square Ruler',
      price: 150,
      image: require('../assets/1.jpg'),
      qty: 1,
      seller: 'Nebula Admin',
    },
    {
      id: 2,
      name: 'Architecture Scale',
      price: 280,
      image: require('../assets/2.jpg'),
      qty: 2,
      seller: 'Nebula Admin',
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal >= 500 ? 0 : 60;
  const total = subtotal + shipping;

  const handleRemoveItem = (itemId) => {
    Alert.alert(
      'Remove item',
      'Do you want to remove this item from your bag?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          onPress: () => {
            setCartItems(cartItems.filter((item) => item.id !== itemId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    Alert.alert('Checkout', 'Proceeding to checkout with ' + cartItems.length + ' item(s).');
  };

  const handleQtyChange = (itemId, delta) => {
    setCartItems(cartItems.map((item) => {
      if (item.id !== itemId) return item;
      const newQty = Math.max(1, item.qty + delta);
      return { ...item, qty: newQty };
    }));
  };

  const renderItem = ({ item }) => {
    const lineTotal = item.price * item.qty;
    return (
      <View style={styles.itemCard}>
        <View style={styles.itemImageContainer}>
          <Image source={item.image} style={styles.itemImage} />
        </View>
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSeller}>{item.seller}</Text>
          <View style={styles.itemRow}>
            <Pressable style={styles.qtyButton} onPress={() => handleQtyChange(item.id, -1)} activeOpacity={0.85}>
              <MaterialCommunityIcons name="minus" size={18} color={theme.colors.textLight} />
            </Pressable>
            <Text style={styles.qtyValue}>{item.qty}</Text>
            <Pressable style={styles.qtyButton} onPress={() => handleQtyChange(item.id, 1)} activeOpacity={0.85}>
              <MaterialCommunityIcons name="plus" size={18} color={theme.colors.primary} />
            </Pressable>
          </View>
        </View>
        <View style={styles.itemActions}>
          <Text style={styles.itemLineTotal}>₱{lineTotal.toFixed(2)}</Text>
          <Pressable onPress={() => handleRemoveItem(item.id)} activeOpacity={0.85}>
            <MaterialCommunityIcons name="delete-outline" size={20} color={theme.colors.danger} />
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.pageHeadingBand}>
          <Text accessibilityRole="header" style={styles.title}>My Bag</Text>
          <Text style={styles.subtitle}>{cartItems.length} item(s) in your bag</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="basket" size={64} color={theme.colors.textLight} />
            <Text style={styles.emptyTitle}>Your bag is empty</Text>
            <Text style={styles.emptySubtitle}>Add items to start shopping.</Text>
            <Pressable style={styles.shopButton} activeOpacity={0.85}>
              <Text style={styles.shopButtonText}>Start shopping</Text>
            </Pressable>
          </View>
        ) : (
          <>
            <FlatList
              data={cartItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
            />
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₱{subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>{shipping === 0 ? 'Free' : '₱' + shipping.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total</Text>
                <Text style={styles.summaryTotal}>₱{total.toFixed(2)}</Text>
              </View>
              {shipping > 0 && (
                <Text style={styles.freeShippingHint}>
                  Add ₱{ (500 - subtotal).toFixed(2) } more for free shipping
                </Text>
              )}
              <Pressable style={styles.checkoutButton} onPress={handleCheckout} activeOpacity={0.85}>
                <Text style={styles.checkoutLabel}>Checkout</Text>
              </Pressable>
            </View>
          </>
        )}
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
  itemCard: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, padding: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 12, backgroundColor: theme.colors.surface, marginBottom: theme.spacing.sm },
  itemImageContainer: { width: 90, height: 90, borderRadius: 10, backgroundColor: theme.colors.surfaceMuted, overflow: 'hidden' },
  itemImage: { width: '100%', height: '100%' },
  itemDetails: { flex: 1, gap: theme.spacing.xs },
  itemName: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.text },
  itemSeller: { fontSize: theme.fontSize.xs, color: theme.colors.textLight },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, marginTop: theme.spacing.xs },
  qtyButton: { width: 30, height: 30, borderRadius: 6, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  qtyValue: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.text, minWidth: 20, textAlign: 'center' },
  itemActions: { gap: theme.spacing.sm },
  itemLineTotal: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold, color: theme.colors.text, minWidth: 70, textAlign: 'right' },
  summaryCard: { padding: theme.spacing.lg, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 14, backgroundColor: theme.colors.surface, marginTop: theme.spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.spacing.sm },
  summaryLabel: { fontSize: theme.fontSize.base, color: theme.colors.textLight },
  summaryValue: { fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.semibold, color: theme.colors.text },
  summaryTotal: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.primary },
  divider: { width: '100%', height: 1, backgroundColor: theme.colors.border, marginVertical: theme.spacing.md },
  freeShippingHint: { fontSize: theme.fontSize.xs, color: theme.colors.primary, fontWeight: theme.fontWeight.semibold, marginBottom: theme.spacing.md },
  checkoutButton: { minHeight: 56, borderRadius: 12, backgroundColor: theme.colors.primary, alignItems: 'center', justifyContent: 'center' },
  checkoutLabel: { color: theme.colors.onPrimary, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold },
  emptyState: { alignItems: 'center', justifyContent: 'center', paddingVertical: theme.spacing['2xl'] },
  emptyTitle: { fontSize: theme.fontSize.lg, fontWeight: theme.fontWeight.bold, color: theme.colors.text, marginTop: theme.spacing.md },
  emptySubtitle: { fontSize: theme.fontSize.sm, color: theme.colors.textLight, textAlign: 'center', marginTop: theme.spacing.xs },
  shopButton: { marginTop: theme.spacing.lg, backgroundColor: theme.colors.primary, borderRadius: 10, paddingHorizontal: theme.spacing.lg, paddingVertical: theme.spacing.md },
  shopButtonText: { color: theme.colors.onPrimary, fontSize: theme.fontSize.base, fontWeight: theme.fontWeight.bold },
});

export default MyBag;
