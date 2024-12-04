export interface PersonalityType {
  id: string;
  title: string;
  description: string;
  category: 'work' | 'family' | 'personality';
}

export interface PersonalitySlider {
  id: string;
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  color: string;
}

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'system';
  files?: File[];
}