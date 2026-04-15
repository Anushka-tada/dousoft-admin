import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getHomePageServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "home");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// post

export const createHomePageServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "home" , formdata , {
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


// service category


