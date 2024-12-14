"use client";

import React, { useState, useMemo } from "react";
import { projects } from "@/app/dashboard/_utils/project-data";
import SearchBar from "@/app/dashboard/_components/searchbar";
import ProjectCard from "@/app/dashboard/_components/project-card";
import { useRouter } from "next/navigation";

const ProjectsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const filteredProjects = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return projects;
    return projects.filter((project) => {
      const searchableContent = [
        project.name,
        project.description,
        ...project.tags,
      ].join(" ").toLowerCase();
      const queryWords = query.split(" ");
      return queryWords.every((word) => searchableContent.includes(word));
    });
  }, [searchQuery]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/dashboard/projects/${projectId}`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-inter">
      <div className="rounded-lg flex-col justify-center items-start inline-flex self-stretch text-lg font-semibold font-inter leading-tight">
        Ecosystem projects
      </div>
      <div>
        <SearchBar
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, description, or tags..."
        />
      </div>

      {filteredProjects.length === 0 && searchQuery && (
        <div className="text-center py-8 text-gray-500">
          No projects found matching "{searchQuery}"
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => handleProjectClick(project.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;