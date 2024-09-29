"use client";
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";
import { fetchWorkspace } from '@/api/api';
const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
  apiKey: "" 
});
// Sample topics data
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
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setLoading] = useState(false); // Loading state

  const [user, setUser] = useState(localStorage.getItem('user'));
  const [fetchedTopics , setFetchedTopics] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      let res = await fetchWorkspace(workspaceid);
      if (res) {
      res = res.map((topic) => {
        return {
          id: topic.title.split(' ').join('').toLowerCase(),
          title: topic.title,
          body: topic.body
        };
      });
      localStorage.setItem('topics', JSON.stringify(res));
      setFetchedTopics(res);

      }
    }
  },[]);

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

  // Auto-scroll to the bottom of the chat when messages change
  const chatEndRef = useRef(null);
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      // Add the user message to the state
      const userMessage = { sender: 'user', content: input };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
  
      // Simulate bot response with a loading bubble
      setLoading(true);
  
      // Create an array of messages for the model
      const formattedMessages = [
        ...messages,
        userMessage, // Include the new user message
      ].map((msg) => {
        return msg.sender === 'user' ? new HumanMessage(msg.content) : new AIMessage(msg.content);
      });
  
      // Check if formattedMessages is valid
      if (formattedMessages.length > 0) {
        try {
          // Invoke the model with the correctly formatted messages
          let response = await model.invoke(formattedMessages);
  
          // Delay for simulating a response
          setTimeout(() => {
            setLoading(false);
            // Add the bot's response to the messages state
            setMessages((prev) => [...prev, { sender: 'bot', content: response.content }]);
          }, 1000);
        } catch (error) {
          console.error("Error invoking model:", error);
          setLoading(false); // Stop loading on error
        }
      } else {
        console.error("No messages to send to the model");
        setLoading(false); // Stop loading if no messages
      }
    }
  };
  
  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">

        {/* Left: Table of Contents */}
        <div className="w-1/5 p-4 bg-gray-100 dark:bg-neutral-900 sticky top-0 h-screen overflow-y-auto py-20">
          <h2 className="text-xl font-semibold mb-4 px-5">Table of Contents</h2>
          <ul className="space-y-2">
            {fetchedTopics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => handleNavigation(topic.id)}
                  className={`w-full text-left p-2 rounded-lg hover:bg-gray-200 px-5 dark:hover:bg-neutral-800 ${activeSection === topic.id ? 'bg-gray-300 dark:bg-neutral-700' : ''}`}
                >
                  {topic.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Content */}
        <div className="w-4/5 py-[64px] overflow-y-auto">
          {/* Tabs */}
          <div className="flex mb-8 sticky top-[-10px] z-10 bg-white dark:bg-neutral-800 p-2 shadow-md">
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
          {activeTab === 'overview' && fetchedTopics.map((topic) => (
            <section
              key={topic.id}
              id={topic.id}
              ref={(el) => {
                if (el) sectionRefs.current[topic.id] = el;
              }}
              className="min-w-full min-h-screen flex flex-col p-8 pt-36 mb-12"
            >
              <h2 className="text-2xl font-bold mb-4">{topic.title}</h2>
              {topic.body.map((item, index) => (
                <div key={index} className="mb-6">
                  {item.type === 'text' ? (
                    <p className="mb-4">{item.content}</p>
                  ) : item.type === 'subtitle' ? (
                    <h3 className="mb-4">{item.content}</h3>
                  ) : null}
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>

      {/* Chatbot Floating Icon */}
      <div className="fixed bottom-5 right-5">
        <button
          onClick={() => setChatOpen(!isChatOpen)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          💬
        </button>
      </div>

      {/* Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-20 right-5 bg-white dark:bg-black border border-gray-600 rounded-lg shadow-lg w-96 p-4 z-50 transition-transform transform hover:scale-105">
          <h3 className="font-semibold text-lg mb-2 text-gray">Leo</h3>
          <div className="h-72 overflow-y-auto mb-2 rounded-lg p-2 bg-white dark:bg-black shadow-inner">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg transition-colors duration-300 ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {/* Loading Bubble */}
            {isLoading && (
              <div className="text-left mb-2">
                <span className="inline-block p-2 rounded-lg bg-gray-300 text-black animate-pulse">
                  Thinking...
                </span>
              </div>
            )}
            {/* Reference to scroll into view */}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow-lg flex items-center"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </ThemeProvider>
  );
}
