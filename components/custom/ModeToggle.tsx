import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false); // Bileşenin yüklendiğini kontrol etmek için

  useEffect(() => {
    setMounted(true); // Bileşen yüklendiğinde mounted durumunu true yap
  }, []);

  if (!mounted) return null; // Bileşen henüz yüklenmediyse hiçbir şey gösterme

  const sunClass = `h-[1.2rem] w-[1.2rem] ${theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-all`;
  const moonClass = `absolute h-[1.2rem] w-[1.2rem] ${theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"} transition-all`;

  return (
    <Button variant="link" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Sun className={sunClass} />
      <Moon className={moonClass} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}