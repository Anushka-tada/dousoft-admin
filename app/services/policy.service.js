import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getPolicyServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "privacy-policy");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post

export const createpolicyServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "privacy-policy" , formdata , {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// delete

export const deletePolicyServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + `privacy-policy/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// update

export const updatePolicyServ = async (id , payload) => {
  try {
    const response = await axios.put(BASE_URL + `privacy-policy/update/${id}` , payload);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// get by id

export const getSinglePolicyServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + `privacy-policy/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
