"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ProjectTag from "./ProjectTag";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projects } from "@/types";
import { fetchProjectData } from "@/actions/pb";

const Project = () => {
  const [projects, setProjects] = useState<projects[]>([]);
  const [tag, setTag] = useState("All");
  const ref = useRef(null);

  const isInview = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filtredProject = projects.filter((project) =>
    project.tags.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await fetchProjectData();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section id="projects" className="mb-12">
      <h2
        className="text-center text-4xl textOne font-semibold
        mt-4 mb-2 lg:mt-8 lg:mb-4"
      >
        Projelerim
      </h2>

      <div
        className="textOne flex flex-row justify-center items-center
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
              collectionId={project.collectionId}
              id={project.id}
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
