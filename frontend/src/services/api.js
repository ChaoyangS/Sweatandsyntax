import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

// Signup API
export const signup = (formData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, formData);
};

export const addUserDetails = (userDetails) => {
  return axios.post(`${API_BASE_URL}/auth/add-user-details`, userDetails);
};

// Login API
export const login = (credentials) => {
  return axios.post(`${API_BASE_URL}/auth/login`, credentials);
};
