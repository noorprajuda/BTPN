import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchContacts, createContact } from "../store/action";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

AddContactScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const contactsRedux = useSelector((state) => state.contacts.data);
  const loading = useSelector((state) => state.contacts.loading);

  const [contacts, setContacts] = useState(contactsRedux);

  useEffect(() => {
    dispatch(fetchContacts());
    setContacts(contactsRedux);
  }, []);

  const [id, setId] = useState(0);

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const newForm = {
      firstName: contactForm.firstName,
      lastName: contactForm.lastName,
      age: contactForm.age,
      photo: contactForm.photo,
    };

    newForm[name] = value;
    setContactForm(newForm);
  };

  const handleSubmit = () => {
    dispatch(createContact(contactForm))
      .then((resp) => {
        navigation.navigate("Home");
      })
      .then((_) => {
        dispatch(fetchContacts());
      })
      .catch((err) => console.log(err));
  };

  const handleChangeFirstName = (text) => {
    setContactForm({ ...contactForm, firstName: text });
  };
  const handleChangeLastName = (text) => {
    setContactForm({ ...contactForm, lastName: text });
  };
  const handleChangeAge = (text) => {
    setContactForm({ ...contactForm, age: text });
  };
  const handleChangePhoto = (text) => {
    setContactForm({ ...contactForm, photo: text });
  };
  const submitContact = () => {
    setContacts([{ name: contact.name, number: contact.number, id: id }]);
    setId(id + 1);
    console.log(contacts);
    setContact({ name: "", number: "" });
  };

  return (
    <>
      <SafeAreaProvider keyboardShouldPersistTaps="always">
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={28}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.container} keyboardShouldPersistTaps="always">
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
              marginTop: 50,
            }}
          >
            Add Contact
          </Text>

          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 30,
              marginBottom: 20,
              paddingLeft: 5,
            }}
            placeholder="First Name"
            // onChange={handleChange}
            id="firstName"
            name="firstName"
            value={contactForm.firstName}
            onChangeText={(text) => handleChangeFirstName(text)}
            keyboardType="number-pad"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 30,
              marginBottom: 20,
              paddingLeft: 5,
            }}
            placeholder="Last Name"
            // onChange={handleChange}
            id="lastName"
            name="lastName"
            value={contactForm.lastName}
            onChangeText={(text) => handleChangeLastName(text)}
            keyboardType="number-pad"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 30,
              marginBottom: 20,
              paddingLeft: 5,
            }}
            placeholder="Age"
            // onChange={handleChange}
            id="age"
            name="age"
            value={contactForm.age}
            onChangeText={(text) => handleChangeAge(text)}
            keyboardType="number-pad"
          />
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "black",
              height: 30,
              marginBottom: 20,
              paddingLeft: 5,
            }}
            placeholder="Photo URL"
            // onChange={handleChange}
            id="photo"
            name="photo"
            value={contactForm.photo}
            onChangeText={(text) => handleChangePhoto(text)}
            keyboardType="number-pad"
          />
          <View style={{ backgroundColor: "black" }}>
            <Button
              color={"white"}
              style={{ color: "white" }}
              title="Submit"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  add: {
    marginLeft: 290,

    color: "green",
  },
  container: {
    paddingTop: 10,
    padding: 10,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AddContactScreen;
