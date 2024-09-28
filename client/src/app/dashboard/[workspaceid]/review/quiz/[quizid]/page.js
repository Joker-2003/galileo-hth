"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkspaceNavbar from "@/components/built/workspacenavbar";
import { ThemeProvider } from "@/components/context/themecontext";
import { Scatter } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const quizTitle = "Quiz Title 1";
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
      history: [{
        correct: false,
        timestamp: "2022-10-10T12:00:00Z"
      },
      {
        correct: false,
        timestamp: "2022-10-11T12:00:00Z"
      },
      {
        correct: false,
        timestamp: "2022-10-12T12:00:00Z"
      }]
    },
    {
      question: "Who is the Prime Minister of Canada?",
      id: "124",
      options: [
        { id: "1", text: "Justin Trudeau" },
        { id: "2", text: "Joe Biden" },
        { id: "3", text: "Emmanuel Macron" },
        { id: "4", text: "Angela Merkel" },
      ],
      history: [{
        correct: true,
        timestamp: "2022-10-10T12:00:00Z"
      },
      {
        correct: false,
        timestamp: "2022-10-11T12:00:00Z"
      },
      {
        correct: true,
        timestamp: "2022-10-12T12:00:00Z"
      }]

    },
    {
      question: "Where is the Eiffel Tower located?",
      id: "125",
      options: [
        { id: "1", text: "London" },
        { id: "2", text: "Paris" },
        { id: "3", text: "New York" },
        { id: "4", text: "Rome" },
      ],
      history: [{
        correct: false,
        timestamp: "2022-10-10T12:00:00Z"
      },
      {
        correct: false,
        timestamp: "2022-10-11T12:00:00Z"
      },
      {
        correct: true,
        timestamp: "2022-10-12T12:00:00Z"
      }]
    },
  ];

  const mockPreviousAttempts = [{
    timestamp: "2022-10-10T12:00:00Z",
    data: 3,
  },
  {
    timestamp: "2022-10-11T12:00:00Z",
    data: 2,
  },
  {
    timestamp: "2022-10-12T12:00:00Z",
    data: 0,
  },
  ]; // Mock data for previous scores

  const handleAnswerChange = (questionId, optionId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
    setErrorMessage(""); // Clear error message on change
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length !== questions.length) {
      setErrorMessage("Please answer all questions before submitting.");
      return;
    }

    setQuizSubmitted(true);

    const mockFeedback = {
      "123": { correct: true, explanation: "Joe Biden is the President of the United States." },
      "124": { correct: true, explanation: "Justin Trudeau is the Prime Minister of Canada." },
      "125": { correct: false, explanation: "The Eiffel Tower is located in Paris." },
    };

    setFeedback(mockFeedback);

    const correctAnswersCount = Object.keys(mockFeedback).filter(
      (id) => mockFeedback[id].correct
    ).length;
    setScore(correctAnswersCount);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "overview") {
      router.push(`/dashboard/${workspaceid}/introduction`);
    } else {
      router.push(`/dashboard/${workspaceid}/${tab}`);
    }
  };

  const goToQuizzes = () => {
    router.push(`/dashboard/${workspaceid}/quizzes`);
  };

  // Data for Bar Chart
  const chartData = {
    datasets: [
      {
        label: 'Previous Attempts',
        data: mockPreviousAttempts.map((attempt) => ({
          x: new Date(attempt.timestamp), // Use the timestamp on the x-axis
          y: attempt.data, // Use the score on the y-axis
        })),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        showLine: true,
        tension: 0.3, // Smooth the line
      },
    ],
  };





  const MultipleCharts = () => (
    <div>
      {questions.map((q, index) => (
        <div key={q.id}>
          <h3>{q.question}</h3>
          <Line
            data={{
              datasets: [{
                label: `Answers`,
                data: q.history.map((attempt) => ({
                  x: new Date(attempt.timestamp), // Use the timestamp on the x-axis
                  y: attempt.correct ? 1 : 0, // Correct (1) or incorrect (0) on the y-axis
                })),
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                showLine: true,
                tension: 0.3, // Smooth the line
              }],
            }}
            options={{
              scales: {
                x: {
                  type: 'time', // Use time scale for x-axis
                  time: {
                    unit: 'day', // You can adjust the unit to your needs
                  },
                  title: {
                    display: true,
                    text: 'Timestamp',
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Correct (1) / Incorrect (0)',
                  },
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">
        {/* Left: Quiz Content */}
        <div className="w-3/4 py-[64px] overflow-y-auto">
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
          <div className="max-w-5xl mx-auto px-16">
            <h1 className="text-2xl font-semibold mb-8">{quizTitle}</h1>
            {questions.map((q, index) => (
              <div key={q.id} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">
                  {index + 1}. {q.question}
                </h2>
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

            {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Submit Quiz
              </button>
            ) : (
              <div className="mt-8">
                <p className="text-lg font-semibold">
                  You scored {score}/{questions.length}.
                </p>
                <button
                  onClick={goToQuizzes}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Go to Quizzes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="w-1/4 py-[64px] px-8 bg-gray-100 dark:bg-neutral-800 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Quiz Progress</h2>
          <ul className="list-disc ml-4">
            {questions.map((q, index) => (
              <li key={q.id} className={`mb-2 ${selectedAnswers[q.id] ? "text-green-600" : "text-gray-600"}`}>
                Question {index + 1}: {selectedAnswers[q.id] ? "Answered" : "Not Answered"}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quiz Tips</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Take your time and review the questions carefully. Remember, accuracy is key!
            </p>
          </div>

          {/* Chart for Previous Attempts */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Your History</h2>
       
              {/* Scatter Plot */}
              <Line data={chartData}
                options={{
                  scales: {
                    x: {
                      type: 'time', // Use time scale for x-axis
                      time: {
                        unit: 'day', // You can adjust the unit to your needs
                      },
                      title: {
                        display: true,
                        text: 'Timestamp',
                      },
                    },
                    y: {
                      beginAtZero: true,
                      max: 3,
                      title: {
                        display: true,
                        text: 'Score',
                      },
                    },
                  },
                }} />
    
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 ">Question Wise History</h2>

            {/* Chart for Previous Attempts different hcarts for different questions */}
            <MultipleCharts />
          </div>

        </div>
      </div>
    </ThemeProvider>
  );
}
