'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Recipe } from '../models/models';
import { mockRecipes } from '../mockData/mockData';
import RecipeCard from '../components/recipeCard';

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // TODO: call API

    setRecipes(mockRecipes);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-start">
      <Navbar />
      <h1>Recipes</h1>
      <div className="flex flex-wrap justify-start gap-2">
        {recipes.map((recipe) => (
          <>
            <RecipeCard recipe={recipe}></RecipeCard>
          </>
        ))}
      </div>
    </div>
  );
}
