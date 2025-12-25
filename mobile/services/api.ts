import axios from 'axios';
import Constants from 'expo-constants';

// Replace with your actual backend URL. 
// For Android Emulator, use 'http://10.0.2.2:8000'
// For iOS Simulator, use 'http://localhost:8000'
// For Physical Device, use your machine's LAN IP e.g. 'http://192.168.1.156:8000/api'
const BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
