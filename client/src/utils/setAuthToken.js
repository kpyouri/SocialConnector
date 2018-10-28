import axios from 'axios';

const setAuthToken = token => {
    if (token){
        //Apply to every request as part of header
        axios.defaults.headers.common['Authorization'] = token;
    } else{
        //Delete the auth header when logging out
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;