'use client';


import { useEffect, useRef, useState } from 'react';
import { Message, Recipe } from '../models/models';
import RecipePreview from '../components/recipePreview';
import { TypeAnimation } from 'react-type-animation';

export default function Page() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const effectRan = useRef(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [useAvailable, setUseAvailable] = useState(false);

  console
  const fetchAndSetResponse = async ({ prompt, useAvailable }: { prompt: string; useAvailable: boolean }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/prompt/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, useAvailable }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.result) {
        setMessages((prevMessages) => [...prevMessages, { type: 'bot', text: data.result.message }]);
        if (data.result.recipe) {
          setRecipe(data.result.recipe);
        }
      }
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };


  useEffect(() => {
    if (effectRan.current) {
      return;
    }
    const storedData = localStorage.getItem('chatData');
    const data = storedData ? JSON.parse(storedData) : {};

    if (data.useAvailable) {
      setUseAvailable(data.useAvailable);
    }

    if (data.prompt) {
      setMessages(() => [{ type: 'user', text: data.prompt }]);
    }

    fetchAndSetResponse(data);
    effectRan.current = true;
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
      fetchAndSetResponse({ prompt: input, useAvailable });
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row">
      <div className="h-full w-full flex flex-col max-w-[60%] justify-end items-center margins">
        <div className="relative bottom-0 w-full overflow-y-auto mb-2">
          {messages.map((message, index) => (
        <div
          key={index}
          className={`flex p-2 items-center ${message.type === 'bot' ? 'justify-start' : 'justify-end'
            }`}
        >
          {message.type === 'bot' ? (
            <div className="bg-orange-300 w-6 h-6 rounded-full mr-2"></div>
          ) : (
            <></>
          )}
          <div className={`max-w-[90%] p-2 rounded-lg flex  ${message.type === 'bot' ? '' : 'bg-gray-200'}`}>
            {message.type === 'bot' ? (
          <p className="w-fit"><TypeAnimation
            sequence={[
              message.text
            ]}
            wrapper="span"
            cursor={false}
            repeat={0}
            speed={75}
            style={{}}
          /></p>
            ) : (
          <p className="w-fit">{message.text}</p>
            )}
          </div>
        </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="relative w-full">
          <input
        type="text"
        placeholder="Type a message"
        className="input-box w-full pr-10"
        onChange={handleInputChange}
        onKeyDown={onKeyDownEvent}
        value={input}
          />
          <button
        className="absolute right-0 top-0 h-full px-4 bg-orange-500 text-white"
        onClick={() => onKeyDownEvent({ key: 'Enter' } as React.KeyboardEvent<HTMLInputElement>)}
          >
        Send
          </button>
        </div>
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
  );
}
