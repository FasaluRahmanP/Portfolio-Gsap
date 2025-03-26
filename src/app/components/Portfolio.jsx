"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"

export default function Portfolio() {
  const [currentTime, setCurrentTime] = useState("00:00")
  const [theme, setTheme] = useState("dark")
  const experienceRef = useRef(null)
  const letsTalkRef = useRef(null)
  const arrowRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorArrowRef = useRef(null)

  // Initialize GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      // Initialize the animation after the component mounts
      const experienceTitle = document.querySelector("#experience-section h1")
      if (experienceTitle) {
        gsap.to(experienceTitle, {
          transform: "translateX(-135%)",
          scrollTrigger: {
            trigger: "#experience-section",
            scroller: "body",
            start: "top 0%",
            end: "top -100%",
            scrub: 5,
            pin: true,
          },
        })
      }

      // Move "Let's Talk" text to the left on scroll
      if (letsTalkRef.current) {
        gsap.to(letsTalkRef.current.querySelector("h5"), {
          x: "450vw", // Move completely to the left
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: letsTalkRef.current,
            start: "top 10%",
            end: "top -100%",
            scrub: 5,
          },
        })
      }

      // Return cleanup function
      return () => {
        // Clean up ScrollTrigger when component unmounts
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  // Setup cursor-following arrow animation
  useEffect(() => {
    if (letsTalkRef.current && arrowRef.current) {
      // Initially hide the arrow
      gsap.set(arrowRef.current, { opacity: 0, scale: 0.8 })

      const letsTalkContainer = letsTalkRef.current

      // Show arrow on mouseenter
      const handleMouseEnter = () => {
        gsap.to(arrowRef.current, {
          opacity: 1,
          scale: 5,
          duration: 0.5,
          ease: "power2.out",
        })

        // Hide the custom cursor in Let's Talk section
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            opacity: 0,
            duration: 0.3,
          })
        }
      }

      // Hide arrow on mouseleave
      const handleMouseLeave = () => {
        gsap.to(arrowRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.in",
        })

        // Show the custom cursor again when leaving Let's Talk section
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            opacity: 1,
            duration: 0.3,
          })
        }
      }

      // Move arrow with cursor
      const handleMouseMove = (e) => {
        const rect = letsTalkContainer.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        gsap.to(arrowRef.current, {
          left: x,
          top: y,
          duration: 1.0,
          ease: "power2.out",
        })
      }

      letsTalkContainer.addEventListener("mouseenter", handleMouseEnter)
      letsTalkContainer.addEventListener("mouseleave", handleMouseLeave)
      letsTalkContainer.addEventListener("mousemove", handleMouseMove)

      // Cleanup event listeners
      return () => {
        letsTalkContainer.removeEventListener("mouseenter", handleMouseEnter)
        letsTalkContainer.removeEventListener("mouseleave", handleMouseLeave)
        letsTalkContainer.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  // Custom cursor effect
  useEffect(() => {
    const cursor = cursorRef.current

    if (!cursor) return

    // Hide default cursor
    // document.body.style.cursor = "none"

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      })
    }

    window.addEventListener("mousemove", moveCursor)

    // Add hover effect for clickable elements
    const handleLinkHover = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
      })
    }

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      })
    }

    const links = document.querySelectorAll("a, button")
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHover)
      link.addEventListener("mouseleave", handleLinkLeave)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.body.style.cursor = "auto"

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHover)
        link.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [])

  useEffect(() => {
    updateTime()
    const timeInterval = setInterval(updateTime, 1000)

    function updateTime() {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}`)
    }

    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  // Theme Toggle Function
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  return (
    <main
      className={`transition-colors duration-300 ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"} relative`}
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference transition-colors duration-300 ${theme === "dark" ? "bg-[#4B0082]" : "bg-[#FFD700]"
          }`}
        style={{
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
        }}
      />

      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-6">
        {/* Current Time */}
        <div className="font-abel text-2xl md:text-3xl">{currentTime}</div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 md:space-x-24 text-center">
          {["HOME", "ABOUT", "PROJECT", "LET'S TALK"].map((item, index) => (
            <Link key={index} href="#" className="font-abel text-lg md:text-xl hover:text-[#d1ff4f] transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Light/Dark Mode Toggle Button */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-[#d1ff4f] text-black font-semibold rounded-lg hover:opacity-80 transition-opacity"
        >
          {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 md:py-24 min-h-screen">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left ml-16">
          <div className="mb-4 relative inline-block">
            <div
              className={`bg-[#d1ff4f] text-black text-4xl md:text-6xl font-albert font-extrabold py-3 px-4 -rotate-4 relative inline-block`}
            >
              CREATIVE
              <span
                className={`absolute top-0 right-0 text-[#d1ff4f] ${theme === "dark" ? "bg-[#121212]" : "bg-white"} translate-x-5 -translate-y-3 rounded-full w-10 h-10 flex justify-center items-center text-5xl font-bold`}
              >
                *
              </span>
            </div>
          </div>

          <div className="text-4xl sm:text-5xl md:text-7xl font-albert font-extrabold leading-[1.1]">
            <div>FRONT-END</div>
            <div>DEVELOPER</div>
            <div>& DESIGNER</div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience-section" ref={experienceRef} className="h-screen w-full overflow-hidden">
        <h1
          className={`text-[40vw] uppercase font-medium ${theme === "dark" ? "text-white" : "text-black"} whitespace-nowrap`}
        >
          PORTFOLIO
        </h1>
      </div>

      {/* Developer Profile Section */}
      <div className={`min-h-screen p-8 ${theme === "dark" ? "text-white" : "text-black"}`}>
        <main className="max-w-4xl mx-auto mt-10">
          {/* Header section */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">
              HI, I'M <span className="bg-indigo-600 px-2 text-white">FASALU RAHMAN</span>, A PASSIONATE DEVELOPER
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              FOCUSED ON CREATING BEAUTIFUL, <span className="underline">FUNCTIONAL</span>,
            </h2>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              AND <span className="underline">USER-FRIENDLY</span> APPLICATIONS.
            </h2>
          </div>

          {/* Description section */}
          <div className="mt-8">
            <p className={`max-w-2xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              I'm a dedicated web developer with a passion for creating intuitive and engaging digital experiences. With
              a background in [your background], I bring a unique perspective to every project I work on.
            </p>
          </div>

          {/* Location and Image section */}
          <div className="flex flex-col md:flex-row justify-between mt-16">
            <div className="flex items-center">
              <div className="text-red-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="bg-[#d1ff4f] text-black px-4 py-1 transform rotate-2">
                <span className="text-xl font-bold">Calicut</span>
              </div>
            </div>

            <div className="mt-8 md:mt-0">
              <div className="bg-indigo-600 h-64 w-64"></div>
            </div>
          </div>
        </main>
      </div>

      {/* Projects Section - Updated to support theme toggle */}
      <main
        className={`min-h-screen ${theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"} px-4 md:px-8 py-12 transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Project 1 */}
          <section className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-600">01.</h2>
              <h3 className="text-2xl font-bold mb-4">
                Fit Feet
                <br />
                E-Commerce Website
              </h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-md`}>
                A comprehensive e-commerce platform designed for a premium footwear brand, featuring advanced filtering,
                user accounts, and seamless checkout experience.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-square bg-indigo-700 w-full max-w-md mx-auto"></div>
            </div>
          </section>

          {/* Project 2 */}
          <section className="flex flex-col md:flex-row-reverse items-center justify-between mb-16 md:mb-24">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-600">02.</h2>
              <h3 className="text-2xl font-bold mb-4">
                Thread
                <br />
                Clone App
              </h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-md`}>
                A mobile application for an essential oils company that provides personalized recommendations and
                special offers based on customer preferences and usage patterns.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-square bg-indigo-700 w-full max-w-md mx-auto"></div>
            </div>
          </section>

          {/* Project 3 */}
          <section className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-indigo-600">03.</h2>
              <h3 className="text-2xl font-bold mb-4">
                Pick Me
                <br />
                Live Project
              </h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-md`}>
                A real-time streaming platform that connects creators with their audience through interactive features,
                live chat, and monetization options for content creators.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-square bg-indigo-700 w-full max-w-md mx-auto"></div>
            </div>
          </section>
        </div>
      </main>

      {/* Let's Talk Section with Cursor-Following Red Arrow */}
      <div
        id="lets-talk-section"
        ref={letsTalkRef}
        className="h-screen w-full overflow-hidden flex items-center justify-start px-10 relative cursor-pointer"
      >
        {/* Cursor-following Red Arrow */}
        <div
          ref={arrowRef}
          className="absolute pointer-events-none"
          style={{
            zIndex: 10,
            transform: "translate(-50%, -50%)",
          }}
        >
          <svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,30 H60 M40,10 L60,30 L40,50"
              stroke="#FF5C5C"
              strokeWidth="10"
              fill="none"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
          </svg>
        </div>

        <h5
          className={`text-[30vw] uppercase font-medium ${theme === "dark" ? "text-white" : "text-black"} whitespace-nowrap -ml-[1500px]`}
          style={{ transform: "rotate(180deg)" }}
        >
          LET'S TALK
        </h5>
      </div>
    </main>
  )
}

