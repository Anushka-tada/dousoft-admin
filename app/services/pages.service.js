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


// Portfolio page services
// get

export const getPortfolioPageServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "portfolio");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// post

export const createPortfolioPageServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "portfolio" , formdata , {
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

// Solution page services
// get

export const getAllSolutionsServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "solution");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};



export const getSolutionByIdServ = async (slug) => {
  try {
    const response = await axios.get(BASE_URL + `solution/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const updateSolutionServ = async (slug, solutionData) => {
  try {
    const response = await axios.put(BASE_URL + `solution/${slug}`, solutionData);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const deleteSolutionServ  = async (slug) => {
  try {
    const response = await axios.delete(BASE_URL + `solution/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


// post

export const createSolutionServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "solution" , formdata , {
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
// get

export const getServiceCategoryServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "service-category");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// post

export const createServiceCategoryServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "service-category", formdata, {
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

// get by slug

export const getServiceCategoryBySlug= async (slug) => {
  try {
    const response = await axios.get(BASE_URL + `service-category/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// delete service category by slug
export const deleteServiceCategoryServ = async (slug) => {
  try {
    const response = await axios.delete(BASE_URL + `service-category/delete/${slug}`);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



// update service category by slug
export const updateServiceCategoryServ = async (slug, categoryData) => {
  try {
    const response = await axios.put(BASE_URL + `service-category/update/${slug}`, categoryData);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};



// service category sub-category


// get

export const getServiceSubCategoryServ = async (categorySlug) => {
  try {
    const response = await axios.get(
      `${BASE_URL}service-subcategory?categorySlug=${categorySlug}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};


export const getSingleSubCategoryServ = async (categorySlug, subSlug) => {
  try {
    const res = await axios.get(
      `${BASE_URL}service-subcategory/${categorySlug}/${subSlug}`
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createServiceSubCategoryServ = async (payload) => {
  try {
    const response = await axios.post(
      `${BASE_URL}service-subcategory`,
      payload
    );

    return response;
  } catch (error) {
    console.error("Error creating subcategory:", error);
    throw error;
  }
};


export const deleteServiceSubCategoryServ = async (categorySlug, subSlug) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}service-subcategory/${categorySlug}/${subSlug}`
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateServiceSubCategoryServ = async (categorySlug, subSlug, subCategoryData) => {
  try {
    const res = await axios.put(
      `${BASE_URL}service-subcategory/${categorySlug}/${subSlug}`,
      subCategoryData
    );
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};








// Pricing page services
// get

export const getPricingPageServ = async () => {
  try {
    const response = await axios.get(BASE_URL + "pricing");
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// post

export const createPricingPageServ = async (formdata) => {
  try {
    const response = await axios.post(BASE_URL + "pricing" , formdata , {
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