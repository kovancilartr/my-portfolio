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
