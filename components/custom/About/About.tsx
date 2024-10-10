"use client";
import Image from "next/image";
import React, { useEffect, useState, useTransition } from "react";
import TabButton from "./TabButton";
import { about as AboutType } from "@/types";
import { about_sub as AboutSubType } from "@/types";

const About = () => {
  const [aboutData, setAboutData] = useState<AboutType[]>([]);
  const [aboutSubData, setAboutSubData] = useState<AboutSubType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>("skills"); // Seçilen tab için durum değişkeni

  const handleChange = (id_title: string) => {
    setSelectedTab(id_title); // Seçilen tabın id_title bilgisini ayarla
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchAbout = async () => {
      try {
        const response = await fetch("/api/pb/about", {
          method: "GET",
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAboutData(data.about);
        setAboutSubData(data.about_sub);
        console.log("New About", data);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching projects:", error);
          setError(error.message); // Hata mesajını ayarla
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();

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
    <div className="text-white" id="about">
      {aboutSubData
        .filter((subdata) => subdata.status) // Sadece status'u true olanları filtrele
        .map((subdata, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-2 px-4 border-2 rounded-xl border-gray-600 hover:shadow-sm hover:shadow-gray-400 duration-100 transition-all"
          >
            <Image
              alt=""
              src={
                "https://kovancilar.pockethost.io/api/files/" +
                subdata.collectionId +
                "/" +
                subdata.id +
                "/" +
                subdata.image
              }
              width={400}
              height={400}
              className="rounded-2xl"
            />
            <div className="mt-4 md:mt-0 flex flex-col h-full items-center justify-center">
              <p className="text-base lg:text-lg">{subdata.description}</p>
              <div className="flex flex-row justify-start mt-8">
                {aboutData.map((tab, index) => (
                  <TabButton
                    key={index}
                    selectTab={() => handleChange(tab.id_title)} // Butona tıklandığında handleChange'i çağır
                    active={tab.id_title === selectedTab} // Seçilen tabı kontrol et
                  >
                    {tab.title}
                  </TabButton>
                ))}
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html:
                    aboutData.find((t) => t.id_title === selectedTab)
                      ?.content || "",
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default About;
