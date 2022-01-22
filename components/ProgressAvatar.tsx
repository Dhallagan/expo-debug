import React from "react";
import { View, YellowBox } from "react-native";
import { Avatar } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import { colors } from "../constants/appStyle";

export default function ProgressAvatar(props) {
  const { size, style } = props;
  let ProgressCircleRadius = size;
  let ImageCircleDiameter = size * 2 * 0.85;
  let BorderWidth = size * 0.1;
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          ...style,
        }}
      >
        <ProgressCircle
          percent={30}
          radius={size ? ProgressCircleRadius : 23}
          borderWidth={size ? BorderWidth : 2}
          color="#3399FF"
          shadowColor={colors.primary500}
          bgColor={colors.primary700}
        >
          <Avatar
            rounded
            source={{
              uri: "https://yt3.ggpht.com/ytc/AKedOLQYeqpWlkVt-0iV4WLvKWVzUrE6X-SfpckBhbwF=s900-c-k-c0x00ffffff-no-rj",
            }}
            size={size ? ImageCircleDiameter : 35}
          />
        </ProgressCircle>
      </View>
    </>
  );
}

// import { Avatar } from 'react-native-elements';

// export default function ProgressAvatar() {
//     return (

//     <Avatar
//         rounded
//         source={{
//             uri:
//             'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
//         }}
//     />)
// }
