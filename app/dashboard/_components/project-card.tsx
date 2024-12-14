// _components/ProjectCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Award, TargetIcon } from "lucide-react";
import Image from "next/image";

export interface Project {
  id: string;
  name: string;
  description: string;
  logo: string;
  verified: boolean;
  tags: string[];
  users24h: number;
  totalQuests: number;
  tvl: number;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card
      className="flex flex-col bg-gray-100 dark:bg-[#121212] cursor-pointer transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center space-x-1">
              <CardTitle className="text-xl text-yellow-500 font-inter dark:text-[#FAF186] self-stretch leading-tight">
                {project.name}
              </CardTitle>
              {project.verified && (
                <Image
                  src="/projects/check.svg"
                  alt="check"
                  width={20}
                  height={20}
                />
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="text-xs bg-[#9F9FF8] text-black dark:bg-[#92BFFF] px-2 py-1 rounded-md"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src={project.logo}
              alt={project.name}
              className="rounded-xl"
              width={50}
              height={50}
            />
            <CardDescription>{project.description}</CardDescription>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                {project.users24h.toLocaleString()} users / 24h
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{project.totalQuests} quests</span>
            </div>
            <div className="flex items-center space-x-2">
              <TargetIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm">${project.tvl.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
