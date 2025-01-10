import axios from "axios";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = import.meta.env.VITE_SPOONACULAR_BASE_URL;

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        number: 10,
      },
    });
    return response.data.results;
  } catch (error) {
    throw new Error("Error fetching recipes");
  }
};

export const getRecipeDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/information`, {
      params: { apiKey: API_KEY },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recipe details");
  }
};
