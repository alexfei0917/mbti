import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { PersonalitySlider as SliderType } from '../types';

interface PersonalitySliderProps {
  slider: SliderType;
  onChange: (value: number) => void;
}

export const PersonalitySlider: React.FC<PersonalitySliderProps> = ({ slider, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">{slider.label}</span>
        <span className="text-sm font-medium">{slider.value}%</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-gray-500">{slider.leftLabel}</span>
        <Slider.Root
          className="relative flex-1 flex items-center h-5"
          value={[slider.value]}
          max={100}
          step={1}
          onValueChange={(value) => onChange(value[0])}
        >
          <Slider.Track className="bg-gray-200 relative grow h-2 rounded-full">
            <Slider.Range className={`absolute h-full rounded-full ${slider.color}`} />
          </Slider.Track>
          <Slider.Thumb className="block w-5 h-5 bg-white rounded-full shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
        </Slider.Root>
        <span className="text-xs text-gray-500">{slider.rightLabel}</span>
      </div>
    </div>
  );
};