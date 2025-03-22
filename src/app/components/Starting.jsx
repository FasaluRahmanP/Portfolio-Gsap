"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

const SplashScreen = () => {
  const router = useRouter();
  const slides = [
    { text: "FRONT-END", color: "bg-red-600" },
    { text: "DEVELOPER", color: "bg-blue-600" },
    { text: "PORTFOLIO", color: "bg-green-600" }
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();

    slides.forEach((_, index) => {
      tl.to("#text", { opacity: 1, duration: 0.5 })
        .to("#text", { opacity: 0, duration: 0.5, delay: 0.5, onComplete: () => {
          setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
        }});
    });

    tl.eventCallback("onComplete", () => {
      console.log("Navigating to HomePage...");
      router.push("components/login");
    });

    return () => tl.kill(); // Cleanup
  }, [router, slides.length]);

  // ✅ Ensure `currentSlide` is within bounds
  const slide = slides[currentSlide] || slides[0];

  return (
    <div className={`flex justify-center items-center h-screen text-white text-4xl font-bold transition-colors duration-500 ${slide.color}`}>
      <div id="text" className="opacity-0">{slide.text}</div>
    </div>
  );
};

export default SplashScreen;
