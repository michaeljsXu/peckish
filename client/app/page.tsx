'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BREAKFAST_PROMPT,
  DINNER_PROMPT,
  LATE_NIGHT_PROMPT,
  LUNCH_PROMPT,
  RANDOM_PROMPT,
  RANDOM_PROMPT_TITLE,
} from './constants/constants';
import dotenv from 'dotenv';

dotenv.config();

export default function Home() {
  const router = useRouter();
  const effectRan = useRef(false);

  const [mainMessage, setMainMessage] = useState('');
  const [userInput, setUserInput] = useState('');
  const [useAvailable, setUseAvailable] = useState(false);
  const [expiredItems, setExpiredItems] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);

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
    if (effectRan.current) {
      return;
    }
    const fetchExpiredItems = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/utility/getExpiredItems`, {
          method: 'GET',
        });
        const data = await response.json();
        if (data && data.length > 0) {
          data.map((item: any) => console.log(item));
          data.map((item: any) => setExpiredItems((prev) => [...prev, item.name]));
          setShowPopup(true);
        }
      } catch (error) {
        console.error('Error fetching expired items:', error);
      }
    };

    fetchExpiredItems();
    effectRan.current = true;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('User input on Enter:', userInput);
      handleNavigate(userInput);
    }
  };

  const handleNavigate = (input:string) => {
    const data = {
      prompt: input,
      useAvailable: useAvailable ? 'true' : 'false',
    };
    localStorage.setItem('chatData', JSON.stringify(data));
    router.push('/chat');
  };

  const handleRemoveExpiredItems = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/utility/removeExpiredItems`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExpiredItems([]);
        setShowPopup(false);
      } else {
        console.error('Failed to remove expired items');
      }
    } catch (error) {
      console.error('Error removing expired items:', error);
    }
  };

  return (
    <div className="h-full w-full margins">
      <main className="h-full w-full flex flex-col justify-center items-center gap-6">
        <h1 className="text-center w-[450px]">{mainMessage}</h1>
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
          <div style={popupStyle}>
            <p>
              {expiredItems.length > 0
                ? `These items are expired: ${expiredItems.join(', ')}`
                : 'No expired items!'}
            </p>
            {expiredItems.length > 0 && (
              <button onClick={handleRemoveExpiredItems} className="mr-5 btn-orange-outline">
                Remove Expired Items
              </button>
            )}
          </div>
        </div>
        
        <div>
          <button onClick={() => handleNavigate(RANDOM_PROMPT)} className="mr-5 btn-orange-outline">
            {RANDOM_PROMPT_TITLE}
          </button>
          <button onClick={() => handleNavigate(userInput)} className="btn-orange">
            Enter
          </button>
        </div>
      </main>
    </div>
  );
}

const popupStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '10px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'white',
  color: '#ffffff',
  padding: '10px',
  borderRadius: '5px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};
