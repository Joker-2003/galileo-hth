"use client";
import Link from "next/link"; // Import Link for navigation
import { useState } from "react";

const Table = ({ workspaces }) => {
  // const [workspaces, setWorkspaces] = useState(workspaces);

  return (
    <div className="overflow-x-auto mt-20 flex justify-center">
      <table className="w-4/5 bg-white dark:bg-black text-left table-auto border-collapse rounded-lg overflow-hidden shadow-md">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center rounded-tl-lg rounded-tr-lg">
              S. No.
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
            {/* <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Total Lessons
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center">
              Lessons Completed
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-gray-300 text-center rounded-tr-lg rounded-br-lg">
              Progress
            </th> */}
          </tr>
        </thead>
        <tbody>
          {workspaces.map((workspace, index) => {
            // const progress = (workspace.lessonsCompleted / workspace.totalLessons) * 100;
            return (

              <tr className="hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer">

                <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
                  <Link key={index} href={`/dashboard/${workspace.workspace_id}/#`}>
                    {index + 1}
                  </Link>
                </td>
                <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
                  <Link key={index} href={`/dashboard/${workspace.workspace_id}/#`}>
                    {workspace.title}
                  </Link>
                </td>
                <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
                  <Link key={index} href={`/dashboard/${workspaceworkspace_id}/#`}>
                    {localStorage.getItem("user").name}
                  </Link>
                </td>
                <td className="px-6 py-3 border-b border-gray-200 dark:border-neutral-700 text-center">
                  <Link key={index} href={`/dashboard/${workspace.workspace_id}/#`}>
                    {workspace.created_at}
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
