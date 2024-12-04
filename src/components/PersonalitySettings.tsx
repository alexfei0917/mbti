import React, { useState } from 'react';
import { PersonalitySlider } from './PersonalitySlider';

interface PersonalitySettingsProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const initialSliders = [
  {
    id: 'extroversion',
    label: '性格',
    value: 83,
    leftLabel: '外向',
    rightLabel: '内向',
    color: 'bg-blue-500'
  },
  {
    id: 'expression',
    label: '特征',
    value: 63,
    leftLabel: '有元气',
    rightLabel: '观察',
    color: 'bg-yellow-500'
  },
  {
    id: 'analysis',
    label: '对话方式',
    value: 56,
    leftLabel: '理性分析',
    rightLabel: 'SI号',
    color: 'bg-green-500'
  },
  {
    id: 'response',
    label: '应对方式',
    value: 98,
    leftLabel: '评判',
    rightLabel: '感受',
    color: 'bg-purple-500'
  },
  {
    id: 'body',
    label: '身份特征',
    value: 76,
    leftLabel: '坚决',
    rightLabel: '配合不要',
    color: 'bg-red-500'
  }
];

export const PersonalitySettings: React.FC<PersonalitySettingsProps> = ({
  onCancel,
  onConfirm,
}) => {
  const [sliders, setSliders] = useState(initialSliders);

  const handleSliderChange = (id: string, newValue: number) => {
    setSliders(sliders.map(slider => 
      slider.id === id ? { ...slider, value: newValue } : slider
    ));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">人格设置</h2>
        <div className="space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-1 text-sm border rounded hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            确认
          </button>
        </div>
      </div>
      {sliders.map(slider => (
        <PersonalitySlider
          key={slider.id}
          slider={slider}
          onChange={(value) => handleSliderChange(slider.id, value)}
        />
      ))}
    </div>
  );
};