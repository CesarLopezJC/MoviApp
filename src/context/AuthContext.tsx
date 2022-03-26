import React, { Children, createContext, useReducer } from "react";
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import peliApi from '../api/peliApi';

type AuthContextProps ={
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authentivated';
    singUp: () => void;
    singIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;

}

const authIniciarlState: AuthState ={
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider=({children}: any)=>{
    const [state, dispatch] = useReducer(authReducer, authIniciarlState);

    const singIn = async({correo, password}: LoginData) => {
        // console.log({correo, password});
        try {
            const {data}= await peliApi.post<LoginResponse>('/auth/login',{correo, password});
            // console.log(data);
            dispatch({
                type:'signUp',
                payload:{
                    token:data.token,
                    user:data.usuario,
                }
            })
        } catch (error) {
            console.log(error.response.data);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Information incorrecta'
            });
        }
    };
    const singUp = () => {};
    const logOut = () => {};
    const removeError = async() => {
        dispatch({
            type: 'removeError'
        });
    };

    return(
        <AuthContext.Provider value={{
            ...state,
            singUp,
            singIn,
            logOut,
            removeError,
        }}>
            {children}
    
        </AuthContext.Provider>
    )
}

