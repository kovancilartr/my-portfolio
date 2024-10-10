"use client";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import ProjectTag from "./ProjectTag";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";
import { projects } from "@/types";

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
    const abortController = new AbortController(); // AbortController oluştur
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/pb/projects", {
          method: "GET",
          signal: abortController.signal,
        }); // İstek için abortController ekle
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // HTTP hatası kontrolü
        }
        const data = await response.json();
        setProjects(data);
        console.log(data);
      } catch (error: unknown) {
        // Hata türünü 'unknown' olarak belirtiyoruz
        if (error instanceof Error && error.name !== "AbortError") {
          // Hata nesnesi kontrolü
          console.error("Error fetching projects:", error); // Sadece abort hatası dışındaki hataları göster
        }
      }
    };

    fetchProjects(); // Fonksiyonu çağır

    return () => {
      abortController.abort(); // Bileşen unmount olduğunda isteği iptal et
    };
  }, []);
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
