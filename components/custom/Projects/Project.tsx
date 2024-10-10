"use client";
import { useInView } from "framer-motion";
import React, { useRef, useState } from "react";
import ProjectTag from "./ProjectTag";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Coffee Website",
    description: "Project 1 description",
    image: "/projects/1.png",
    tag: ["All", "Frontend"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "Camp Website",
    description: "Project 2 description",
    image: "/projects/2.png",
    tag: ["All", "Frontend"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Next Auth V5",
    description: "Project 3 description",
    image: "/projects/3.png",
    tag: ["All", "FullStack"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Next js 14",
    description: "Project 4 description",
    image: "/projects/4.png",
    tag: ["All", "Frontend"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "Ecommerce Nextjs",
    description: "Authentication and CRUD operations",
    image: "/projects/5.png",
    tag: ["All", "FullStack"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Twitch Clone",
    description: "Project 5 description",
    image: "/projects/8.png",
    tag: ["All", "FullStack"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const Project = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);

  const isInview = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filtredProject = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <section id="projects" className="mb-12">
      <h2
        className="text-center text-4xl text-mycolor-700 font-semibold
        mt-4 mb-2 lg:mt-8 lg:mb-4"
      >
        My Projects
      </h2>

      <div
        className="text-white flex flex-row justify-center items-center
        gap-5 py-6"
      >
        <ProjectTag
          name="All"
          onClick={handleTagChange}
          isSelected={tag === "All"}
        />

        <ProjectTag
          name="FullStack"
          onClick={handleTagChange}
          isSelected={tag === "FullStack"}
        />

        <ProjectTag
          name="Frontend"
          onClick={handleTagChange}
          isSelected={tag === "Frontend"}
        />
      </div>
      <ul ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10">
        {filtredProject.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInview ? "animate" : "inital"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              description={project.description}
              gitUrl={project.gitUrl}
              image={project.image}
              previewUrl={project.previewUrl}
              title={project.title}
              key={project.id}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Project;
