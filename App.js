import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./screens/HomeScreen";
import AddContactScreen from "./screens/AddContactScreen";

import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/reducers";
import React, { useState } from "react";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add"
              component={AddContactScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
