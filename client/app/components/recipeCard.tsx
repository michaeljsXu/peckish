import Image from 'next/image';
import React, { useState } from 'react';
import { Recipe } from '../models/models';
import Dialog from './dialog';
import RecipePreview from './recipePreview';
import Snackbar from './snackbar';

const RecipeCard: React.FC<{ recipe: Recipe, onRecipeDelete: () => void }> = ({ recipe, onRecipeDelete }) => {
  // const [madeRecipe, setMadeRecipe] = useState<boolean>(false);
  const [openRecipe, setOpenRecipe] = useState<boolean>(false);
  const [openMadeRecipe, setOpenMadeRecipe] = useState<boolean>(false);

  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const onMadeRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // prevent the card from opening after button click
    console.log('Made Recipe! Removing certain items from inventory');

    setOpenMadeRecipe(true);
    setSnackbarVisible(true);
    setSnackbarMessage('Recipe prepared! 😋');

    // if (dismissCallback) {
    setTimeout(() => {
      setSnackbarVisible(false);
      setSnackbarMessage('');
    }, 3000);
  };

  const deleteRecipe = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/recipe/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the recipe');
      }

      console.log('Recipe deleted successfully');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
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
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-orange-100" onClick={onRecipeClick}>
        <div className="relative h-48">
          <img
            className="h-full w-full object-cover"
            src={recipe.picture.startsWith('data:') || recipe.picture.startsWith('http') ? recipe.picture : `/path/to/images/${recipe.picture}`}
            alt={recipe.name}
          />
            <button
            className="absolute top-2 right-2 bg-gray-300 rounded-full p-1 hover:bg-gray-200 w-6 h-6 flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              deleteRecipe(recipe._id);
              onRecipeDelete();
            }}
            >
            &times;
            </button>
        </div>
        <div className="px-6 py-4">
          <div className="flex flex-row justify-between items-center mb-2">
            <h2 className="mb-0">{recipe.name}</h2>
            <button className="btn-orange whitespace-nowrap" onClick={onMadeRecipe}>
              Prepared!
            </button>
          </div>
          <p className="text-gray-700">{recipe.desc}</p>
        </div>
      </div>

      <Dialog isOpen={openRecipe} onClose={closeRecipeDialog}>
        <RecipePreview recipe={recipe}></RecipePreview>
      </Dialog>

      <Snackbar message={snackbarMessage} visible={snackbarVisible} />
    </>
  );
};

export default RecipeCard;
