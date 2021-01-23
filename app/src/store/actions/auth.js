import Config from '../../config/api';
import {AsyncStorage} from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

export const signup = (user) => {
  return async (dispatch) => {
    const response = await fetch(
        `${Config.apiurl}/users/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      if (errorResData.code === Config.codes.repEmail) {
        throw new Error('Já temos uma conta cadastrada para esse email');
      }

      throw new Error('Algo sinistro ocorreu nos nossos servidores');
    }

    const resData = await response.json();

    return resData;
  };
};

export const authenticate = (token, user) => {
  return (dispatch) => {
    dispatch({type: AUTHENTICATE, user: user, token: token});
  };
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

export const signin = (user) => {
  return async (dispatch) => {
    const response = await fetch(
        `${Config.apiurl}/auth/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();

      throw new Error(errorResData.code);
    }

    const resData = await response.json();

    dispatch({type: AUTHENTICATE, user: resData.user, token: resData.jwt});

    saveDataToStorage(resData.jwt, resData.user);

    return resData;
  };
};

export const forgotPass = (email) => {
  return async (dispatch) => {
    const response = await fetch(
        `${Config.apiurl}/users/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email}),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();

      if (errorResData.code === Config.codes.wrongCredentials) {
        throw new Error('Email não encontrado');
      }

      throw new Error('Algo sinistro ocorreu nos nossos servidores');
    }

    const resData = await response.json();

    return resData;
  };
};

export const checkCode = (email, code) => {
  return async (dispatch) => {
    const response = await fetch(
        `${Config.apiurl}/users/check-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, code: code}),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();

      if (errorResData.code === Config.codes.wrongCredentials) {
        throw new Error('Código inválido');
      }

      throw new Error('Algo sinistro ocorreu nos nossos servidores');
    }

    const resData = await response.json();

    return resData;
  };
};

export const redefinePass = (email, code, newPass) => {
  return async (dispatch) => {
    const response = await fetch(
        `${Config.apiurl}/users/redefine-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: email, code: code, newPass: newPass}),
        },
    );

    if (!response.ok) {
      const errorResData = await response.json();

      if (errorResData.code === Config.codes.wrongCredentials) {
        throw new Error('Código inválido');
      }

      throw new Error('Algo sinistro ocorreu nos nossos servidores');
    }

    const resData = await response.json();

    return resData;
  };
};

const saveDataToStorage = (token, user) => {
  AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        user: user,
      }),
  );
};
