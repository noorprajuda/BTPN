import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from "react-native-safe-area-context";

import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
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
  Modal,
} from "react-native";
import {
  fetchContacts,
  fetchContact,
  deleteContact,
  updateContact,
} from "../store/action";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const contactsRedux = useSelector((state) => state.contacts.data);
  const loading = useSelector((state) => state.contacts.loading);

  const [contacts, setContacts] = useState(contactsRedux);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchContacts());
    setContacts(contactsRedux);
  }, []);

  useEffect(() => {
    dispatch(fetchContacts());
    setContacts(contactsRedux);
  }, [contactsRedux]);

  const [editContact, setEditContact] = useState({});
  const [id, setId] = useState();

  const deleteContactHandler = (id) => {
    console.log(id, "<<<id");
    dispatch(deleteContact(id));
    fetchContacts();
  };

  const navigation = useNavigation();

  const toAddContactScreen = () => {
    navigation.navigate("Add");
  };

  const toEditContactScreen = (id) => {
    navigation
      .navigate("Edit", id)
      .then((_) => {
        dispatch(fetchContact(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    photo: "",
  });

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

  const edit = (contact) => {
    setIsModalVisible(true);
    setContactForm({ ...contactForm, firstName: contact.firstName });
    setContactForm({ ...contactForm, lastName: contact.lastName });
    setContactForm({ ...contactForm, age: contact.age });
    setContactForm({ ...contactForm, photo: contact.photo });
    setId(contact.id);
  };

  const updateHandler = () => {
    dispatch(updateContact(id, contactForm))
      .then((_) => {
        setIsModalVisible(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!contacts)
    return (
      <>
        <SafeAreaProvider>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: 50,
              }}
            >
              My Contacts
            </Text>
          </View>
          <View style={styles.container}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "normal",
                marginBottom: 20,
              }}
            >
              Loading...
              {contacts}
            </Text>
          </View>
        </SafeAreaProvider>
      </>
    );

  if (loading) {
    return (
      <>
        <ActivityIndicator
          style={style.ActivityIndicator}
          size={"large"}
          color={"black"}
        ></ActivityIndicator>
      </>
    );
  }
  return (
    <>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Modal
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <SafeAreaProvider>
              <View style={styles.header}>
                <Icon
                  name="arrow-back"
                  size={28}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <View style={styles.container}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 20,
                    marginTop: 50,
                  }}
                >
                  Edit Contact
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
                  defaultValue={contactForm.firstName}
                  editable={true}
                  onChangeText={(text) => handleChangeFirstName(text)}
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
                  defaultValue={contactForm.lastName}
                  editable={true}
                  onChangeText={(text) => handleChangeLastName(text)}
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
                  defaultValue={contactForm.age}
                  editable={true}
                  onChangeText={(text) => handleChangeAge(text)}
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
                  defaultValue={contactForm.photo}
                  editable={true}
                  onChangeText={(text) => handleChangePhoto(text)}
                />
                <View style={{ backgroundColor: "black" }}>
                  <Button
                    color={"white"}
                    style={{ color: "white" }}
                    title="Submit"
                    onPress={() => updateHandler()}
                  />
                </View>
              </View>
            </SafeAreaProvider>
          </Modal>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
              marginTop: 50,
            }}
          >
            My Contacts
          </Text>
          {contacts.map((contact) => {
            const { id } = contact;
            return (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                  key={id}
                >
                  <View
                    style={{
                      flexDirection: "row",

                      padding: 10,
                    }}
                  >
                    <TouchableHighlight
                      style={[
                        styles.profileImgContainer,
                        { borderColor: "green", borderWidth: 1 },
                      ]}
                    >
                      <Image
                        source={{ uri: contact.photo }}
                        style={styles.profileImg}
                      />
                    </TouchableHighlight>
                    <View key={id} style={{ flexDirection: "column" }}>
                      <TouchableOpacity key={id}>
                        <Text style={styles.name}>
                          {contact.firstName} {contact.lastName}{" "}
                        </Text>
                      </TouchableOpacity>
                      <View>
                        <Text style={styles.age}>{contact.age} years old</Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",

                      padding: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        edit(contact);
                      }}
                    >
                      <MaterialIcons
                        name="edit"
                        size={40}
                        style={{ marginLeft: 0 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        deleteContactHandler(contact.id);
                      }}
                    >
                      <MaterialIcons
                        name="delete"
                        size={40}
                        style={{ marginRight: 0, paddingRight: 0 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          })}
          <TouchableOpacity
            onPress={() => {
              toAddContactScreen();
            }}
          >
            <MaterialIcons
              style={styles.add}
              name="add-circle"
              size={80}
              color={"green"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  scrollView: {
    marginHorizontal: 10,
    width: "95%",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 15,
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    width: "100%",
    marginLeft: 10,
    marginTop: 3,
  },
  arrow: {
    marginLeft: 15,
    marginTop: 6,
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignContent: "flex-end",
    alignSelf: "flex-end",
  },
  phoneContainer: {
    marginLeft: 15,
    width: "100%",
  },
  age: {
    fontSize: 14,
    fontWeight: "normal",
    width: "92%",
    marginTop: 2,
    marginLeft: 10,
  },
  profileImgContainer: {
    marginLeft: 4,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default HomeScreen;
