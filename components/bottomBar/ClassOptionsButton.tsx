import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { ClassOptionsScreen } from "../../screens/ClassOptionsScreen";
import { CreatePostScreen } from "../../screens/CreatePostScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { useQuery } from "urql";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../../constants";
import { colors, fontFamily, fontSize, radius } from "../../constants/dogeStyle";

const Filter = `
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
const appliedFilters = `
query queryClasses ($instructor: String, $equipment: String, $type: String, $first: Int) {
  classes(instructor: $instructor, equipment: $equipment, type: $type, first: $first) {
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

interface CreatePostModalProps {
  onRequestClose: () => void;
}

export const ClassOptionsButton: React.FC<CreatePostModalProps>= ({
  onRequestClose,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [result] = useQuery({
    query: Filter,
  });
  const { data, fetching, error } = result;

  const classDatas = data?.classTypes?.map(
    (item: { id: any; name: any; })=>(
      {id: item.id, label:item.name, checked:false}
    ));
  const equipments = data?.equipment?.map(
    (item: { id: any; name: any; })=>(
      {id: item.id, label:item.name, checked:false}
    ));
  const instructors = data?.instructors?.map(
    (item: { id: any; displayName: any; })=>(
      {id: item.id, label:item.displayName, checked:false}
    ));
  const [checkFilter, setCheckFilter] = useState(classDatas);
  const [filterEquipment, setFilterEquipment] = useState(equipments);
  const [filterInstructors, setFilterInstructors] = useState(instructors);

  const onChecked = (index: number) => {
    let dummydata1 = checkFilter;
    dummydata1[index].checked = !dummydata1[index].checked;
    setCheckFilter(dummydata1);
  }

  const onEquipmentChecked = (index: number) => {
    let dummydata = filterEquipment;
    dummydata[index].checked = !dummydata[index].checked;
    setFilterEquipment(dummydata);
  }

  const onInstructorChecked = (index: number) => {
    let dummydata = filterInstructors;
    dummydata[index].checked = !dummydata[index].checked;
    setFilterInstructors(dummydata);
  }

  const instructor = 'Manta Z';
  const equipment = 'Box';
  const type = 'Cycle';
  const first = 2;
  const [result1] = useQuery({
    query: appliedFilters,
    variables: { instructor, equipment, type, first },
  });

  const onApplyFilters = () => {
    const { data, fetching, error } = result1;
    console.log('filtered Data',data);
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
