import axios from "axios";
import { BASE_URL } from "../utils/api_base_url_configration";

// get

export const getBlogsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "blogs");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post

export const createBlogServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "blogs" , formdata , {
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

export const deleteBlogServ = async (id) => {
  try {
    const response = await axios.delete(BASE_URL + `blog/delete/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// update

export const UpdateBlogServ = async (id , payload) => {
  try {
    const response = await axios.put(BASE_URL + `blog/update/${id}` , payload);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// get by id

export const getSingleBlogServ = async (id) => {
  try {
    const response = await axios.get(BASE_URL + `blogs/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
