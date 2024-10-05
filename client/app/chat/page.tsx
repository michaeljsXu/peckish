'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Message, Recipe } from '../models/models';
import { mockRecipePreview } from '../mockData/mockData';
import RecipePreview from '../components/recipePreview';

export default function Page() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseSound = new Audio("bird-response-sound.mp3");

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Initial prompt', messages);
    const prompt: string =
      searchParams.get('prompt') ||
      "A step-by-step recipe for a flavorful dish that's both easy to make and perfect for a weeknight dinner?";
    console.log(prompt);
    setMessages(() => [{ type: 'user', text: prompt }]);

    setTimeout(() => {
      // TODO: call API/backend
      // setInterval(() => {
      console.log('Bot is responding');
      // pretend bot is answering
      const reply = 'chirp chirp';
      setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: reply }]);
      // }, 10_000);
    }, 5000);

    setTimeout(() => {
      // TODO: recieve response from API/backend
      console.log('bot responds with a recipe');
      setRecipe(mockRecipePreview);
      responseSound.play();
    }, 5500);
  }, []);

  useEffect(() => {
    console.log('Updating messages');
    console.log('Messages', messages);

    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed', event);
    setInput(event.target.value);
  };

  const onKeyDownEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && input) {
      setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <>
      <div className="h-full w-full flex flex-row">
        <div className="h-full w-full flex flex-col max-w-[60%] justify-end items-center margins">
          <div className="relative bottom-0 w-full overflow-y-auto">
            {/* <div className="flex flex-col justify-end"> */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex p-2 items-center ${
                  message.type === 'bot' ? 'justify-start' : 'justify-end'
                }`}
              >
                {message.type === 'bot' ? (
                  <img src="/chat-icon.png" className="w-6 h-6"></img>
                ) : (
                  <></>
                )}
                <div
                  className={`max-w-[90%] p-2 rounded-lg flex  ${
                    message.type === 'bot' ? '' : 'bg-gray-200'
                  }`}
                >
                  <p className="w-fit">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <input
            type="text"
            placeholder="Type a message"
            className="input-box w-full"
            onChange={handleInputChange}
            onKeyDown={onKeyDownEvent}
            value={input}
          />
        </div>
        <div className="h-full w-full bg-orange-50 max-w-[40%] flex flex-col items-center justify-center left-shadow margins">
          {recipe ? (
            <>
              <div className="flex-1 overflow-y-auto">
                <RecipePreview recipe={recipe}></RecipePreview>
              </div>
              <div className="w-full flex justify-center items-center">
                <button className="w-fit m-2 btn-orange">Save Recipe</button>
              </div>
            </>
          ) : (
            <>
              <div className="justify-center">
                <div
                  className="h-9 w-9 animate-spin rounded-full border-4 border-orange-500 border-solid border-current border-e-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
