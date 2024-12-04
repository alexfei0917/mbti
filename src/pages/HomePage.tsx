import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PersonalityCard } from '../components/PersonalityCard';
import { PersonalityType } from '../types';

const personalities = {
  work: [
    { id: 'boss', title: '和老板1v1汇报', description: '', category: 'work' as const },
    { id: 'colleague', title: '和同事互怼', description: '', category: 'work' as const },
    { id: 'client', title: '给客户画饼', description: '', category: 'work' as const },
  ],
  family: [
    { id: 'lover', title: '和对象讨论周末去哪玩', description: '', category: 'family' as const },
    { id: 'parent', title: '和父母计划下次旅行', description: '', category: 'family' as const },
    { id: 'date', title: '和相亲对象第一次约饭', description: '', category: 'family' as const },
  ],
  personality: [
    {
      "id": "ENTJ",
      "title": "ENTJ-领袖",
      "description": "独立、坚韧、有领袖气质，“别慌，能行！”",
      "category": "personality"
    },
    {
      "id": "INTJ",
      "title": "INTJ-智者",
      "description": "冷静、理性、善于规划，“事情还有改进的空间”",
      "category": "personality"
    },
    {
      "id": "INFJ",
      "title": "INFJ-导师",
      "description": "富有智慧，指引他人，“相信自己，你能做到”",
      "category": "personality"
    },
    {
      "id": "ENFJ",
      "title": "ENFJ-教育家",
      "description": "热情、同情心，善于激励，“让我们一起努力”",
      "category": "personality"
    },
    {
      "id": "ENTP",
      "title": "ENTP-辩论家",
      "description": "幽默风趣、喜欢辩论，“这只是一个开始”",
      "category": "personality"
    },
    {
      "id": "ESTP",
      "title": "ESTP-企业家",
      "description": "大胆、追求刺激，“行动起来，现在就做”",
      "category": "personality"
    },
    {
      "id": "ESFP",
      "title": "ESFP-表演者",
      "description": "爱玩爱笑、阳光乐观，“享受当下”",
      "category": "personality"
    },
    {
      "id": "ENFP",
      "title": "ENFP-宣传家",
      "description": "热情、富有创造力，“让我们一起创造美好”",
      "category": "personality"
    },
    {
      "id": "ISTJ",
      "title": "ISTJ-检查者",
      "description": "务实、可靠，注重细节，“按计划行事”",
      "category": "personality"
    },
    {
      "id": "ISFJ",
      "title": "ISFJ-守护者",
      "description": "温暖、负责任，重视传统，“我会照顾好大家”",
      "category": "personality"
    },
    {
      "id": "INFJ",
      "title": "INFJ-顾问",
      "description": "有洞察力，富有同理心，“倾听内心的声音”",
      "category": "personality"
    },
    {
      "id": "INTP",
      "title": "INTP-哲学家",
      "description": "喜欢思考、逻辑清晰，“思考是我的乐趣”",
      "category": "personality"
    },
    {
      "id": "ESTJ",
      "title": "ESTJ-执行者",
      "description": "果断、组织能力强，“按规矩办事”",
      "category": "personality"
    },
    {
      "id": "ESFJ",
      "title": "ESFJ-供养者",
      "description": "友好、热心，关注他人需求，“帮助他人是我的责任”",
      "category": "personality"
    },
    {
      "id": "ISFP",
      "title": "ISFP-艺术家",
      "description": "温和、实用，崇尚自由，“随心而动”",
      "category": "personality"
    },
    {
      "id": "ISTP",
      "title": "ISTP-工匠",
      "description": "好奇、动手能力强，“解决问题是我的乐趣”",
      "category": "personality"
    }
  ]
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (personality: PersonalityType) => {
    navigate('/chat', { state: { title: personality.title } });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">欢迎来到性格调音师</h1>
        
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">职场</h2>
          <div className="grid grid-cols-3 gap-4">
            {personalities.work.map(p => (
              <div key={p.id} onClick={() => handleCardClick(p)}>
                <PersonalityCard personality={p} />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">家庭</h2>
          <div className="grid grid-cols-2 gap-4">
            {personalities.family.map(p => (
              <div key={p.id} onClick={() => handleCardClick(p)}>
                <PersonalityCard personality={p} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-700">人格特征</h2>
          <div className="grid grid-cols-2 gap-4">
            {personalities.personality.map(p => (
              <div key={p.id} onClick={() => handleCardClick(p)}>
                <PersonalityCard personality={p} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};