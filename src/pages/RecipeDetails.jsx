import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeDetails } from "../utility/spoonacularApi";
import { ClipLoader } from "react-spinners";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError("Sorry! You exceed the daily limit quota.");
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <ClipLoader color="#3B82F6" loading={loading} size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-2xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url("${recipe.image || "/food.jpg"}")`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8 px-4 py-12 relative my-14">
        {/* Image on the Left */}
        <div className="w-full md:w-2/5 h-[25rem] md:h-[35rem] relative group">
          <img
            src={recipe.image || "https://via.placeholder.com/400x300"}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-xl transform transition duration-500 group-hover:scale-105 group-hover:shadow-2xl"
          />
        </div>

        {/* Recipe Details on the Right */}
        <div className="w-full md:w-2/5 h-auto md:h-[35rem] p-8 bg-white bg-opacity-70 rounded-xl backdrop-blur-lg shadow-lg overflow-y-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
            {recipe.title}
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Ingredients
          </h2>
          <div className="space-y-4">
            {recipe.extendedIngredients &&
            recipe.extendedIngredients.length > 0 ? (
              recipe.extendedIngredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center justify-between bg-gray-200 p-4 rounded-md shadow-md"
                >
                  <span className="text-lg text-gray-800">
                    {ingredient.original}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-lg text-gray-700">
                No ingredients available.
              </div>
            )}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Instructions
          </h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            {recipe.instructions || "No instructions available."}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => window.history.back()}
              className="bg-blue-600 text-white py-2 px-8 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
