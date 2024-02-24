import Link from 'next/link'
import React from 'react'
import Search from './Search'
export default function Navbar() {
  return (
    <header className=' bg-black p-3 sticky top-0 z-10'>
      <nav className='max-w-6xl mx-auto  flex flex-col sm:flex-row sm:justify-between  font-bold items-center'>
        <Link href="/" className='text-3xl text-white'>Photo Gallary</Link>
        <Search />
      </nav>
    </header>
  )
}
