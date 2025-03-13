
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/v1/',
});

export default apiClient;
