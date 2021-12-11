import React from "react";
import { View, YellowBox } from "react-native";
import { Avatar } from "react-native-elements";
import ProgressCircle from "react-native-progress-circle";
import { colors } from "../constants/dogeStyle";

export default function ProgressAvatar(props) {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
        }}
      >
        <ProgressCircle
          percent={30}
          radius={15}
          borderWidth={2}
          color="#3399FF"
          shadowColor="#999"
          bgColor={colors.primary700}
        >
          <Avatar
            rounded
            source={{
              uri: "https://yt3.ggpht.com/ytc/AKedOLQYeqpWlkVt-0iV4WLvKWVzUrE6X-SfpckBhbwF=s900-c-k-c0x00ffffff-no-rj",
            }}
            size={props.size || 20}
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
