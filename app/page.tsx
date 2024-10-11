import About from "@/components/custom/About/About";
import Archive from "@/components/custom/Archive/Archive";
import Contact from "@/components/custom/Contact/Contact";
import Hero from "@/components/custom/Hero/Hero";
import Navbar from "@/components/custom/Navbar/Navbar";
import Project from "@/components/custom/Projects/Project";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <main className="flex min-h-screen flex-col bgOne">
          <Navbar />
          <div className="container mx-auto">
            <Hero />
            <Archive />
            <About />
            <Project />
            <Contact />
          </div>
        </main>
      </SessionProvider>
    </>
  );
}
