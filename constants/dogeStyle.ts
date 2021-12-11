import { TextStyle } from "react-native";

export const radius = {
  s: 5,
  m: 8,
  l: 16,
};

export const fontFamily = {
  black: "Inter-Black",
  bold: "Inter-Bold",
  extraBold: "Inter-ExtraBold",
  extraLight: "Inter-ExtraLight",
  light: "Inter-Light",
  medium: "Inter-Medium",
  regular: "Inter-Regular",
  semiBold: "Inter-SemiBold",
  thin: "Inter-Thin",
};

export const fontSize = {
  h1: 56,
  h2: 40,
  h3: 28,
  h4: 20,
  paragraph: 14,
  small: 12,
  xs: 10,
};

export const colors = {
  text: "#fff",
  primary100: "#dee3ea",
  primary200: "#b2bdcd",
  primary300: "#e0e0e0",
  primary600: "#343536",
  primary700: "#18191a",
  primary800: "#0b0c0c",
  primary900: "#121212",
  secondary: "#5575e7",
  secondaryWashedOut: "#879eed",
  accent: "#fd4d4d",
  accentHover: "#fd6868",
  accentDisabled: "#f5bfbf",
  black: "#000",
};

const textBase: TextStyle = {
  fontFamily: fontFamily.regular,
  color: colors.text,
};

export const h1: TextStyle = {
  ...textBase,
  lineHeight: 90,
  fontSize: fontSize.h1,
  fontWeight: "700",
};

export const h2: TextStyle = {
  ...textBase,
  lineHeight: 64,
  fontSize: fontSize.h2,
  fontWeight: "700",
};

export const h3: TextStyle = {
  ...textBase,
  lineHeight: 45,
  fontSize: fontSize.h3,
  fontWeight: "700",
};

export const h4: TextStyle = {
  ...textBase,
  lineHeight: 32,
  fontSize: fontSize.h4,
  fontWeight: "700",
};

export const paragraph: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.paragraph,
  lineHeight: 22,
};

export const paragraphBold: TextStyle = {
  ...paragraph,
  fontWeight: "700",
};

export const small: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.small,
  lineHeight: 22,
};

export const smallBold: TextStyle = {
  ...small,
  fontWeight: "700",
};

export const xsmall: TextStyle = {
  ...textBase,
  fontWeight: "500",
  fontSize: fontSize.xs,
  lineHeight: 16,
};

export const xsmallBold: TextStyle = {
  ...xsmall,
  fontWeight: "700",
};
