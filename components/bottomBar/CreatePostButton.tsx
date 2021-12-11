import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { CreatePostScreen } from "../../screens/CreatePostScreen";

export const CreatePostButton: React.FC = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity {...props} onPress={() => setModalVisible(true)} />
      <Modal
        backdropOpacity={0.8}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.contentView}
      >
        <CreatePostScreen onRequestClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  contentView: {
    justifyContent: "flex-end",
    margin: 0,
  },
});
