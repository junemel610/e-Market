import React, { createContext, useContext, useMemo, useState } from 'react';

const BagContext = createContext(null);
const initialItems = [
  { id: '1', name: 'T-Square Ruler', price: 150, image: require('../assets/1.jpg'), qty: 1, seller: 'Nebula Admin' },
  { id: '2', name: 'Architecture Scale', price: 280, image: require('../assets/2.jpg'), qty: 2, seller: 'Nebula Admin' },
];

export function BagProvider({ children }) {
  const [items, setItems] = useState(initialItems);
  const value = useMemo(() => ({
    items,
    addItem(item) {
      setItems((current) => {
        const id = String(item.id);
        const existing = current.find((entry) => String(entry.id) === id);
        return existing
          ? current.map((entry) => String(entry.id) === id ? { ...entry, qty: entry.qty + 1 } : entry)
          : [...current, { ...item, id, qty: 1, seller: item.seller || item.author || 'TSe-Market seller', image: item.image || item.img }];
      });
    },
    removeItem(id) { setItems((current) => current.filter((item) => String(item.id) !== String(id))); },
    changeQuantity(id, delta) {
      setItems((current) => current.map((item) => String(item.id) === String(id) ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
    },
  }), [items]);
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const bag = useContext(BagContext);
  if (!bag) throw new Error('useBag must be used within BagProvider');
  return bag;
}
