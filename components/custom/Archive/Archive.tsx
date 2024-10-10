"use client";
import React from "react";
import dynamic from "next/dynamic";
import { FiActivity, FiAward, FiClock, FiUsers } from "react-icons/fi";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const archive = [
  {
    metric: "Projects",
    value: "100",
    postfix: "+",
    icon: FiActivity,
  },
  {
    prefix: "~",
    metric: "Users",
    value: "100,000",
    icon: FiUsers,
  },
  {
    metric: "Awards",
    value: "7",
    icon: FiAward,
  },
  {
    metric: "Years",
    value: "5",
    icon: FiClock,
  },
];

const Archive = () => {
  return (
    <div className="py-4 px-48 mt-0 md:mt-5 lg:mt-12 xl:gap-16">
      <div className="py-6 flex flex-col md:flex-row items-center justify-between">
        {archive.map((arc, index) => {
          const IconComponent = arc.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 md:my-0"
            >
              <div className="flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-white" />

                <h2 className="text-white font-bold text-4xl flex flex-row">
                  {arc.prefix}
                  <AnimatedNumbers
                    includeComma
                    transitions={(index) => ({
                      type: "spring",
                      duration: index + 0.3,
                    })}
                    animateToNumber={parseInt(arc.value)}
                    fontStyle={{
                      fontSize: 40,
                      color: "white",
                    }}
                  />
                  {arc.postfix}
                </h2>
              </div>
              <p className="text-white text-base">{arc.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;
