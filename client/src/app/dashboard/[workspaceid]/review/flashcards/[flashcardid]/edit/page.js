"use client";
import { QuizCard } from '@/components/built/quizcard';
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { HoverEffectButton } from '@/components/ui/card-hover-buttons';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { HoverEffectButtonOnClick } from '@/components/ui/cardHoverOnClickBtn';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';


export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid, topicid } = useParams();

  const [activeSection, setActiveSection] = useState('int');
  const [activeTab, setActiveTab] = useState('review');
  const sectionRefs = useRef({});

  const flashcards = [
    {
      id: "123",
      title: <>What is the capital of France?</>,
      description: <>Paris</>,
	  buttons: [
      {
        value: "Delete",
        onClick: () => console.log("Delete clicked!"), // Define your onClick action here
      }
    ],
    },
    {
      id: "456",
      title: <>What is the capital of Germany?</>,
      description: <>Berlin</>,
	  buttons: [
      {
        value: "Delete",
        onClick: () => console.log("Delete clicked!"), // Define your onClick action here
      },
      
    ],
    },
    {
      id: "789",
      title: <>What is the capital of Italy?</>,
      description: <>Rome</>,
	  buttons: [
      {
        value: "Delete",
        onClick: () => console.log("Delete clicked!"), // Define your onClick action here
      },
     
    ],
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
			<div className="flex flex-wrap">
			 
				<HoverEffectButtonOnClick items={flashcards} />
			
			</div>
           
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
