import React from 'react';
import { Recipe } from '../models/models';

const RecipePreview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const onSave = () => {
    console.log('save recipe');
    // TODO: call backend
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-4">
      <div className="relative w-full h-full top-0 flex flex-col">
        <h1>{recipe.name}</h1>
        <div className="flex flex-row justify-between items-center mb-4">
          {recipe.prepTime ? <p>Prep Time: {recipe.prepTime}</p> : <></>}
          {recipe.cookTime ? <p>Cook Time: {recipe.cookTime}</p> : <></>}
        </div>
        <img
          className="w-full h-auto mb-4"
          src={recipe.img.startsWith('data:') ? recipe.img : `/path/to/images/${recipe.img}`}
          alt={recipe.name}
        />
        <p className="mb-4">{recipe.description}</p>
        <div className="mb-4">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2>Tools</h2>
          <ul>
            {recipe.tools.map((tool, index) => (
              <li key={index}>{tool}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Steps</h2>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index} className="mb-1">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;
