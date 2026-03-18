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
