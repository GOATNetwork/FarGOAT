"use client";

import React from "react";
import { projects } from "@/app/dashboard/_utils/project-data";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const project = projects.find((p) => p.id === resolvedParams.projectId);

  if (!project) {
    return (
      <div className="p-8 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <button
            onClick={() => router.back()}
            className="mt-4 text-blue-500 hover:underline flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-8 text-gray-500 hover:text-gray-700 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </button>

      <div className="flex items-start gap-8 mb-8">
        <Image
          src={project.logo}
          alt={project.name}
          width={100}
          height={100}
          className="rounded-xl"
        />
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-yellow-500 dark:text-[#FAF186]">
              {project.name}
            </h1>
            {project.verified && (
              <Image
                src="/projects/check.svg"
                alt="verified"
                width={24}
                height={24}
              />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map((tag) => (
          <div
            key={tag}
            className="text-sm bg-[#9F9FF8] text-black dark:bg-[#92BFFF] px-3 py-1 rounded-md"
          >
            {tag}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-100 dark:bg-[#121212] p-6 rounded-xl">
          <h3 className="text-sm text-gray-500 mb-2">Users (24h)</h3>
          <p className="text-2xl font-bold">
            {project.users24h.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-[#121212] p-6 rounded-xl">
          <h3 className="text-sm text-gray-500 mb-2">Total Quests</h3>
          <p className="text-2xl font-bold">{project.totalQuests}</p>
        </div>
        <div className="bg-gray-100 dark:bg-[#121212] p-6 rounded-xl">
          <h3 className="text-sm text-gray-500 mb-2">TVL</h3>
          <p className="text-2xl font-bold">${project.tvl.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;