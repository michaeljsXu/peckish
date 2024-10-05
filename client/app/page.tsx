'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { useRouter } from 'next/navigation';
import {
  BREAKFAST_PROMPT,
  DINNER_PROMPT,
  LATE_NIGHT_PROMPT,
  LUNCH_PROMPT,
  RANDOM_PROMPT,
} from './constants/constants';
import dotenv from 'dotenv';

dotenv.config();

export default function Home() {
  const router = useRouter();

  const [mainMessage, setMainMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [useAvailable, setUseAvailable] = useState(false);

  useEffect(() => {
    const updateMainMessage = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 3 && currentHour < 10) {
        setMainMessage(BREAKFAST_PROMPT);
      } else if (currentHour >= 10 && currentHour < 15) {
        setMainMessage(LUNCH_PROMPT);
      } else if (currentHour >= 15 && currentHour < 22) {
        setMainMessage(DINNER_PROMPT);
      } else {
        setMainMessage(LATE_NIGHT_PROMPT);
      }
    };

    updateMainMessage();
  }, []);

  useEffect(() => {
    console.log('User input:', userInput);
  }, [userInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('User input on Enter:', userInput);
      handleNavigate();
    }
  };

  const handleNavigate = (input?: string) => {
    console.log('handleNavigate', input);
    const queryParams: { [key: string]: string } = {
      prompt: input ?? userInput,
      available: useAvailable ? 'true' : 'false',
    };
    router.push('/chat?' + new URLSearchParams(queryParams).toString());
  };

  return (
    <div className="h-screen w-screen">
      <Navbar />
      <main className="h-full w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-center">{mainMessage}</h1>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-box w-[450px]"
          placeholder="Type your message here..."
        />
        <div className="flex flex-row items-center">
          <input
            type="checkbox"
            className="checkbox mr-2"
            checked={useAvailable}
            onChange={() => setUseAvailable((prev) => !prev)}
          />
          <label>Use available ingredients</label>
        </div>

        <div>
          <button onClick={() => handleNavigate(RANDOM_PROMPT)} className="mr-5 btn-orange-outline">
            {RANDOM_PROMPT}
          </button>
          <button onClick={() => handleNavigate()} className="btn-orange">
            Enter
          </button>
        </div>
      </main>
    </div>
  );
}
