import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getContactRequestServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "contact");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// delete contact

export const deleteContactRequestServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + `contact/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// get

export const getmeetingServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "meeting");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// delete meeting

export const deleteMeetingRequestServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + `meeting/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
