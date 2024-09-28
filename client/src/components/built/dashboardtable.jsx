"use client";
import Link from "next/link"; // Import Link for navigation
import { useState } from "react";

const Table = () => {
  const [workspaces, setWorkspaces] = useState([
    {
      sn: 1,
      workspaceId: 1234,
      workspaceName: "Frontend Development",
      createdBy: "John Doe",
      createdAt: "2024-09-15",
      totalLessons: 12,
      lessonsCompleted: 5,
    },
    {
      sn: 2,
      workspaceId: 5678,
      workspaceName: "Machine Learning Basics",
      createdBy: "Jane Smith",
      createdAt: "2024-09-10",
      totalLessons: 20,
      lessonsCompleted: 15,
    },
    // Add more workspaces here
  ]);

  return (
    <div className="overflow-x-auto mt-20 flex justify-center">
      <table className="w-4/5 bg-white dark:bg-black text-left table-auto border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center rounded-tl-lg rounded-tr-lg">
              SN No.
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Workspace Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Created By
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Created At
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Total Lessons
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Lessons Completed
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center rounded-tr-lg rounded-br-lg">
              Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {workspaces.map((workspace, index) => {
            const progress = (workspace.lessonsCompleted / workspace.totalLessons) * 100;
            return (
            
                <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">
				
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.sn}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.workspaceName}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.createdBy}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.createdAt}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.totalLessons}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    {workspace.lessonsCompleted}
					</Link>
                  </td>
                  <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
				  <Link key={index} href={`/dashboard/${workspace.workspaceId}/#`}>
                    <div className="relative w-full h-4 bg-gray-200 dark:bg-neutral-700 rounded">
                      <div
                        className="absolute h-4 bg-blue-500 dark:bg-blue-400 rounded"
                        style={{ width: `${progress}%` }}
                      ></div>
                      {/* Uncomment this line to display percentage */}
                      {/* <span className="absolute right-0 text-sm text-gray-600 dark:text-gray-400 pr-1">
                        {Math.round(progress)}%
                      </span> */}
                    </div>
					</Link>
                  </td>
			
                </tr>
       
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
