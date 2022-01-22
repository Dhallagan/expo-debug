import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { CheckBox } from "react-native-elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fontFamily, fontSize, radius } from "../constants/appStyle";

interface ClassOptionsModalProps {
  onRequestClose: () => void;
  checkFilter: any;
  onChecked: number;
  title: string;
}
export const ClassOptionsScreen: React.FC<ClassOptionsModalProps> = ({
  onRequestClose,
  checkFilter,
  onChecked,
  title,
}) => {
  const inset = useSafeAreaInsets();
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    // console.log(isRefresh);
  }, [isRefresh]);

  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
      <View>
        <View style={{ display: "flex", width: "100%" }}>
          {checkFilter &&
            checkFilter.map((item, index) => (
              <View style={{ flex: 0, flexDirection: "row" }} key={index}>
                <Text
                  style={{
                    flex: 1,
                    color: "white",
                    fontSize: fontSize.paragraph,
                    alignSelf: "center",
                  }}
                >
                  {item.label}
                </Text>
                <CheckBox
                  style={styles.checkbox}
                  checked={item.checked}
                  checkedColor="white"
                  uncheckedColor="white"
                  onPress={() => {
                    onChecked(index);
                    setIsRefresh(!isRefresh);
                  }}
                />
              </View>
            ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleText: {
    // fontFamily: fontFamily.extraBold,
    fontSize: fontSize.h4,
    color: colors.text,
    fontWeight: "bold",
  },
  roomNameEditText: {
    height: 40,
    backgroundColor: colors.primary600,
    paddingHorizontal: 16,
    borderRadius: radius.m,
    marginTop: 16,
    color: colors.text,
  },
  cancelButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.m,
    height: 38,
  },
  cancelButtonText: {
    color: colors.text,
    // fontFamily: fontFamily.regular,
    fontSize: fontSize.paragraph,
    fontWeight: "700",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  backButton: {
    justifyContent: "center",
    borderRadius: radius.m,
    height: 38,
  },
  checkbox: {
    alignSelf: "center",
  },
});
