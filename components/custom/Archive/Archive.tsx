"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FiActivity, FiAward, FiClock, FiUsers } from "react-icons/fi";
import { archive as ArchiveType } from "@/types";

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
  const [error, setError] = useState<string | null>(null); // Hata durumu

  useEffect(() => {
    const abortController = new AbortController();
    const fetchArchive = async () => {
      try {
        const response = await fetch("/api/pb/archive", {
          method: "GET",
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArchive(data);
        console.log("New Archive", data);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching projects:", error);
          setError(error.message); // Hata mesajını ayarla
        }
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Hata mesajını göster
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
                {IconComponent && (
                  <IconComponent className="w-8 h-8 text-white" />
                )}{" "}
                {/* İkon bileşenini render et */}
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
