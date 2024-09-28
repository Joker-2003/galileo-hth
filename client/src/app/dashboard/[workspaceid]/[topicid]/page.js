"use client";
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
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

  const [activeSection, setActiveSection] = useState(topicid || '');
  const [activeTab, setActiveTab] = useState('overview');
  const sectionRefs = useRef({});

  const handleNavigation = (topic) => {
    setActiveSection(topic);
    router.push(`/dashboard/${workspaceid}/${topic}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'overview') {
      router.push(`/dashboard/${workspaceid}/${topicid || 'introduction'}`);
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

        {/* Left: Table of Contents */}
        <div className="w-1/4 p-4 bg-gray-100 dark:bg-neutral-900 sticky top-0 h-screen overflow-y-auto py-20">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => handleNavigation(topic.id)}
                  className={`w-full text-left p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-800 ${activeSection === topic.id ? 'bg-gray-300 dark:bg-neutral-700' : ''}`}
                >
                  {topic.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Content */}
        <div className="w-3/4 py-[64px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-900 p-2 shadow-md">
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

          {/* Conditional Rendering based on Tab */}
          {activeTab === 'overview' && topics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              ref={(el) => {
                if (el) sectionRefs.current[topic.id] = el;
              }}
              className="min-w-full min-h-screen flex flex-col p-8 mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
              {topic.body.map((item, index) => (
                <div key={index} className="mb-6">
                  {item.type === 'text' ? (
                    <p className="mb-4">{item.content}</p>
                  ) : item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={`Image ${index}`}
                      className="mx-auto max-w-full h-auto max-h-60 min-h-[200px] object-contain"
                    />
                  ) : null}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
