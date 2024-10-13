import { pb } from "@/lib/pb";

export const fetchHeroData = async () => {
  const response = await fetch("/api/pb/hero");
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  const data = await response.json();
  return data;
};

export const fetchArchiveData = async () => {
  const response = await fetch("/api/pb/archive");
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  const data = await response.json();
  return data;
};

export const fetchAboutData = async () => {
  const response = await fetch("/api/pb/about");
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  const data = await response.json();
  return {
    about: data.about,
    about_sub: data.about_sub,
  };
};

export const fetchProjectData = async () => {
  const response = await fetch("/api/pb/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch hero data");
  }
  const data = await response.json();
  return data;
};

export const createProjectData = async (projectData: {
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  tags: string[];
  image: File | null;
}) => {
  try {
    const record = await pb.collection("projects").create(projectData);
    return record;
  } catch (error) {
    console.error("Error creating project data:", error);
    throw error;
  }
};
export const updateProjectData = async (projectData: {
  projectId: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  tags: string[];
  image: File | null;
}) => {
  try {
    const record = await pb
      .collection("projects")
      .update(projectData.projectId, projectData);
    return record;
  } catch (error) {
    console.error("Error creating project data:", error);
    throw error;
  }
};
export const deleteProjectData = async (projectId: string) => {
  try {
    const record = await pb.collection("projects").delete(projectId);
    return record;
  } catch (error) {
    console.error("Error creating project data:", error);
    throw error;
  }
};
