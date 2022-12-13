import http from './httpService'
import jwtDecode from 'jwt-decode'
import config from '../config.json'

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey ="token"

http.setJwt(getJwt());

export async function login(email, password) {
    const {data:jwt} = await http.post(apiEndpoint, {email, password});
    localStorage.setItem("token", jwt);
}

export async function loginWithJwt(jwt) {
    localStorage.setItem("token", jwt);
}


export function logout() {
    localStorage.removeItem("token");
  
}

export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem("token");
        return jwtDecode(jwt);
      } catch (ex) {
        return null;
      }
}

export default {
    login, 
    loginWithJwt,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    logout,
    getCurrentUser,
    getJwt
}
