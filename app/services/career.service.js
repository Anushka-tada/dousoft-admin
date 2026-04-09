import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getCareerServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "career");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post

export const createCareerServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "career" , formdata , {
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

export const deleteCareerServ = async (slug) => {
  try {
    const response = await axios.delete(BASE_URL + `career/delete/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// update

export const updateCareerServ = async (slug , payload) => {
  try {
    const response = await axios.put(BASE_URL + `career/update/${slug}` , payload);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// get by id

export const getSingleCareerServ = async (slug) => {
  try {
    const response = await axios.get(BASE_URL + `career/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// job request

export const getCareerRequestsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "career/request");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};