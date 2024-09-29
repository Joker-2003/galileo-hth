"use client";
import { QuizCard } from '@/components/built/quizcard';
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const topics = [
  {
    id: 'introduction',
    title: 'Introduction',
    body: [
      { type: 'text', content: `Lorem ipsum odor amet, consectetuer adipiscing elit.` },
      { type: 'image', src: "https://i.redd.it/vrhjcvtakw661.jpg" },
    ]
  },
  {
    id: 'lesson1', title: 'Lesson 1: Basics', body: [
      { type: 'text', content: "Hello, this is the introduction!" },
      { type: 'image', src: "https://i.redd.it/vrhjcvtakw661.jpg" }
    ]
  },
  {
    id: 'lesson2', title: 'Lesson 2: Advanced', body: [
      { type: 'text', content: "Hello, this is the advanced section!" },
      { type: 'image', src: "https://i.redd.it/vrhjcvtakw661.jpg" }
    ]
  },
];

export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid, topicid } = useParams();

  const [activeSection, setActiveSection] = useState('int');
  const [activeTab, setActiveTab] = useState('review');
  const sectionRefs = useRef({});

  const flashcards = [
    {
      title: "FlashCard 1 - Introduction",
      id : "123",
      description:
        "Pre built quizzes to help you test your knowledge on various topics.",
      count : 10,
     link: `/dashboard/${workspaceid}/review/flashcards/${123}`,
    },
    {
      title: "FlashCard  2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
        count : 10,
      link: `/dashboard/${workspaceid}/review/flashcards/${456}`,
    },
    {
      title: "FlashCard 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
        count : 10,
      link: `/dashboard/${workspaceid}/review/flashcards/${456}`,
    },
    {
      title: "FlashCard 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
        count : 10,
      link: `/dashboard/${workspaceid}/review/flashcards/${456}`,
    },
    {
      title: "FlashCard  2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
        count : 10,
      link: `/dashboard/${workspaceid}/review/flashcards/${456}`,
    },
  ];


  const handleNavigation = (topic) => {
    setActiveSection(topic);
    router.push(`/dashboard/${workspaceid}/${topic}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'overview') {
      router.push(`/dashboard/${workspaceid}/introduction`);
    } else {
      router.push(`/dashboard/${workspaceid}/${tab}`);
    }
  };

  useEffect(() => {
    const element = sectionRefs.current[topicid];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [topicid]);

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">

       

        {/* Right: Content */}
        <div className="w-screen py-[64px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex px-8 mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-900 p-2 shadow-md">
            <button
              onClick={() => handleTabChange('overview')}
              className={`p-4 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange('review')}
              className={`p-4 ${activeTab === 'review' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
            >
              Review
            </button>
            <button
              onClick={() => handleTabChange('mindmap')}
              className={`p-4 ${activeTab === 'mindmap' ? 'border-b-2 border-blue-500 font-semibold' : ''}`}
            >
              Mindmap
            </button>
          </div>

         {/* Flashcards: Three per Row */}
         <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-wrap">
            <HoverEffect items={flashcards} />
            </div>
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}

