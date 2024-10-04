'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import RecipeCard from '../components/recipeCard';
import Navbar from '../components/navbar';
import { Message, Recipe } from '../models/models';
import RecipePreview from '../components/recipePreview';
import { mockRecipePreview } from '../mockData/mockData';

export default function Page() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // const [replies, setReplies] = useState<string[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Initial prompt', messages);
    const prompt: string =
      searchParams.get('prompt') ||
      "A step-by-step recipe for a flavorful dish that's both easy to make and perfect for a weeknight dinner?";
    console.log(prompt);
    setMessages(() => [{ type: 'user', text: prompt }]);

    setTimeout(() => {
      // setInterval(() => {
        console.log('Bot is responding');
        // pretend bot is answering
        const reply = 'chirp chirp';
        setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: reply }]);
      // }, 10_000);
    }, 5000);

    setTimeout(() => {
      console.log('bot responds with a recipe');
      setRecipe(mockRecipePreview);
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
    if (event.key === 'Enter') {
      setMessages((prevMessages) => [...prevMessages, { type: 'user', text: input }]);
      setInput('');
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <div className="h-full w-full flex flex-col max-w-[60%] justify-end items-center">
          <div className="relative bottom-0 w-full overflow-y-auto">
            {/* <div className="flex flex-col justify-end"> */}
            {messages.map((message, index) => (
              <div key={index} className="p-2">
                <div
                  className={`p-2 rounded-lg ${
                    message.type === 'bot' ? 'bg-[beige]' : 'bg-[pink]'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            {/* Dummy div to ensure we scroll to the bottom */}
            <div ref={messagesEndRef} />
            {/* </div> */}
          </div>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Type a message"
            className="border rounded p-2 w-full"
            onKeyDown={onKeyDownEvent}
            value={input}
          />
        </div>
        <div className="h-full w-full bg-[beige] max-w-[40%]">
          {recipe ? <RecipePreview recipe={recipe}></RecipePreview> : <></>}
        </div>
      </div>
    </>
  );
}
