"use client";
import { QuizCard } from '@/components/built/quizcard';
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { HoverEffect } from '@/components/ui/card-hover-effect';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';



export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid, topicid } = useParams();

  const [activeSection, setActiveSection] = useState('int');
  const [activeTab, setActiveTab] = useState('review');
  const sectionRefs = useRef({});

  const projects = [
    {
      title: "Quiz 1 - Introduction",
      id : "123",
      description:
        "Pre built quizzes to help you test your knowledge on various topics.",
     link: `/dashboard/${workspaceid}/review/quiz/${123}`,
    },
    {
      title: "Quiz 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
      link: `/dashboard/${workspaceid}/review/quiz/${456}`,
    },
    {
      title: "Quiz 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
      link: `/dashboard/${workspaceid}/review/quiz/${456}`,
    },
    {
      title: "Quiz 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
      link: `/dashboard/${workspaceid}/review/quiz/${456}`,
    },
    {
      title: "Quiz 2 - Advanced",
      id : "456",
      description:
        "Quiz to help you memorize important concepts and terms.",
      link: `/dashboard/${workspaceid}/review/quiz/${456}`,
    },
  ];


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

          {/* Quiz Cards: Three per Row */}
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-wrap">
            <HoverEffect items={projects} />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
