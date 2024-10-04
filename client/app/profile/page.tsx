'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

export default function Page() {
  const [name, setName] = useState('John Doe');
  const [tools, setTools] = useState('oven, microwave, stove');
  const [dietType, setDietType] = useState('Vegetarian');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('nuts, dairy');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };


  // TODO: when save is clicked, make call to API and send info to backend db
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <Navbar />
      <h1>Hello, Profile page!</h1>
      <div style={{ marginTop: '20px' }}>
        <div>
          <label>Name: </label>
          {isEditing ? (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{name}</span>
          )}
        </div>
        <div>
          <label>Tools: </label>
          {isEditing ? (
            <input type="text" value={tools} onChange={(e) => setTools(e.target.value)} />
          ) : (
            <span>{tools}</span>
          )}
        </div>
        <div>
          <label>Diet Type: </label>
          {isEditing ? (
            <input type="text" value={dietType} onChange={(e) => setDietType(e.target.value)} />
          ) : (
            <span>{dietType}</span>
          )}
        </div>
        <div>
          <label>Dietary Restrictions/Dislikes: </label>
          {isEditing ? (
            <input
              type="text"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          ) : (
            <span>{dietaryRestrictions}</span>
          )}
        </div>
        <button onClick={handleEditToggle} style={{ marginTop: '20px' }}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
}
