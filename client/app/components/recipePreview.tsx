import React from 'react';
import { Recipe } from '../models/models';

const RecipePreview: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  const onSave = () => {
    console.log('save recipe');
    // TODO: call backend
  };

  return (
    <div className="h-full w-full flex flex-col justify-between p-4">
      <div
        className="relative w-full top-0 flex flex-col overflow-y-auto"
        style={{ height: 'calc(100% - 20px)' }}
      >
        <h1 className="text-2xl font-bold mb-2">{recipe.name}</h1>
        <div className="flex flex-row justify-between items-center mb-4">
          <p className="text-sm">Prep Time: {recipe.prepTime}</p>
          <p className="text-sm">Cook Time: {recipe.cookTime}</p>
        </div>
        <img
          className="w-full h-auto mb-4"
          src={recipe.img.startsWith('data:') ? recipe.img : `/path/to/images/${recipe.img}`}
          alt={recipe.name}
        />
        <p className="mb-4">{recipe.description}</p>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-sm">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Tools</h2>
          <ul className="list-disc list-inside">
            {recipe.tools.map((tool, index) => (
              <li key={index} className="text-sm">
                {tool}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Steps</h2>
          <ol className="list-decimal list-inside">
            {recipe.steps.map((step, index) => (
              <li key={index} className="text-sm mb-1">
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={onSave}
      >
        Save
      </button>
    </div>
  );
};

export default RecipePreview;
