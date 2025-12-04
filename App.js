import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InitialPage from "./screens/InitialPage";
import LoginForm from "./screens/LoginForm";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";
import RFIDScanner from "./screens/RFIDScanner";
import Live StockDetailsForm from "./screens/Live StockDetailsForm";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Initial" component={InitialPage} />
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="RFIDScanner" component={RFIDScanner} />
        <Stack.Screen name="Live StockDetailsForm" component={Live StockDetailsForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
