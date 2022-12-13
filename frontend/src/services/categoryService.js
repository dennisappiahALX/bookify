import http from './httpService'
import config from '../config.json'

const apiEndpoint =config.apiUrl + '/categories'

export function getCategory() {
   return http.get(apiEndpoint);
  }