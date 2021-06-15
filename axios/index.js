import axios from 'axios';
export const SERVER_URL =
  'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane';
const instance = axios.create({
  baseURL: SERVER_URL,
  // `headers` are custom headers to be sent
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: false, // default
  timeout: 30000, // default is `0` (no timeout) set to 30secs
});
// instance.defaults.baseURL = BACKEND_URL;
export default instance;