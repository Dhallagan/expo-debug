import request, { gql } from "graphql-request";
import React, { useState } from "react";
import {
  Text,
  KeyboardAvoidingView,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useMutation } from "react-query";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants";
import { colors, fontFamily, fontSize, radius } from "../constants/dogeStyle";
import { ErrorMessage, Formik } from "formik";
import { useTokenStore } from "../store/useTokenStore";
import { useCreatePostMutation } from "../_generated";
import QueryClient from "../core/QueryClient";
import { useNavigation } from "@react-navigation/native";
import ImagePicker from "../components/ImagePicker";
import ImagePickerExample from "../components/ImagePicker";
import * as FileSystem from "expo-file-system";

interface CreatePostModalProps {
  onRequestClose: () => void;
}
type UpsertPostInput = {
  id?: string | null | undefined;
  team?: string | null | undefined;
  title?: string | null | undefined;
  content: string;
  media?: string | null | undefined;
};

const UPSERT_POST = gql`
  mutation CreatePostCardMutation($input: UpsertPostInput!) {
    upsertPost(input: $input) {
      postEdge {
        node {
          id
        }
      }
    }
  }
`;

const UPLOAD_URL_MUTATION = gql`
  mutation UploadMutation($fileName: String!, $contentType: String) {
    uploadURL: getUploadURL(fileName: $fileName, contentType: $contentType)
  }
`;

export const CreatePostScreen: React.FC<CreatePostModalProps> = ({
  onRequestClose,
}) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();

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
        alert(JSON.stringify(errors));
        return errors;
      });
  });

  const { mutate: UpsertPost } = useMutation(
    (args: Any) => {
      var input = {
        team: "the-late-crew-654",
        content: JSON.stringify([
          {
            type: "paragraph",
            children: [{ text: args.content }],
          },
        ]),
        media: args.media,
      };

      return request(
        "https://test.thatclass.co/api/",
        UPSERT_POST,
        {
          input,
        },
        {
          Authorization: "Bearer " + token,
        }
      );
    },
    {
      onSuccess: (data) => {
        // alert("Success" + JSON.stringify(data));
        onRequestClose();
        navigation.navigate("Social");
      },
      onError: (error) => {
        alert(JSON.stringify(error));
      },
    }
  );

  const post = async (args) => {
    // //upload photo
    // let input = {
    //   fileName: args.media!.split("/").pop(),
    //   contentType: "PostMediaFile",
    // };

    // const { uploadURL } = await getUploadURL(input);

    // const uploadResult = await FileSystem.uploadAsync(uploadURL, args.media);

    UpsertPost({ content: args.content, media: imageUrl });
  };

  const [imageInput, image, imageUrl] = ImagePickerExample();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View
        style={[
          styles.container,
          { paddingBottom: 20 + inset.bottom, paddingTop: 20 + inset.top },
        ]}
      >
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Create Post</Text>
          <Icon
            size={28}
            name="chevron-down"
            color={"white"}
            style={{ flex: 1, alignSelf: "center" }}
          />
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{
              content: "",
              media: "",
            }}
            onSubmit={(values) => {
              values.media = imageUrl ? imageUrl : "";
              post(values);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => onRequestClose()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <View style={{ display: "flex", width: "100%" }}>
                  <TextInput
                    style={[styles.roomNameEditText]}
                    placeholder={"What's on your mind?"}
                    placeholderTextColor={"white"}
                    onChangeText={handleChange("content")}
                    onBlur={handleBlur("content")}
                    value={values.content}
                  />

                  {imageInput}
                  <Text>{image}</Text>
                  <Text>{imageUrl}</Text>
                </View>
                <View>
                  <Text>
                    {values.media && (
                      <Image
                        resizeMode={"cover"}
                        source={{ uri: values.media }}
                        style={{ width: SCREEN_WIDTH }}
                      />
                    )}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.postButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.titleText}>Post</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.primary800,
  },
  topContainer: {
    flex: 0,
    flexDirection: "row",
  },
  postButton: {
    flex: 0,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: radius.m,
    height: 40,
    backgroundColor: colors.primary600,
  },
  titleText: {
    fontSize: fontSize.h2,
    color: colors.text,
    fontWeight: "bold",
    alignSelf: "center",
  },
  roomNameEditText: {
    height: 80,
    paddingHorizontal: 0,
    borderRadius: radius.m,
    marginTop: 5,
    color: colors.text,
    fontSize: fontSize.h3,
    flex: 1,
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
    fontSize: fontSize.h3,
    fontWeight: "700",
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
});
