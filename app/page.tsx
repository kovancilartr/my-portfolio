import About from "@/components/custom/About/About";
import Archive from "@/components/custom/Archive/Archive";
import Contact from "@/components/custom/Contact/Contact";
import Hero from "@/components/custom/Hero/Hero";
import Navbar from "@/components/custom/Navbar/Navbar";
import Project from "@/components/custom/Projects/Project";
import { SessionProvider } from "next-auth/react";

const NavLinks = [
  {
    name: "Ana Sayfa",
    path: "/",
  },
  {
    name: "Hakkımda",
    path: "#about",
  },
  {
    name: "Projeler",
    path: "#projects",
  },
  {
    name: "İletişim",
    path: "#contact",
  },
  {
    name: "Giriş",
    path: "/auth/login",
  },
];
export default function Home() {
  return (
    <>
      <SessionProvider>
        <main className="flex min-h-screen flex-col bgOne">
          <Navbar navLinks={NavLinks} logoutProps={true} />
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
