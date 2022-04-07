import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext';
import { PermissionsContext } from '../context/PermissionsContext'


interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation} : Props) => {
  const { permissions } = useContext( PermissionsContext );

  console.log({permissions});
  const {singIn, errorMessage, removeError} = useContext(AuthContext);

  const {email,password,onChange} = useForm({
    email:'',
    password:''
  });

  useEffect(() => {
    if(errorMessage.length===0)return;

    Alert.alert('Login incorrecto', 
              errorMessage,
              [
                {
                  text:'Ok',
                  onPress: removeError,
                }
              ]);
  }, [errorMessage])
  

  const onLogin = () => {
    console.log({email, password});
    Keyboard.dismiss();

    singIn({correo: email, password});
  }

  return (
    <>
        {/* BACKGROUND */}
        <Background/>
        <View style={loginStyles.formContainer}>
              {/* KEYBOARD AVOID VIEW */}
              
              <WhiteLogo/>

              <Text style={loginStyles.title}>Login {permissions}</Text>

              <Text style={loginStyles.label}>Email:</Text>

              <TextInput
                placeholder='Ingrece su email'
                placeholderTextColor="rgba(255,255,255,0.4)"
                keyboardType="email-address"
                underlineColorAndroid="white"
                style={loginStyles.inputField}
                selectionColor="white"

                onChangeText={ (value)=> onChange(value, 'email')}
                value={email}
                onSubmitEditing={onLogin}

                autoCapitalize='none'
                autoCorrect={false}

              />

              <Text style={loginStyles.label}>Contraseña:</Text>

              <TextInput
                placeholder='*******'
                placeholderTextColor="rgba(255,255,255,0.4)"
                underlineColorAndroid="white"
                secureTextEntry
                style={loginStyles.inputField}
                selectionColor="white"

                onChangeText={ (value)=> onChange(value, 'password')}
                value={password}
                onSubmitEditing={onLogin}

                autoCapitalize='none'
                autoCorrect={false}
                
              />

              {/* Boton Login */}
              <View style={loginStyles.btnContainer}>
                    <TouchableOpacity
                    activeOpacity={ 0.8 }
                    style={loginStyles.btnLogin}
                    onPress={onLogin}
                    >
                    <Text style={loginStyles.btnText}>Login</Text>
                    </TouchableOpacity>
              </View>

              {/* Crear una nueva cuenta */}
              <View style={loginStyles.newUserContainer}>
              <TouchableOpacity
                    activeOpacity={ 0.8 }
                    onPress={ () => navigation.navigate('RegisterScreen')}
                    >
                    <Text style={loginStyles.btnText2}>Ubicación</Text>
                    </TouchableOpacity>
              </View>
        </View>
    </>
  )
}
