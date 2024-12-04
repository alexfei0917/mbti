import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import { PersonalitySettings } from '../components/PersonalitySettings';
import { SceneSettings } from '../components/SceneSettings';
import { FileUpload } from '../components/FileUpload';
import { Message } from '../types';

type SettingsView = 'chat' | 'personality' | 'scene' | 'upload';

const mockResponses = [
  '好啊，我们可以一起去看电影',
  '那我们去公园散步吧',
  '要不要考虑去尝试新开的餐厅？',
  '周末天气不错，适合户外活动',
];

export const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title } = location.state || { title: '对话' };
  const [currentView, setCurrentView] = useState<SettingsView>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [responseIndex, setResponseIndex] = useState(0);
  const [scenarios, setScenarios] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { id: Date.now(), text: inputValue, sender: 'user' },
    ];

    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      const response = mockResponses[responseIndex % mockResponses.length];
      setMessages([
        ...newMessages,
        { id: Date.now() + 1, text: response, sender: 'bot' },
      ]);
      setResponseIndex(prev => prev + 1);
      scrollToBottom();
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'personality':
        return (
          <PersonalitySettings
            onCancel={() => setCurrentView('chat')}
            onConfirm={() => {
              alert('人格设置已保存！');
              setCurrentView('chat');
            }}
          />
        );
      case 'scene':
        return (
          <SceneSettings
            scenarios={scenarios}
            onCancel={() => setCurrentView('chat')}
            onConfirm={(scenario) => {
              if (scenario) {
                setScenarios([...scenarios, scenario]);
              }
              setCurrentView('chat');
            }}
          />
        );
      case 'upload':
        return (
          <FileUpload
            files={uploadedFiles}
            onCancel={() => setCurrentView('chat')}
            onConfirm={(files) => {
              if (files.length > 0) {
                setUploadedFiles([...uploadedFiles, ...files]);
              }
              setCurrentView('chat');
            }}
          />
        );
      default:
        return (
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mb-4 ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : message.sender === 'system'
                      ? 'bg-gray-300 text-gray-800'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="bg-white border-b px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate('/')}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=faces"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 flex items-center gap-4">
          <span className="font-medium">{title}</span>
          <button
            onClick={() => setCurrentView(currentView === 'personality' ? 'chat' : 'personality')}
            className={`px-3 py-1 text-sm rounded-full ${
              currentView === 'personality' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            人格设置
          </button>
          <button
            onClick={() => setCurrentView(currentView === 'scene' ? 'chat' : 'scene')}
            className={`px-3 py-1 text-sm rounded-full ${
              currentView === 'scene' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            场景设置
          </button>
          <button
            onClick={() => setCurrentView(currentView === 'upload' ? 'chat' : 'upload')}
            className={`px-3 py-1 text-sm rounded-full ${
              currentView === 'upload' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            资料上传
          </button>
        </div>
      </header>

      {renderContent()}

      {currentView === 'chat' && (
        <div className="bg-white border-t p-4">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};