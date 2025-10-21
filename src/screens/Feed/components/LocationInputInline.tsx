import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import type { Place } from "../../../types/place";

export const LocationInputInline = React.forwardRef<TextInput, {
  value?: Place | null;
  icon: React.ReactNode;
  onChange: (p: Place | null) => void;
  onBlur?: () => void;
  placeholder?: string;
}>(({ value, onChange, onBlur, placeholder = 'Search location...', icon }, ref) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  return (
    <View style={styles.inlineLocationContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
              onBlur?.();
            }, 200);
          }}
          style={[styles.inlineLocationInput, { flex: 1, marginLeft: 8 }]}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
    inlineLocationContainer: {
    position: 'relative',
    flex: 1,
  },
  inlineLocationInput: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
})