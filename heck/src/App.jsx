import { useState } from 'react'
import './App.css'
import ConnectWallet from './components/Navbar'
import HeroSection from './components/HeroSection'


function App() {

  return (
    <>
      <div className='w-screen min-h-screen fixed  flex justify-center px-6 py-40  pointer-event-none bg-black'>
        <div className="absolute inset-0 bg-[url('/griddy.svg')] bg-cover  opacity-20"></div>
      </div>
      <div className=' justify-center '>
        <ConnectWallet/>
       
        <div className='container mx-auto'>
          <HeroSection/>
        </div>
      </div>

    </>
  )
}

export default App
