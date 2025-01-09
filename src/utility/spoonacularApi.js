import axios from "axios";

const API_KEY = "7a813ccb2de44af7855accb1c25c0b69";
const BASE_URL = "https://api.spoonacular.com/recipes";

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/complexSearch`, {
      params: {
        apiKey: API_KEY,
        number: 10, // Number of recipes to fetch
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
