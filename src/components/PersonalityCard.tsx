import React from 'react';
import { PersonalityType } from '../types';

interface PersonalityCardProps {
  personality: PersonalityType;
}

export const PersonalityCard: React.FC<PersonalityCardProps> = ({ personality }) => {
  return (
    <div className="bg-pink-100 rounded-lg p-4 text-sm cursor-pointer hover:bg-pink-200 transition-colors">
      <h3 className="font-medium mb-1">{personality.title}</h3>
      <p className="text-gray-600">{personality.description}</p>
    </div>
  );
};