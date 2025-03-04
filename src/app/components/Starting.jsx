"use client"
import React from 'react'

const Starting = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
            <div className="text-center px-4 sm:px-6 md:px-8">
            <h1
  style={{
    fontFamily: 'Karantina, sans-serif',
    letterSpacing: '0px',
  }}
  className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 transform scale-[1.5] sm:scale-[1.8] md:scale-[2.0] inline-flex"
>
  {'Portfolio'.split('').map((letter, index) => (
    <span
      key={index}
      className="inline-block animate-letter transition-all duration-300 ease-in-out"
    >
      {letter}
    </span>
  ))}
</h1>
            </div>

            <style jsx>{`
  .animate-letter:hover {
    transform: scaleY(3.1);
    display: inline-block;
  }
`}</style>
        </div>
    );
}

export default Starting