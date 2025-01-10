import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-950 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-9'>Taskify</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <Link to='/'>
        <li className='cursor-pointer hover:font-bold transition-all '>Home</li>
        </Link>
        <Link to='/tasks'>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Navbar
