import React, { useState, useEffect } from "react";
import { Text, Image, View, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from "../constants/dogeStyle";
import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import * as FileSystem from "expo-file-system";
import { useTokenStore } from "../store/useTokenStore";

const UPLOAD_URL_MUTATION = gql`
  mutation UploadMutation($fileName: String!, $contentType: String) {
    uploadURL: getUploadURL(fileName: $fileName, contentType: $contentType)
  }
`;

type PickerProps = {
  onPress: void;
};

export default function ImagePickerExample() {
  let { token } = useTokenStore();
  const [image, setImage] = useState<string>();
  const [imageUrl, setImageUrl] = useState<string>();

  const { mutateAsync: getUploadURL } = useMutation((input: Any) => {
    return request(
      "https://test.thatclass.co/api/",
      UPLOAD_URL_MUTATION,
      input,
      {
        Authorization: "Bearer " + token,
      }
    )
      .then((res) => {
        return res;
      })
      .catch((errors) => {
        return errors;
      });
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let localImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!localImage.cancelled) {
      setImage(localImage.uri);

      let input = {
        fileName: localImage.uri!.split("/").pop(),
        // Wonky..... localImage only provides "image" as type
        contentType: "image/jpg",
      };

      console.log("contentType", "image/jpg");

      const { uploadURL } = await getUploadURL(input);

      try {
        const uploadResult = await FileSystem.uploadAsync(
          uploadURL,
          localImage.uri,
          {
            httpMethod: "PUT",
            headers: {
              "Content-Type": "image/jpg",
            },
          }
        );
        setImageUrl(
          uploadURL.includes("?")
            ? uploadURL?.substring(0, uploadURL.indexOf("?"))
            : uploadURL
        );
        // console.log("upload result", uploadResult);
      } catch (err) {
        console.log("upload error", err);
      }
    }

    // Execute the URL  using expo filesystem upload async

    // handle
  };

  const imagePicker = React.useMemo(
    () => (
      <>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderColor: colors.primary500,
            borderWidth: 2,
            padding: 5,
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={pickImage}
          >
            <Icon
              size={28}
              name="ios-image-outline"
              color={"white"}
              style={{ flex: 0 }}
            />
            <Text style={{ color: "white", marginLeft: 10, fontSize: 18 }}>
              Photo/Video
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </>
    ),
    [pickImage]
  );

  return [imagePicker, image, imageUrl];
}
