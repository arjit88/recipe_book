import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecipes } from "../utility/spoonacularApi";
import { ClipLoader } from "react-spinners";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError("Sorry! You exceed the daily limit quota.");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/food.jpg")',
      }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen py-12 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-white my-12">
            Explore Delicious Recipes
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe) => (
              <Link
                to={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="transition duration-300 transform hover:scale-105 hover:shadow-2xl flex flex-col bg-gray-800 bg-opacity-80 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={`${recipe.image}`}
                  alt={recipe.title}
                  className="w-full h-60 object-cover rounded-t-lg"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-white truncate mb-2">
                    {recipe.title}
                  </h2>
                  <p
                    className="text-sm text-gray-300 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: recipe.summary || "Click to view Recipes.",
                    }}
                  />
                  <button className="mt-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg text-sm hover:from-blue-600 hover:to-green-600 transition duration-300">
                    View Recipe
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
