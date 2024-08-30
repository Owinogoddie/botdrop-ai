'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="container py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo.svg" alt="BotDrop AI Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-bold text-primary">BotDrop AI</span>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/#features" className="text-dark hover:text-primary">Features</Link>
          <Link href="/#pricing" className="text-dark hover:text-primary">Pricing</Link>
          <Link href="/#contact" className="text-dark hover:text-primary">Contact</Link>
          <Link href="/dashboard" className="text-dark hover:text-primary">Dashboard</Link>
        </nav>
        <div className="hidden md:flex space-x-4">
          <Link href="/login" className="text-primary hover:text-primary-dark">Login</Link>
          <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">Sign Up</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/#features" className="text-dark hover:text-primary">Features</Link>
            <Link href="/#pricing" className="text-dark hover:text-primary">Pricing</Link>
            <Link href="/#contact" className="text-dark hover:text-primary">Contact</Link>
            <Link href="/login" className="text-primary hover:text-primary-dark">Login</Link>
            <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark text-center">Sign Up</Link>
          </nav>
        </div>
      )}
    </header>
  )
}