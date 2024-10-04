import Image from 'next/image';
import React, { useState } from 'react';
import { Recipe } from '../models/models';
import Dialog from './dialog';
import RecipePreview from './recipePreview';

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  // const [madeRecipe, setMadeRecipe] = useState<boolean>(false);
  const [openRecipe, setOpenRecipe] = useState<boolean>(false);
  const [openMadeRecipe, setOpenMadeRecipe] = useState<boolean>(false);

  const onMadeRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // prevent the card from opening after button click
    console.log('Made Recipe! Removing certain items from inventory');

    setOpenMadeRecipe(true);
    // TODO: open items to be deleted from database
  };
  const closeMadeRecipeDialog = () => setOpenMadeRecipe(false);

  const onRecipeClick = () => {
    console.log('Recipe clicked! opening');
    setOpenRecipe(true);
  };

  //   const openRecipeDialog = () => setOpenRecipe(true);
  const closeRecipeDialog = () => setOpenRecipe(false);

  return (
    <>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white" onClick={onRecipeClick}>
        <div className="relative h-48">
          <Image
            src={recipe.img.startsWith('data:') ? recipe.img : `/path/to/images/${recipe.img}`}
            alt={recipe.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="px-6 py-4">
          <div>
            <div className="font-bold text-xl mb-2">{recipe.name}</div>
            <button
              disabled={true}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={onMadeRecipe}
            >
              Made Recipe
            </button>
          </div>

          <p className="text-gray-700 text-base">{recipe.description}</p>
        </div>
      </div>

      <Dialog isOpen={openRecipe} onClose={closeRecipeDialog}>
        <RecipePreview recipe={recipe}></RecipePreview>
      </Dialog>

      <Dialog isOpen={openMadeRecipe} onClose={closeMadeRecipeDialog}>
        {/* <div>TESTING</div> */}
        {/* <InventoryDeletions></InventoryDeletions> */}
      </Dialog>
    </>
  );
};

export default RecipeCard;
