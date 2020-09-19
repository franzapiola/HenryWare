//acciones para el login/logout/¿registro?

export const LOAD_USER_DATA = 'LOAD_USER_DATA';

export const loadUserData = (userData) => {
    return {
        type: LOAD_USER_DATA,
        payload: userData
    }
}