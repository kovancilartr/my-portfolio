"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FiActivity, FiAward, FiClock, FiUsers } from "react-icons/fi";
import { archive as ArchiveType } from "@/types";
import { fetchArchiveData } from "@/actions/pb";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const iconMap: Record<string, React.ElementType> = {
  FiActivity: FiActivity,
  FiAward: FiAward,
  FiClock: FiClock,
  FiUsers: FiUsers,
};

const Archive = () => {
  const [archive, setArchive] = useState<ArchiveType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const data = await fetchArchiveData();
        setArchive(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchArchive();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-4 px-48 mt-0 md:mt-5 lg:mt-12 xl:gap-16">
      <div className="py-6 flex flex-col md:flex-row items-center justify-between">
        {archive.map((arc, index) => {
          const IconComponent = iconMap[arc.icon_code]; // Dinamik olarak ikon bileşenini al
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 md:my-0"
            >
              <div className="flex items-center justify-center">
                {IconComponent && <IconComponent className="w-8 h-8 textOne" />}{" "}
                {/* İkon bileşenini render et */}
                <h2 className="textOne font-bold text-4xl flex flex-row">
                  {arc.prefix}
                  <AnimatedNumbers
                    className="textOne"
                    includeComma
                    transitions={(index) => ({
                      type: "spring",
                      duration: index + 0.3,
                    })}
                    animateToNumber={parseInt(arc.value)}
                    fontStyle={{
                      fontSize: 40,
                    }}
                  />
                  {arc.postfix}
                </h2>
              </div>
              <p className="textOne text-base">{arc.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Archive;
