import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';
import { BlackButton } from '../components/BlackButton';
import {check, PERMISSIONS, PermissionStatus, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        console.log(result);  // would be "granted"
      })
      .catch(error => {
        console.log('error')
      });

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
}
export const location= {
  latitud: 0,
  longitud: 0,
}
export const PermissionsScreen = () => {
    const [statusP, setStatusP] = useState( permissionInitState );
    const [statusL, setStatusL] = useState( location );
    
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        setStatusP({
          locationStatus: result
        });
        console.log(result);  // would be "granted"
      })
      .catch(error => {
        console.log('error')
      });

    // const { permissions, askLocationPermission } = useContext( PermissionsContext );

    const askLocationPermission = async() => {

      let permissionStatus: PermissionStatus;
      
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        setStatusP({
          locationStatus: result
        });
        console.log(result);  // would be "granted"

        if(result==='granted'){
          Geolocation.getCurrentPosition(
            ({ coords }) => {
              setStatusL({
                latitud: coords.latitude,
                longitud:coords.longitude,
              });
            },
        );
        }
      })
      .catch(error => {
        console.log('error')
      });

    }
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>Es necesario el uso del GPS para usar esta aplicación </Text>

            <BlackButton 
                title="Permiso"
                onPress={ askLocationPermission }
                // onPress={ askLocationPermission }
            />



            <Text style={{ marginTop: 20 }}>
                { JSON.stringify( statusP, null, 5 ) }
            </Text>

            <Text style={{ marginTop: 20 }}>
            Latitud { statusL.latitud }
            </Text>
            <Text style={{ marginTop: 20 }}>
            Longitud { statusL.longitud }
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    }
});
