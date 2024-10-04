'use client';

import { useState } from 'react';
import Navbar from '../components/navbar';

export default function Page() {
  const [name, setName] = useState('John Doe');
  const [tools, setTools] = useState('oven, microwave, stove');
  const [dietType, setDietType] = useState('Vegetarian');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('nuts, dairy');
  const [isEditing, setIsEditing] = useState({
    name: false,
    tools: false,
    dietType: false,
    dietaryRestrictions: false,
  });

  const handleEditToggle = (section: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}
    >
      <Navbar />
      <h1>Hello, Profile page!</h1>
      <div style={{ marginTop: '20px' }}>
        <div>
          <label>Name: </label>
          {isEditing.name ? (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <span>{name}</span>
          )}
          <button onClick={() => handleEditToggle('name')} style={{ marginLeft: '100px' }}>
            {isEditing.name ? 'Save' : 'Edit'}
          </button>
        </div>
        <div>
          <label>Tools: </label>
          {isEditing.tools ? (
            <input type="text" value={tools} onChange={(e) => setTools(e.target.value)} />
          ) : (
            <span>{tools}</span>
          )}
          <button onClick={() => handleEditToggle('tools')} style={{ marginLeft: '100px' }}>
            {isEditing.tools ? 'Save' : 'Edit'}
          </button>
        </div>
        <div>
          <label>Diet Type: </label>
          {isEditing.dietType ? (
            <input type="text" value={dietType} onChange={(e) => setDietType(e.target.value)} />
          ) : (
            <span>{dietType}</span>
          )}
          <button onClick={() => handleEditToggle('dietType')} style={{ marginLeft: '100px' }}>
            {isEditing.dietType ? 'Save' : 'Edit'}
          </button>
        </div>
        <div>
          <label>Dietary Restrictions/Dislikes: </label>
          {isEditing.dietaryRestrictions ? (
            <input
              type="text"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          ) : (
            <span>{dietaryRestrictions}</span>
          )}
          <button
            onClick={() => handleEditToggle('dietaryRestrictions')}
            style={{ marginLeft: '100px' }}
          >
            {isEditing.dietaryRestrictions ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
}
