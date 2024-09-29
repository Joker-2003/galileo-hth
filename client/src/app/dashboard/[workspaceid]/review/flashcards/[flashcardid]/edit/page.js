"use client";
import { QuizCard } from '@/components/built/quizcard';
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { HoverEffectButton } from '@/components/ui/card-hover-buttons';
import { HoverEffectButtonOnClick } from '@/components/ui/cardHoverOnClickBtn';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid, topicid } = useParams();
  const {flashcardid} = useParams();

  const [activeSection, setActiveSection] = useState('int');
  const [activeTab, setActiveTab] = useState('review');
  const sectionRefs = useRef({});

  
  const [flashcards, setFlashcards] = useState([
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ front: '', back: '' });

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

  const handleAddFlashcard = () => {
    const updatedFlashcards = 
      {
        front:newFlashcard.front,
        back:newFlashcard.back,
		groupid: flashcardid,
		workspaceid: workspaceid,
      };

  
  	 console.log(JSON.stringify(updatedFlashcards)); // Print the updated flashcards in JSON format
    setShowModal(false); // Close the modal
    setNewFlashcard({ front: '', back: '' }); // Reset the input fields
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

        {/* Floating Button */}
        <button
          className="fixed bottom-10 right-10 bg-blue-500 text-white p-7 rounded-full shadow-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Add Flashcard
        </button>

        {/* Modal for Flashcard Input */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:dark:bg-neutral-900 p-5 rounded-lg shadow-lg">
              <h3 className="text-lgfont-semibold mb-4">Add Flashcard</h3>
              <input
                type="text"
                placeholder="Front"
                value={newFlashcard.front}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, front: e.target.value })}
                className="border dark:bg-neutral-800 p-2 w-full mb-2"
              />
              <input
                type="text"
                placeholder="Back"
                value={newFlashcard.back}
                onChange={(e) => setNewFlashcard({ ...newFlashcard, back: e.target.value })}
                className="border dark:bg-neutral-800  p-2 w-full mb-4"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                onClick={handleAddFlashcard}
              >
                Create
              </button>
              <button
                className="ml-2 p-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
                onClick={() => setShowModal(false)}
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
