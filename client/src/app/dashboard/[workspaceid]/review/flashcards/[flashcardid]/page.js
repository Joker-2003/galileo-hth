"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkspaceNavbar from "@/components/built/workspacenavbar";
import { ThemeProvider } from "@/components/context/themecontext";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { FlashCard } from "@/components/built/flashcard";

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
        {/* Quiz Content */}
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

          {/* Flashcard with Next/Prev Navigation */}
          <div className="max-w-xl mx-auto flex flex-col items-center space-y-4">
            <div className="relative w-full h-64">
              <div
                className={`absolute w-full h-full transform transition-transform duration-500 ${flipped ? 'rotate-y-180' : ''}`}
                onClick={() => setFlipped(!flipped)}
              >
                <FlashCard title={flashcards[currentCardIndex].backHTML} icon={flashcards[currentCardIndex].frontHTML}>
                  <CanvasRevealEffect
                    animationSpeed={3}
                    containerClassName="bg-slate dark:bg-black"
                    colors={[
                      [236, 72, 153],
                      [232, 121, 249],
                    ]}
                    dotSize={1} 
                  />
                </FlashCard>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full">
              <button
                className="p-2 text-black dark:text-white rounded-full hover:bg-gray-800 hover:text-white"
                onClick={handlePrevCard}
              >
                {"<"}
              </button>
              <button
                className="p-2 text-black dark:text-white  rounded-full hover:bg-gray-800 hover:text-white"
                onClick={handleNextCard}
              >
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
