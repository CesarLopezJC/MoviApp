import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ProtecterScreen } from "../screens/ProtecterScreen";
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

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
          <Stack.Screen name="ProtecterScreen" component={ProtecterScreen} />
        )
      }
      
      
      
    </Stack.Navigator>
  );
}