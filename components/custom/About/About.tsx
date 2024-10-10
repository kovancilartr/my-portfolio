"use client";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Node.js</li>
        <li>C#</li>
        <li>NextJS</li>
        <li>TypeScript</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Bartın University</li>
        <li>Girne American University</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
        <li>Cisco</li>
      </ul>
    ),
  },
];

const About = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();
  const handleChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };
  return (
    <div className="text-white" id="about">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-2 px-4 border-2 rounded-xl border-gray-600 hover:shadow-sm hover:shadow-gray-400 duration-100 transition-all">
        <Image
          alt=""
          src="/img/2.png"
          width={400}
          height={400}
          className="rounded-2xl"
        />
        <div className="mt-4 md:mt-0 flex flex-col h-full items-center justify-center">
          <p className="text-base lg:text-lg">
            I am full stack developer with experience in building and
            maintaining web applications. I have a strong background in C# and
            JavaScript, and I am proficient in both Node.js and TypeScript. I
            have also worked with React and NextJS, and I am familiar with
            various web development frameworks and tools.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleChange("skills")}
              active={tab === "skills"}
            >
              Skill
            </TabButton>
            <TabButton
              selectTab={() => handleChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleChange("certifications")}
              active={tab === "certifications"}
            >
              Education
            </TabButton>
          </div>

          <div>{TAB_DATA.find((t) => t.id === tab)?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
