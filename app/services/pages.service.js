import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";


// About page services
// get

export const getAboutPageServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "about");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// post

export const createAboutPageServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "about" , formdata , {
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

// Career page services
// get

export const getCareerPageServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "career-page");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// post

export const createCareerPageServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "career-page" , formdata , {
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