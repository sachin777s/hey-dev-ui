import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState, useEffect, useMemo } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { MdComputer } from "react-icons/md";

const ThemeChanger = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || null;
    }
    return null;
  });

  // System theme detection
  const systemThemeMedia = useMemo(
    () => window.matchMedia("(prefers-color-scheme: dark)"),
    []
  );

  const setDarkMode = () => {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  };

  const setLightMode = () => {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
    setTheme("light");
  };

  const setSystemMode = () => {
    document.body.classList.remove("dark", "light");
    localStorage.removeItem("theme");
    const isDarkMode = systemThemeMedia.matches;
    document.body.classList.add(isDarkMode ? "dark" : "light");
    setTheme(null);
  };

  // Handle system theme changes
  useEffect(() => {
    const handleSystemThemeChange = (e) => {
      if (!theme) {
        document.body.classList.remove("dark", "light");
        document.body.classList.add(e.matches ? "dark" : "light");
      }
    };

    systemThemeMedia.addEventListener("change", handleSystemThemeChange);
    return () =>
      systemThemeMedia.removeEventListener("change", handleSystemThemeChange);
  }, [theme, systemThemeMedia]);

  // Initial theme setup
  useEffect(() => {
    if (!theme) {
      setSystemMode();
    } else if (theme === "light") {
      setLightMode();
    } else {
      setDarkMode();
    }
  }, [theme]);

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button className="w-[12rem]">
          {!theme ? (
            <>
              <MdComputer />
              System (Default)
            </>
          ) : theme === "dark" ? (
            <>
              <IoMoon />
              Dark
            </>
          ) : (
            <>
              <IoSunny />
              Light
            </>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="system" onClick={() => setSystemMode()}>
          <div className="flex items-center gap-1">
            <MdComputer />
            System (Default)
          </div>
        </DropdownItem>
        <DropdownItem key="dark" onClick={() => setDarkMode()}>
          <div className="flex items-center gap-1">
            <IoMoon />
            Dark
          </div>
        </DropdownItem>
        <DropdownItem key="light" onClick={() => setLightMode()}>
          <div className="flex items-center gap-1">
            <IoSunny />
            Light
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeChanger;
