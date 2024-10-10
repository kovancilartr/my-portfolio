"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { hero as HeroType } from "@/types";

const Hero = () => {
  const [heroes, setHeroes] = useState<HeroType[]>([]); // 'hero' yerine 'heroes' kullanıldı
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Hata durumu

  useEffect(() => {
    const abortController = new AbortController();
    const fetchHero = async () => {
      try {
        const response = await fetch("/api/pb/hero", {
          method: "GET",
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHeroes(data);
        console.log("New Hero", data);
      } catch (error: unknown) {
        if (error instanceof Error && error.name !== "AbortError") {
          console.error("Error fetching projects:", error);
          setError(error.message); // Hata mesajını ayarla
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHero();

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
    <section>
      {heroes.map((hero) => (
        <div
          key={hero.id} // Benzersiz bir anahtar kullanın
          className="grid grid-cols-1 md:grid-cols-12 mt-16 p-4 border-b-2 border-mycolor-500"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-8 place-self-center text-left justify-self-center"
          >
            <h1 className="text-white mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold font-poppins">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mycolor-200 to-mycolor-100">
                {hero.title}
              </span>
              <div className="h-2"></div>
              <TypeAnimation
                sequence={[
                  hero.subtitle1,
                  1000,
                  hero.subtitle2,
                  1000,
                  ...(hero.subtitle3 ? [hero.subtitle3, 1000] : []),
                ].filter(Boolean)}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="text-white text-base mb-6 lg:text-lg xl:text-xl">
              {hero.description}
            </p>

            <div className="p-2 gap-4">
              <Link
                href={hero.button_url}
                className="px-6 inline-block py-3 w-full md:w-fit rounded-full bg-gradient-to-r from-mycolor-200 to-mycolor-100 text-white text-center mt-2 md:ml-2"
              >
                {hero.button_title}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-4 place-self-center mt-4 md:mt-0"
          >
            <div className="relative rounded-full bg-gradient-to-bl from-mycolor-800 to-mycolor-300 w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]">
              <Image
                alt=""
                src={
                  "https://kovancilar.pockethost.io/api/files/" +
                  hero.collectionId +
                  "/" +
                  hero.id +
                  "/" +
                  hero.image
                }
                width={370}
                height={370}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-full w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] xl:w-[340px] xl:h-[340px] cursor-pointer hover:opacity-75"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
