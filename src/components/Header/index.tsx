"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuData from "./menuData"; // adjust the path if needed

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header
      className={`w-full border-b shadow-sm fixed top-0 left-0 z-50 transition-all duration-300
        bg-gradient-to-b from-black/10 to-transparent ${
          sticky ? "bg-white dark:bg-gray-dark dark:shadow-md" : "bg-white"
        }`}
    >
      {/* Mobile Toggle Button */}
      <button
        className="absolute right-4 top-4 z-[60] block md:hidden text-3xl bg-white px-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen ? "true" : "false"}
        aria-controls="mobile-menu"
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Logo and Title */}
      <div
        className="app-website-navigation app-contrast-color websiteNavigation websiteNavigation--vertical"
        data-color="secondary-nav-bg"
      >
        <div className="websiteNavigation__title websiteFont__nameHero websiteFont__nameHero--vertical websiteNavigation--vertical-firstNav websiteNavigation__titleStamp">
          <Link href="/" className="block">
            A<span className="websiteNavigation__titleConjunction" />P
          </Link>
        </div>

        {/* Nav Content */}
        <div
          className={`app-nav-mobile-container website-menu-top websiteNavigation--vertical-secondNav transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <nav className="websites-menu">
            {/*
            <p
              className="app-contrast-color app-nav-mobile websites-menu-closeBar"
              data-color="secondary-nav-bg"
            >
              Menu
            </p>
            */}
            <div className="theme-menu-wrapper">
              <ul className="theme-menu">
                {menuData.map((item) => (
                  <li
                    key={item.id}
                    className={`theme-menu-item app-menu-admin ${
                      pathname === item.path
                        ? "underline underline-offset-8 text-primary"
                        : ""
                    }`}
                  >
                    <div className="app-menu-container">
                      {item.submenu ? (
                        <>
                          <span className="theme-menu-item-link cursor-default">
                            <span>{item.title}</span>
                          </span>
                          <ul className="pl-4 mt-1">
                            {item.submenu.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={sub.path || "#"}
                                  target={sub.newTab ? "_blank" : "_self"}
                                  rel={
                                    sub.newTab
                                      ? "noopener noreferrer"
                                      : undefined
                                  }
                                  className={`theme-menu-item-link ${
                                    pathname === sub.path ? "active" : ""
                                  }`}
                                >
                                  <span>{sub.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <Link
                          href={item.path || "#"}
                          target={item.newTab ? "_blank" : "_self"}
                          rel={item.newTab ? "noopener noreferrer" : undefined}
                          className="theme-menu-item-link"
                        >
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* 🎯 New Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 left-0 w-full h-screen bg-white z-[55] transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="websiteNavigation__title websiteFont__nameHero websiteFont__nameHero--vertical websiteNavigation--vertical-firstNav websiteNavigation__titleStamp">
            <Link href="/" className="block">
              A<span className="websiteNavigation__titleConjunction" />P
            </Link>
          </div>
        </div>
        <nav className="flex flex-col p-6 space-y-4">
          {menuData.map((item) =>
            item.submenu ? (
              <div key={item.id}>
                <p className="text-lg font-semibold">{item.title}</p>
                <ul className="pl-4 mt-1 space-y-2">
                  {item.submenu.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={sub.path || "#"}
                        target={sub.newTab ? "_blank" : "_self"}
                        rel={sub.newTab ? "noopener noreferrer" : undefined}
                        className="text-base text-gray-700 hover:text-primary"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.path || "#"}
                target={item.newTab ? "_blank" : "_self"}
                rel={item.newTab ? "noopener noreferrer" : undefined}
                className="text-lg font-semibold text-gray-800 hover:text-primary"
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
