import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000/api";

axios.defaults.withCredentials = true; // Global setting for credentials

// Signup API
export const signup = (formData) => {
  return axios.post(`${API_BASE_URL}/auth/signup`, formData, {
    withCredentials: true,
  });
};

// Add user details API
export const addUserDetails = (userDetails) => {
  return axios.post(`${API_BASE_URL}/auth/user-details`, userDetails, {
    withCredentials: true, // REQUIRED: Ensures cookies are sent
  });
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials,
      {
        withCredentials: true, // Send cookies for session
      }
    );
    console.log(response.data); // Debug response
    return response.data; // Return response data
  } catch (error) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message; // Handle errors
  }
};
