import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Contacts from "expo-contacts";
import { colors } from "../constants/dogeStyle";
import { TitledHeader } from "../components/TitledHeader";
import JsonText from "../components/JsonText";
import { Chip } from "../components/Chip";

export default function App() {
  const [contacts, setContacts] = React.useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);

  if (contacts.length <= 0) {
    return <JsonText obj={"Loading"}> Loading</JsonText>;
  }
  console.log(contacts);
  return (
    <SafeAreaView style={styles.container}>
      <TitledHeader title={"Invite Friends"} showBackButton={true} />

      <ScrollView style={{ flex: 1, backgroundColor: colors.primary700 }}>
        {/* <JsonText obj={contacts} /> */}
        {contacts.length > 0 &&
          contacts.slice(0, 50).map((contact, idx) => {
            // return <Text style={{ color: "white" }}>{x.firstName}</Text>;
            return (
              <>
                {/* <JsonText obj={JSON.stringify(contact)} /> */}
                <View style={styles.contactRow}>
                  <Text style={{ color: "white", flex: 1 }}>
                    {contact.lastName}, {contact.firstName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      alert(
                        "send invite text to " +
                          contact.firstName +
                          " " +
                          contact.lastName
                      );
                    }}
                  >
                    <Text style={{ color: "white" }}>Invite</Text>
                  </TouchableOpacity>
                </View>
              </>
            );
          })}
        {/* <View style={styles.contactContainer}></View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary900,
    color: colors.text,
  },
  text: {
    color: colors.text,
  },
  contactContainer: {
    backgroundColor: colors.primary900,
  },
  contactRow: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.primary900,
    alignItems: "center",
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: "#AAA",
    borderRadius: 7,
  },
});
