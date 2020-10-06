import Config from '../../config/api';
import { AsyncStorage } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const signup = (user) => {
    return async dispatch => {
        const response = await fetch(
            `${Config.apiurl}/users/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            if(errorResData.code === Config.codes.repEmail){
                throw new Error('Já temos uma conta cadastrada para esse email');
            }
            
            throw new Error('Algo sinistro ocorreu nos nossos servidores');
        }

        const resData = await response.json();
        
        return resData;
    }
}

export const signin = (user) => {
    return async dispatch => {

        const response = await fetch(
            `${Config.apiurl}/auth/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(user)
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            
            if(errorResData.code === Config.codes.wrongCredentials){
                throw new Error('Email ou senha inválidos irmão');
            }
            
            throw new Error('Algo sinistro ocorreu nos nossos servidores');
        }

        const resData = await response.json();

        dispatch({ type: AUTHENTICATE, user: resData.user, token: resData.jwt});
        
        saveDataToStorage(resData.jwt, resData.user);

        return resData;
    }
}

const saveDataToStorage = (token, user) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            user: user
        })
    );
};