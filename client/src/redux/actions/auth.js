import axios from 'axios';

//acciones para el login/logout/¿registro?

export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const CHECK_LS_TOKEN = 'CHECK_LS_TOKEN';

export const checkLSToken = () => {
    //Setea isFetching a true
    return {
        type: CHECK_LS_TOKEN
    }
}

export const loadUserData = (userData) => {
    //Setea isFetching a false, y carga datos a state.auth.user
    return {
        type: LOAD_USER_DATA,
        payload: userData
    }
}

export const checkSession = token => {
    return dispatch => {
        //isFetching = true;
        dispatch(checkLSToken());

        //Llamado a /auth/me
        axios.get('http://localhost:3001/auth/me', 
            {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            }
        )
        .then(response => {
            const { user } = response.data
            if (user) {
                //Si devuelve un usuario, cargamos sus datos al store de redux
                const { user_id, first_name, last_name, email, role} = user;
                return dispatch(loadUserData({
                    user_id,
                    first_name,
                    last_name,
                    email,
                    role
                }));
            }
            //El axios a /auth/me no devolvió ningun usuario, por ende no hay usuario logeado
            dispatch(loadUserData({
                role: 'Guest'
                }));
        })
        .catch(err => console.log('ERROR EN LLAMADO A /auth/me:', err));
    }

}