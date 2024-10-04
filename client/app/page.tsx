'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const [mainMessage, setMainMessage] = useState("What's on the menu today?");
  const [userInput, setUserInput] = useState('');
  const [useAvailable, setUseAvailable] = useState(false);

  useEffect(() => {
    console.log('User input:', userInput);
  }, [userInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('User input on Enter:', userInput);
      handleNavigate();
    }
  };

  const handleButtonClick = () => {
    console.log("I'm feeling peckish");
    handleNavigate("I'm feeling peckish");
    // suggest me anything
    // message, useAvailable
  };

  const handleNavigate = (input?: string) => {
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
        <h1>{mainMessage}</h1>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-[450px]"
          placeholder="Type your message here..."
        />
        <div>
          <button onClick={handleButtonClick} className="mr-5 btn-orange-outline">
            I&apos;m feeling peckish
          </button>
          <button
            onClick={() => console.log('User input on Enter:', userInput)}
            className="btn-orange"
          >
            Enter
          </button>
        </div>
      </main>
    </div>
  );
}
