// import React from "react";
// import { StyleSheet, View, Text } from "react-native";
// import tailwind from "tailwind-rn";
// import MaskedView from "@react-native-community/masked-view";
// import LinearGradient from "react-native-linear-gradient";
// import GradientText from "./GradientText";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export type HypeHeaderProps = {
//   // style?: ViewStyle;
//   title: string;
//   children: React.ReactNode;
//   // avatarSrcs: ImageSourcePropType[];
//   onPress?: () => void;
// };
// export default function HypeHeader(props: HypeHeaderProps) {
//   // return (
//   //     <View style={styles.container}>
//   //         <Text style={styles.header}>Explore</Text>
//   //     </View>
//   // )
//   const inset = useSafeAreaInsets();
//   return (
//     <View style={[styles.container, { paddingTop: inset.top }]}>
//       <GradientText>{props.title || props.children}</GradientText>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "relative",
//     zIndex: 0,
//     backgroundColor: "#18191a",
//   },
//   title: {
//     flex: 1,
//   },
// });
