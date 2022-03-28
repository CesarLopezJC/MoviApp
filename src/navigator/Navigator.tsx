import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtecterScreen } from "../screens/ProtecterScreen";
import { AuthContext } from '../context/AuthContext';
import { HomeScreen } from "../screens/HomeScreen";
import { Result } from "../interces/movieInterface";
import { DatailScreen } from "../screens/DatailScreen";

export type RootStackParams={
  LoginScreen: undefined,
  RegisterScreen: undefined,
  HomeScreen: undefined,
  DatailScreen: Result,
}

const Stack = createStackNavigator<RootStackParams>();

export const Navigator=() => {

  const {status} = useContext(AuthContext);



  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        cardStyle: {
          backgroundColor:'white'
        }
      }}
    >
      {
        (status !== 'authenticated')
        ?(
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )
        : (
          <>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DatailScreen" component={DatailScreen} />
          </>
        )
      }
      
      
      
    </Stack.Navigator>
  );
}