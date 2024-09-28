"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkspaceNavbar from "@/components/built/workspacenavbar";
import { ThemeProvider } from "@/components/context/themecontext";

export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceid } = useParams();

  const [activeTab, setActiveTab] = useState("review");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null); // Mock feedback data

  const questions = [
    {
      question: "Who is Joe Biden?",
      id: "123",
      options: [
        { id: "1", text: "President of the United States" },
        { id: "2", text: "President of Canada" },
        { id: "3", text: "President of Mexico" },
        { id: "4", text: "President of Russia" },
      ],
    },
    {
      question: "Who is Joe Biden?",
      id: "123",
      options: [
        { id: "1", text: "President of the United States" },
        { id: "2", text: "President of Canada" },
        { id: "3", text: "President of Mexico" },
        { id: "4", text: "President of Russia" },
      ],
    },
    {
      question: "Who is Joe Biden?",
      id: "123",
      options: [
        { id: "1", text: "President of the United States" },
        { id: "2", text: "President of Canada" },
        { id: "3", text: "President of Mexico" },
        { id: "4", text: "President of Russia" },
      ],
    },
    {
      question: "Who is Joe Biden?",
      id: "123",
      options: [
        { id: "1", text: "President of the United States" },
        { id: "2", text: "President of Canada" },
        { id: "3", text: "President of Mexico" },
        { id: "4", text: "President of Russia" },
      ],
    },
  ];

  const handleAnswerChange = (questionId, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);

    // Mock feedback (this would come from the backend)
    const mockFeedback = {
      "123": {
        correct: true,
        explanation: "Joe Biden is the President of the United States.",
      },
    };

    setFeedback(mockFeedback);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "overview") {
      router.push(`/dashboard/${workspaceid}/introduction`);
    } else {
      router.push(`/dashboard/${workspaceid}/${tab}`);
    }
  };

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">
        {/* Right: Content */}
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

          {/* Quiz Questions */}
          <div className="max-w-5xl mx-auto px-8">
            {questions.map((q,index) => (
              <div key={q.id} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{++index}. {q.question}</h2>
                {q.options.map((option) => (
                  <div key={option.id} className="mb-2">
                    <input
                      type="radio"
                      id={`${q.id}-${option.id}`}
                      name={q.id}
                      value={option.id}
                      checked={selectedAnswers[q.id] === option.id}
                      onChange={() => handleAnswerChange(q.id, option.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`${q.id}-${option.id}`}>{option.text}</label>
                  </div>
                ))}

                {/* Display feedback after submission */}
                {quizSubmitted && feedback && feedback[q.id] && (
                  <div className="mt-4">
                    {feedback[q.id].correct ? (
                      <p className="text-green-600">Correct! {feedback[q.id].explanation}</p>
                    ) : (
                      <p className="text-red-600">Incorrect. {feedback[q.id].explanation}</p>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Submit Button */}
            {!quizSubmitted && (
              <button
                onClick={handleSubmitQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
