'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import RecipeCard from '../components/recipeCard';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [visibleRecipes, setVisibleRecipes] = useState(3);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/recipe', {
          method: 'GET',
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const loadMoreRecipes = () => {
    setVisibleRecipes((prevVisibleRecipes) => prevVisibleRecipes + 6);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold my-4">Recipes</h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {recipes.slice(0, visibleRecipes).map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      {visibleRecipes < recipes.length && (
        <button
          onClick={loadMoreRecipes}
          className="mt-4 p-2 text-lg rounded border-none btn-orange text-white"
        >
          Load More Recipes
        </button>
      )}
    </div>
  );
}