import React, { useState } from 'react';

interface SceneSettingsProps {
  scenarios: string[];
  onCancel: () => void;
  onConfirm: (scenario: string) => void;
}

const defaultScenarios = [
  '给女朋友准备惊喜生日礼物，她的反应没有很感动，你想坦诚表达自己的失望。',
  '你已经结婚，但偶然遇到了第一次爱却没有在一起的人。',
  '你想和女朋友有更多亲密接触，但她表现得不太在意，你很困惑但又不好意思说。'
];

export const SceneSettings: React.FC<SceneSettingsProps> = ({
  scenarios,
  onCancel,
  onConfirm,
}) => {
  const [customScenario, setCustomScenario] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');

  const handleConfirm = () => {
    onConfirm(customScenario || selectedScenario);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">场景设置</h2>
        <div className="space-x-2">
          <button
            onClick={onCancel}
            className="px-4 py-1 text-sm border rounded hover:bg-gray-50"
          >
            取消
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            确认
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {[...defaultScenarios, ...scenarios].map((scenario, index) => (
          <div
            key={index}
            onClick={() => setSelectedScenario(scenario)}
            className={`p-3 rounded-lg cursor-pointer ${
              selectedScenario === scenario
                ? 'bg-pink-200'
                : 'bg-pink-50 hover:bg-pink-100'
            }`}
          >
            {scenario}
          </div>
        ))}
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium mb-2">自定义（点击即可编辑）</div>
          <textarea
            value={customScenario}
            onChange={(e) => {
              setCustomScenario(e.target.value);
              setSelectedScenario('');
            }}
            className="w-full h-24 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入自定义场景..."
          />
        </div>
      </div>
    </div>
  );
};