'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [messages, setMessages] = useState<string[]>([]);
  const [replies, setReplies] = useState<string[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('Initial prompt', messages);
    const prompt: string =
      searchParams.get('prompt') ||
      "A step-by-step recipe for a flavorful dish that's both easy to make and perfect for a weeknight dinner?";
    console.log(prompt)
      setMessages((prevMessges) => [...prevMessges, prompt]);
  }, []);

  return (
    <>
      <div className="h-screen w-screen flex flex-row">
        <div className="h-full w-full flex flex-col max-w-[60%] justify-between items-center">
          <div>CHAT STUFF</div>
          <input type="text" placeholder="Type a message" className="border rounded p-2 w-full" />
        </div>
        <div className="h-full w-full bg-[beige] max-w-[40%]"></div>
      </div>
    </>
  );
}
