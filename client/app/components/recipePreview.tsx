import React from 'react';
import { Recipe } from '../models/models';

const RecipePreview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const onSave = async () => {
    console.log('save recipe');
    // TODO: call backend
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-4">
      <div className="relative w-full h-full top-0 flex flex-col">
        <h1>{recipe.name}</h1>
        <div className="flex flex-row justify-between items-center mb-4">
          {recipe.time ? <p>Prep Time: {recipe.time}</p> : <></>}
        </div>
        <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded"
            src={recipe.picture}
            alt={recipe.name}
          />
        </div>
        <p className="mb-4">{recipe.desc}</p>
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
