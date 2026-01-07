import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// login

export const loginServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "admin/login" , formdata);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
