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
          <div className="max-w-5xl mx-auto px-8">
            <div className="flex flex-wrap">
              {
                flashcards.map((flashcard, id) => (
                  <FlashCard title={flashcard.backHTML} icon={flashcard.frontHTML}>
                    <CanvasRevealEffect
                      animationSpeed={3}
                      containerClassName="bg-slate dark:bg-black"
                      colors={[
                        [236, 72, 153],
                        [232, 121, 249],
                      ]}
                      dotSize={1} />
                  </FlashCard>

                ))
              }
            </div>
          </div>
          {/* <Card title="Sheetal is Nisha" icon={<AceternityIcon />}>
        <CanvasRevealEffect animationSpeed={5.1} containerClassName="bg-emerald-900" />
           </Card> */}

        </div>
      </div>
    </ThemeProvider>
  );
}
