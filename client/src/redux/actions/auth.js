//acciones para el login/registrer

export const LOGIN = 'LOGIN';

export const signIn = (userData) => {
    return {
        type: LOGIN,
        payload: userData
    }
}