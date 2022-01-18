import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { ClassOptionsScreen } from "../../screens/ClassOptionsScreen";
import { CreatePostScreen } from "../../screens/CreatePostScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import {
  colors,
  fontFamily,
  fontSize,
  radius,
} from "../../constants/dogeStyle";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { endpoint } from "../../constants/httpHelper";

const useFilters = () => {
  return useQuery("OptionsQuery", async () => {
    return await request(
      `${endpoint}`,
      gql`
        query OptionsQuery {
          classTypes {
            id
            name
          }
          equipment {
            id
            name
          }
          instructors {
            id
            displayName
            user {
              username
              picture {
                url
              }
              id
            }
          }
        }
      `
    );
  });
};

const useAppliedFilters = () => {
  return useQuery("queryClasses", async () => {
    return await request(
      `${endpoint}`,
      gql`
        query queryClasses(
          $instructor: String
          $equipment: String
          $type: String
          $first: Int
        ) {
          classes(
            instructor: $instructor
            equipment: $equipment
            type: $type
            first: $first
          ) {
            edges {
              class: node {
                id
                title
                cover {
                  url
                }
                duration
                instructors {
                  id
                  displayName
                  user {
                    username
                  }
                }
              }
            }
          }
        }
      `
    );
  });
};

const onApplyFilters = () => {
  // const { status, data, error, isFetching } = useAppliedFilters()
  // console.log('filtered Data',data);
};

interface CreatePostModalProps {
  onRequestClose: () => void;
  checkFilter: any;
  setCheckFilter: any;
  filterInstructors: any;
  setFilterInstructors: any;
}

export const ClassOptionsButton: React.FC<CreatePostModalProps> = ({
  onRequestClose,
  checkFilter,
  setCheckFilter,
  filterInstructors,
  setFilterInstructors,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { status, data, error, isFetching } = useFilters();

  const [filterEquipment, setFilterEquipment] = useState();
  const [isRefresh, setIsRefresh] = useState(false);
  useEffect(() => {
    if (status === "success" && data) {
      // setIsRefresh(!isRefresh)
      const classDatas =
        data &&
        data?.classTypes?.map((item: { id: any; name: any }) => ({
          id: item.id,
          label: item.name,
          checked: false,
        }));
      const equipments = data?.equipment?.map(
        (item: { id: any; name: any }) => ({
          id: item.id,
          label: item.name,
          checked: false,
        })
      );
      const instructors = data?.instructors?.map(
        (item: { id: any; displayName: any }) => ({
          id: item.id,
          label: item.displayName,
          checked: false,
        })
      );
      setCheckFilter(classDatas);
      setFilterEquipment(equipments);
      setFilterInstructors(instructors);
    }
  }, [status, data]);

  const onChecked = (index: number) => {
    let dummydata1 = checkFilter;
    dummydata1[index].checked = !dummydata1[index].checked;
    setCheckFilter(dummydata1);
  };

  const onEquipmentChecked = (index: number) => {
    let dummydata = filterEquipment;
    dummydata[index].checked = !dummydata[index].checked;
    setFilterEquipment(dummydata);
  };

  const onInstructorChecked = (index: number) => {
    let dummydata = filterInstructors;
    dummydata[index].checked = !dummydata[index].checked;
    setFilterInstructors(dummydata);
  };

  // console.log(checkFilter);

  const instructor = "Manta Z";
  const equipment = "Box";
  const type = "Cycle";
  const first = 2;

  if (status === "loading") {
    return (
      <View style={styles.containerLoad}>
        <Text style={styles.titleText}>Loading...</Text>
      </View>
    );
  }
  if (status === "error") {
    return (
      <View style={styles.containerLoad}>
        <Text style={styles.titleText}>
          Unable to load options {error.message}
        </Text>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name={"ios-options"} size={29} color={"white"} />
      </TouchableOpacity>
      <Modal
        backdropOpacity={0.8}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.contentView}
      >
        <View style={[styles.container, { paddingBottom: 20, paddingTop: 20 }]}>
          <View style={styles.topContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => onRequestClose()}
            >
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={onApplyFilters}
            >
              <Text style={styles.backButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
          <ScrollView keyboardShouldPersistTaps="handled">
            <ClassOptionsScreen
              onRequestClose={() => setModalVisible(false)}
              checkFilter={checkFilter}
              onChecked={onChecked}
              title={"Class Types"}
            />
            <ClassOptionsScreen
              onRequestClose={() => setModalVisible(false)}
              checkFilter={filterEquipment}
              onChecked={onEquipmentChecked}
              title={"Equipment"}
            />
            <ClassOptionsScreen
              onRequestClose={() => setModalVisible(false)}
              checkFilter={filterInstructors}
              onChecked={onInstructorChecked}
              title={"Instructors"}
            />
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: colors.primary800,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: fontSize.h3,
    color: colors.text,
    padding: 5,
  },
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
  container: {
    marginTop: SCREEN_HEIGHT / 2 - 100,
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.primary800,
    borderRadius: 20,
    borderColor: colors.primary800,
  },
  topContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  applyButton: {
    paddingLeft: 20,
  },
  backButtonText: {
    color: colors.text,
    // fontFamily: fontFamily.regular,
    fontSize: fontSize.paragraph,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
