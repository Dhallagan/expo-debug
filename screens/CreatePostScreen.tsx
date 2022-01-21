import request, { gql } from "graphql-request";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";
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
import { useMutation, useQuery } from "react-query";
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
import { endpoint } from "../constants/httpHelper";
import Header from "../components/Header";
import { TitledHeader } from "../components/TitledHeader";
import { useCurrentUserStore } from "../store/useCurrentUserStore";
import { Loading } from "../components/Loading";

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

function useTeamOptions(user) {
  return useQuery("createPostOptions", async () => {
    return request(
      endpoint,
      gql`
        query CreatePostOptions($user: String) {
          teams(user: $user) {
            edges {
              team: node {
                id
                slug
                name
                picture {
                  url
                }
              }
            }
          }
        }
      `,
      { user: user }
    );
  });
}

export const CreatePostScreen: React.FC<CreatePostModalProps> = ({
  onRequestClose,
}) => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  let { token } = useTokenStore();
  let { me } = useCurrentUserStore();
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { mutateAsync: getUploadURL } = useMutation((input: Any) => {
    return request(endpoint, UPLOAD_URL_MUTATION, input, {
      Authorization: "Bearer " + token,
    })
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
        team: args.team,
        content: JSON.stringify([
          {
            type: "paragraph",
            children: [{ text: args.content }],
          },
        ]),
        media: args.media,
      };

      return request(
        endpoint,
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
        onRequestClose();
        navigation.navigate("Social");
      },
      onError: (error) => {
        alert(JSON.stringify(error));
      },
    }
  );

  const post = async (args) => {
    UpsertPost({ team: selectedTeam, content: args.content, media: imageUrl });
  };

  const [imageInput, image, imageUrl] = ImagePickerExample();

  const { status, data, error, isFetching } = useTeamOptions(me.username);

  if (status === "loading") {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.container}>
        <Text>Unable to load teams {error.message}</Text>
      </View>
    );
  }

  let teamOptions = [];
  data.teams.edges.forEach((x) => {
    teamOptions.push({ label: x.team.name, value: x.team.slug });
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <View
        style={[
          styles.container,
          { paddingBottom: 20 + inset.bottom, paddingTop: 20 + inset.top },
        ]}
      >
        <View style={styles.topContainer}>
          <Text style={styles.titleText}>Audience</Text>
          <SelectDropdown
            defaultButtonText={"Select a team"}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            dropdownStyle={styles.dropdownStyle}
            rowTextStyle={styles.rowTextStyle}
            data={teamOptions}
            onSelect={(selectedItem, index) => {
              setSelectedTeam(selectedItem.value);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem.label;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item.label;
            }}
          />
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{
              team: null,
              content: "",
              media: "",
            }}
            onSubmit={(values) => {
              values.media = imageUrl ? imageUrl : "";
              values.team = selectedTeam;
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
                  {image && !imageUrl && (
                    <Text style={{ color: "white" }}>Uploading...</Text>
                  )}
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
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => onRequestClose()}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
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
    maxHeight: 40,
    flexDirection: "row",
    alignItems: "center",
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
  buttonStyle: {
    padding: 5,
    margin: 5,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: colors.primary800,
  },
  buttonTextStyle: {
    color: colors.text,
    fontWeight: "bold",
  },
  dropdownStyle: {
    backgroundColor: colors.primary600,
    borderColor: colors.primary500,
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10,
  },
  rowTextStyle: {
    color: colors.text,
  },
});
