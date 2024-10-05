'use client';

import { useState, useEffect, useRef } from 'react';

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleApplyChanges = async () => {
    setIsClicked(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/670035083a92f02d95509e62`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 1000);
    } catch (error) {
      console.error('Error updating user info:', error);
    } finally {
      setTimeout(() => setIsClicked(false), 100);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/670035083a92f02d95509e62`,
          {
            method: 'GET',
          },
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const updateUserField = (field: string, value: string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: string) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    updateUserField(field, textarea.value);
  };

  const textareaRefs = useRef<{ [key: string]: HTMLTextAreaElement | null }>({});

  useEffect(() => {
    Object.entries(textareaRefs.current).forEach(([field, textarea]) => {
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen margins">
      {showAlert && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center p-4">
          Update successful!
        </div>
      )}
      <div className="w-1/2 flex flex-col gap-5">
        {Object.entries(user)
          .filter(([field]) => field !== '_id')
          .map(([field, value]) => (
            <div key={field} className="flex flex-col">
              <label className="mb-1 font-bold">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </label>
              <textarea
                ref={(el) => {
                  textareaRefs.current[field] = el;
                }}
                value={value as string}
                onChange={(e) => handleTextareaChange(e, field)}
                className="p-2 text-lg rounded border border-gray-300 resize-none overflow-hidden"
                rows={1}
                style={{ minHeight: '2.5rem' }}
              />
            </div>
          ))}
        <button
          onClick={handleApplyChanges}
          className={`mt-5 p-2 text-lg rounded border-none bg-blue-500 text-white transition-transform duration-300 ${
            isClicked ? 'transform scale-95' : ''
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
