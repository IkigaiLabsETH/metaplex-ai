"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface MenuItem {
  label: string;
  href: string;
  subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "TRVL ADVISOR",
    href: "#",
    subItems: [
      { label: "James", href: "#" },
      { label: "Kelly", href: "#" },
      { label: "Anthony", href: "#" },
    ],
  },
  {
    label: "WINE TASTING",
    href: "#",
    subItems: [
      { label: "Red", href: "#" },
      { label: "White", href: "#" },
    ],
  },
  {
    label: "LIFESTYLE",
    href: "#",
    subItems: [
      { label: "Art Collections", href: "#" },
      { label: "Cryptocurrencies", href: "#" },
    ],
  },
];

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSubmenu = (index: number) => {
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-white"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-6 h-0.5 bg-white"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block w-6 h-0.5 bg-white"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 left-0 w-64 bg-black/30 backdrop-blur-md shadow-lg rounded-md overflow-hidden"
          >
            <ul className="py-2">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    onClick={() => toggleSubmenu(index)}
                    className="flex justify-between items-center w-full px-4 py-2 text-left text-white hover:text-gray-200 hover:bg-transparent focus:outline-none transition-colors duration-200"
                  >
                    {item.label}
                    {item.subItems && (
                      <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${
                          activeSubmenu === index ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                  {item.subItems && (
                    <motion.ul
                      initial="collapsed"
                      animate={activeSubmenu === index ? "open" : "collapsed"}
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="bg-black/20 backdrop-blur-md overflow-hidden"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={subItem.href}
                            className="block px-8 py-2 text-sm text-white hover:text-gray-200 hover:bg-white/5 transition-colors duration-200"
                          >
                            {subItem.label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
