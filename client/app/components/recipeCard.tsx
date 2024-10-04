import Image from 'next/image';
import React from 'react';

interface RecipeCard {
    name: string;
    img: string;
    description: string;
    ingredients: string[];
    steps: string[];
    tools: string[];
    time: string;
}

const RecipeCard: React.FC<{ recipe: RecipeCard }> = ({ recipe }) => {
    return (
        <div>
            <Image 
                src={recipe.img.startsWith('data:') ? recipe.img : `/path/to/images/${recipe.img}`} 
                alt={recipe.name} 
                width={500} 
                height={300} 
            />
            <p>{recipe.description}</p>
            <h3>Ingredients</h3>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Steps</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
            <h3>Tools</h3>
            <ul>
                {recipe.tools.map((tool, index) => (
                    <li key={index}>{tool}</li>
                ))}
            </ul>
            <p>Time: {recipe.time}</p>
        </div>
    );
};

export default RecipeCard;