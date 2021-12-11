import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modal";
import { ClassOptionsScreen } from "../../screens/ClassOptionsScreen";
import { CreatePostScreen } from "../../screens/CreatePostScreen";
import Icon from "react-native-vector-icons/Ionicons";

export const ClassOptionsButton: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity {...props} onPress={() => setModalVisible(true)}>
        <Icon name={"ios-options"} size={29} color={"white"} />
      </TouchableOpacity>
      <Modal
        backdropOpacity={0.8}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.contentView}
      >
        <ClassOptionsScreen onRequestClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
  socialButton: {
    alignItems: "center",
    borderColor: "#343536",
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    paddingVertical: 10,
    width: "47.5%",
    alignSelf: "stretch",
  },
});
