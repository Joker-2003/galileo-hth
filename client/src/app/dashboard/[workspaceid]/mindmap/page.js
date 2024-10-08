
"use client";
import WorkspaceNavbar from '@/components/built/workspacenavbar';
import { ThemeProvider } from '@/components/context/themecontext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Mermaid from './Mermaid';
const DATA = `mindmap
	root("Kafka")
                ("Distributed Streaming Platform")
                        ::icon(fa fa-cloud)
                ("Distributed")
                        ::icon(fa fa-server)
                                ("Cluster of nodes across datacenters")
                                ("Scalable, available, fault-tolerant")
                ("Streaming Platform")
                        ::icon(fa fa-stream)
                                ("Stores data as continuous records")
                ("Commit Log")
                        ::icon(fa fa-file-alt)
                                ("Appends data to a stream of records")
                                ("Replay or read from any point in time")
`;


const topics = localStorage.getItem("topics");

export default function WorkspacePage() {


  const router = useRouter();
  const { workspaceid, topicid } = useParams();

  const [activeSection, setActiveSection] = useState(topicid || '');
  const [activeTab, setActiveTab] = useState('mindmap');
  const sectionRefs = useRef({});

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
        
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

  return (
    <ThemeProvider>
      <WorkspaceNavbar workspaceid={workspaceid} />
      <div className="flex h-screen">

        {/* Left: Table of Contents */}
        <div className="w-1/5 p-4 bg-gray-100 dark:bg-neutral-900 sticky top-0 h-screen overflow-y-auto py-20">
          <h2 className="text-xl font-semibold mb-4 px-5" >Table of Contents</h2>
          <ul className="space-y-2">
            {topics.map((topic) => (
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

<Mermaid key={0} chart={DATA} />
        
        </div>
      </div>
    </ThemeProvider>
  );
}




