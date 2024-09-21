import React from 'react'

const HeroSection = () => {
  return (
    <section className='hero-section text-center mt-32 flex flex-col'>
        <br/>
        <h2 className='font-bold text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl mt-0 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-600 bg-clip-text text-transparent brightness-100'>
              WORDEARN
        </h2>
        <div className='mx-auto mt-5 flex max-w-fit space-x-4'>
            <button
            target='_blank'
            className='rounded-md mx-auto max-w-fit border px-5 py-2                                
            sm:text-xl font-bold shadow-sm bg-yellow-600 text-green-900 brightness-100
            hover:ring-grat-400 hover:ring-2'>
               CREATE ROOM
            </button>
        </div>
        <br/>
        
    </section>
  )
}

export default HeroSection;