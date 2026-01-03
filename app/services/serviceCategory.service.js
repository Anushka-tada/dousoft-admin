import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getServiceCategoryServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "/service-category");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post

export const createServiceCategoryServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "service-category" , formdata , {
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

export const deleteServiceCategoryServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + `service-category/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//update

export const updateServiceCategoryServ = async (id , payload) => {
  try {
    const response = await axios.put(BASE_URL + `service-category/update/${id}` , payload);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

//get single

export const singleServiceCategoryServ = async (id ) => {
  try {
    const response = await axios.get(BASE_URL + `service-category/${id}` , );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};