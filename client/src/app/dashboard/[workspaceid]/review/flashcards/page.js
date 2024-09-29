"use client";
import { QuizCard } from '@/components/built/quizcard';
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { HoverEffectButton } from '@/components/ui/card-hover-buttons';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
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
  const [showModal, setShowModal] = useState(false);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');

  const flashcards = [
    {
      title: "FlashCard 1 - Introduction",
      id: "123",
      description: "Pre built quizzes to help you test your knowledge on various topics.",
      count: 10,
      link: `/dashboard/${workspaceid}/review/flashcards/123`,
      mannual: true,
      buttons: [
        { link: `/dashboard/${workspaceid}/review/flashcards/123`, value: "Learn" },
        { link: `/dashboard/${workspaceid}/review/flashcards/123/edit`, value: "Edit" },
      ]
    },
    {
      title: "FlashCard 2 - Advanced",
      id: "456",
      description: `Quiz to help you memorize important concepts and terms.`,
      count: 10,
      link: `/dashboard/${workspaceid}/review/flashcards/456`,
      mannual: true,
      buttons: [
        { link: `/dashboard/${workspaceid}/review/flashcards/456`, value: "Learn" },
        { link: `/dashboard/${workspaceid}/review/flashcards/456/edit`, value: "Edit" },
      ]
    },
    {
      title: "FlashCard 3 - Advanced",
      id: "789",
      description: "AI-generated quiz to help you memorize important concepts and terms.",
      count: 10,
      link: `/dashboard/${workspaceid}/review/flashcards/789`,
      mannual: false,
      buttons: [
        { link: `/dashboard/${workspaceid}/review/flashcards/789`, value: "Learn" },
      ]
    },
    {
      title: "FlashCard 4 - Advanced",
      id: "101",
      description: "AI-generated quiz to help you memorize important concepts and terms.",
      count: 10,
      link: `/dashboard/${workspaceid}/review/flashcards/101`,
      mannual: false,
      buttons: [
        { link: `/dashboard/${workspaceid}/review/flashcards/101`, value: "Learn" },
      ]
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

  const handleAddCollection = () => {
    const newCollection = {
      title: collectionTitle,
      description: collectionDescription,
      workspaceid: workspaceid,
    };
    console.log(JSON.stringify(newCollection, null, 2));
    setShowModal(false);
    setCollectionTitle('');
    setCollectionDescription('');
  };

  useEffect(() => {
    const element = sectionRefs.current[topicid];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [topicid]);

  // Filter the flashcards
  const mannualFlashcards = flashcards.filter(card => card.mannual === true);
  const aiGeneratedFlashcards = flashcards.filter(card => card.mannual === false);

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">
        <div className="w-screen py-[64px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex px-8 mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-800 p-2 shadow-md z-10">
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

          {/* Flashcards Section: Three per Row */}
          <div className="max-w-5xl mx-auto px-8">
           {/* AI Generated Flashcards */}
           <h2 className="text-2xl font-bold mt-8 mb-4">AI Generated Flashcards</h2>
            <div className="flex flex-wrap">
              <HoverEffectButton items={aiGeneratedFlashcards} />
            </div>
            {/* Manually Generated Flashcards */}
            <h2 className="text-2xl font-bold mb-4">Manually Generated Flashcards</h2>
            <div className="flex flex-wrap">
              <HoverEffectButton items={mannualFlashcards} />
            </div>
          </div>
        </div>

        {/* Floating Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-7 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          Add Collection
        </button>

        {/* Modal for Adding Collection */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:dark:bg-neutral-900 p-5 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Add Collection</h2>
              <input
                type="text"
                placeholder="Collection Title"
                value={collectionTitle}
                onChange={(e) => setCollectionTitle(e.target.value)}
                className="border dark:bg-neutral-800 p-2 w-full mb-2"
              />
              <textarea
                placeholder="Collection Description"
                value={collectionDescription}
                onChange={(e) => setCollectionDescription(e.target.value)}
                className="border dark:bg-neutral-800  p-2 w-full mb-4"
              />
              <button
                onClick={handleAddCollection}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 p-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}
