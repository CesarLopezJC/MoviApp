import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request, openSettings } from 'react-native-permissions';




export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}


export const PermissionsContext = createContext({} as PermissionsContextProps ); 



export const PermissionsProvider = ({ children }: any ) => {

    const [permissions, setPermissions] = useState( permissionInitState );

    useEffect(() => {

        checkLocationPermission();
        
        AppState.addEventListener('change', state => {
            
            if( state !== 'active' ) return;

            checkLocationPermission();
        });

    }, [])


    const askLocationPermission = async() => {

        let permissionStatus: PermissionStatus;

        permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        
        permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        console.log(permissionStatus);
        if ( permissionStatus === 'blocked' ) {
            openSettings();
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });

    }

    const checkLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
        permissionStatus='unavailable';
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        .then(result => {
            permissionStatus=result;  // would be "granted"
        })
        .catch(error => {
            permissionStatus='unavailable';
        });
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }


    

    return(
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLocationPermission,
        }}>
            { children }
        </PermissionsContext.Provider>
    )

}



