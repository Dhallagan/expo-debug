import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Contacts from "expo-contacts";
import { colors } from "../constants/dogeStyle";
import { TitledHeader } from "../components/TitledHeader";
import JsonText from "../components/JsonText";
import { Chip } from "../components/Chip";
import { Loading } from "../components/Loading";
import { Button } from "../components/Button";
import { SearchInput } from "../components/SearchInput";

export default function App() {
  const [contacts, setContacts] = React.useState([]);
  const [search, setSearch] = useState("");

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
    return <Loading />;
  }

  let filteredContacts = [];
  if (contacts) {
    filteredContacts = contacts.filter((x) => {
      // alert(JSON.stringify(searchVal));
      return JSON.stringify(x)
        .toLowerCase()
        .includes(search.toString().toLowerCase() || "");
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <TitledHeader title={"Invite Friends"} showBackButton={true} />
      <SearchInput value={search} onChange={setSearch} placeholder={"Search"} />

      <ScrollView style={{ flex: 1, backgroundColor: colors.primary700 }}>
        {/* <JsonText obj={contacts} /> */}
        {contacts.length > 0 &&
          filteredContacts.slice(0, 20).map((contact, idx) => {
            return (
              <>
                <View style={styles.contactRow}>
                  <JsonText obj={contact} />
                  <Text style={{ color: "white", flex: 1 }}>
                    {contact.lastName}, {contact.firstName}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      flex: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    {contact.phoneNumbers
                      ? contact.phoneNumbers[0].digits
                      : " "}
                  </Text>

                  <Button
                    title={"+ Invite"}
                    onPress={() => {
                      let msg = `Hi ${contact.firstName}! I'm inviting you to join me on ThatClass so we workout together virtual and keep each other accountable. Here is the link:`;
                      WriteSMS(contact.phoneNumbers[0].digits, msg);
                    }}
                  >
                    + Invite
                  </Button>
                </View>
              </>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

function WriteSMS(phone: string, msg: string) {
  Linking.openURL(`sms:&addresses=${phone}&body=${msg}`);
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
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderBottomWidth: 1,
    borderColor: colors.primary600,
  },
  searchInput: {
    borderColor: colors.primary600,
    // backgroundColor: colors.loginInputBackground,
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    justifyContent: "center",
    //alignItems: 'center',
    marginHorizontal: 5,
    // marginEnd: 20,
    // marginTop: 20,
    padding: 10,
    // marginBottom: 20,
  },
});
