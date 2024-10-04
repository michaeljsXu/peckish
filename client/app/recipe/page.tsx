'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Recipe } from '../models/models';
import { mockRecipes } from '../mockData/mockData';
import RecipeCard from '../components/recipeCard';
import dotenv from 'dotenv';
dotenv.config();

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/recipe', {
          "method": "GET"
        });
        console.log(response);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes(mockRecipes);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-start">
      <Navbar />
      <h1>Recipes</h1>
      <div className="flex flex-wrap justify-start gap-2">
        {recipes.map((recipe, index) => (
          <>
            <RecipeCard key={index} recipe={recipe}></RecipeCard>
          </>
        ))}
      </div>
    </div>
  );
}
