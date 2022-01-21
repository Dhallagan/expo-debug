import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/dogeStyle";

export type SearchInputProps = {
  value: string;
  onChange?: () => void;
  placeholder?: string;
  name?: string;
};

export function SearchInput({ value, onChange, placeholder = "" }) {
  return (
    <View style={styles.searchContainer}>
      <Icon
        style={styles.searchIcon}
        name="search"
        color={colors.primary500}
        size={24}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={colors.primary300}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.primary600,
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    marginHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    color: colors.text,
    // marginBottom: 20,
  },
});
