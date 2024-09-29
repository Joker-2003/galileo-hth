"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkspaceNavbar from "@/components/built/workspacenavbar";
import { ThemeProvider } from "@/components/context/themecontext";
import { FlashcardArray } from "react-quizlet-flashcard";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import the date adapter

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid } = useParams();

  const [activeTab, setActiveTab] = useState("review");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const flashcards = [
    {
      id: "123",
      frontHTML: <>What is the capital of France?</>,
      backHTML: <>Paris</>
    },
    {
      id: "456",
      frontHTML: <>What is the capital of Germany?</>,
      backHTML: <>Berlin</>
    },
    {
      id: "789",
      frontHTML: <>What is the capital of Italy?</>,
      backHTML: <>Rome</>
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "overview") {
      router.push(`/dashboard/${workspaceid}/introduction`);
    } else {
      router.push(`/dashboard/${workspaceid}/${tab}`);
    }
  };

  const handleNextCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrevCard = () => {
    setFlipped(false);
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      handleNextCard();
    } else if (e.key === "ArrowLeft") {
      handlePrevCard();
    } else if (e.key === " ") { // Spacebar to flip
      setFlipped(!flipped);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [flipped]);

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">
        {/* Left: Quiz Content */}
        <div className="w-screen py-[64px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex px-8 mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-900 p-2 shadow-md">
            <button
              onClick={() => handleTabChange("overview")}
              className={`p-4 ${activeTab === "overview" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Overview
            </button>
            <button
              onClick={() => handleTabChange("review")}
              className={`p-4 ${activeTab === "review" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Review
            </button>
            <button
              onClick={() => handleTabChange("mindmap")}
              className={`p-4 ${activeTab === "mindmap" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
            >
              Mindmap
            </button>
          </div>

          {/* Flashcard */}
          <div className="flex justify-center items-center h-[70vh]">
            <div className="w-[300px] md:w-[500px] h-[400px] md:h-[600px] perspective">
              <div
                className={`relative w-full h-full text-center transition-transform duration-700 ease-in-out transform ${flipped ? "rotate-y-180" : ""}`}
                onClick={() => setFlipped(!flipped)}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-blue-200 p-10 flex flex-col justify-center items-center text-2xl font-bold">
                  {flashcards[currentCardIndex].frontHTML}
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full backface-hidden rounded-lg shadow-lg bg-blue-500 p-10 flex flex-col justify-center items-center text-white text-2xl font-bold transform rotate-y-180">
                  {flashcards[currentCardIndex].backHTML}
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePrevCard}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Previous
            </button>
            <button
              onClick={handleNextCard}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
