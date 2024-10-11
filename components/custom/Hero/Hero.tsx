"use client";
import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { hero as HeroType } from "@/types";
import { DotLoader } from "react-spinners";
import { fetchHeroData } from "@/actions/pb";
import { useSession } from "next-auth/react";

const Hero = () => {
  const [heros, setHeros] = useState<HeroType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession(); // Oturum bilgilerini al

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await fetchHeroData();
        setHeros(data);
        console.log("Session Bilgisi :", session); // Session bilgilerini yazdır
        console.log("Oturum Açık mı?:", !!session); // Oturum açık mı kontrol et
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, [session]); // session değiştiğinde fetchHero çağrılır

  if (loading) {
    return <DotLoader className="bgOne textOne" loading={true} size={150} />;
  }

  return (
    <section>
      {heros.map((hero) => (
        <div
          key={hero.id}
          className="grid grid-cols-1 md:grid-cols-12 mt-16 p-4 border-b-2 border-mycolor-500"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-8 place-self-center text-left justify-self-center"
          >
            <h1 className="textOne mb-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold font-poppins">
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
            <p className="textOne text-base mb-6 lg:text-lg xl:text-xl">
              {hero.description}
              {session && ( // Oturum açılmışsa kullanıcı adını ekle
                <span className="text-mycolor-500">
                  {" "}
                  - Hoş geldiniz, {session.user?.name}! {session.user?.email}
                </span>
              )}
            </p>

            <div className="p-2 gap-4">
              <Link
                href={hero.button_url}
                className="px-6 inline-block py-3 w-full md:w-1/2 rounded-xl bg-gradient-to-r
                from-mycolor-200 to-mycolor-100 font-poppins text-lg text-white text-center mt-2 md:ml-2"
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
            <div
              className="relative rounded-full bg-gradient-to-bl from-mycolor-800 to-mycolor-300 
            w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
            >
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
                className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 
                rounded-full w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[280px] lg:h-[280px] 
                xl:w-[340px] xl:h-[340px] cursor-pointer hover:opacity-75"
              />
            </div>
          </motion.div>
        </div>
      ))}
    </section>
  );
};

export default Hero;
