import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        //로그인 유저
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        //회원가입 유저
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/');
    } catch (error) {
      console.log(error.message);
    }
};