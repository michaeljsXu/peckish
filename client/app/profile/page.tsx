'use client';

import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    tools: '',
    dislikes: '',
    favorites: '',
    allergies: '',
  });

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/670035083a92f02d95509e62`, {
          "method": "GET",
        });
        const data = await response.json();
        delete data._id;
        setUser(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const updateUserField = (field:string, value:string) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <Navbar />
      <h1>Hello, Profile page!</h1>
      <div style={{ marginTop: '20px' }}>
      {Object.entries(user).map(([field, value]) => (
        <div key={field}>
          <label>{field.charAt(0).toUpperCase() + field.slice(1)}: </label>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => updateUserField(field, e.target.value)}
            />
          ) : (
            <span>{value}</span>
          )}
        </div>
      ))}
        <button onClick={handleEditToggle} style={{ marginTop: '20px' }}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}
