"use client";

import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs'
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT – Blog Name */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            Krishan<span className="text-indigo-600">'s</span> Blog
          </Link>

          {/* CENTER – Search (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full rounded-full border bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
          </div>

          {/* RIGHT – Menu (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="#" className="nav-link">About</Link>
            <Link href="#" className="nav-link">Projects</Link>

            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                  <Link href="/sign-in">
                  Sign In
                  
                  </Link>
                {/* <SignInButton/> */}
                </SignedOut>
                
              </Link>
              
            </div>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden rounded-md p-2 text-gray-700 hover:bg-gray-100"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden space-y-4 pb-6 pt-4">

            {/* Search (Mobile) */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full rounded-full border bg-gray-50 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <nav className="flex flex-col gap-3">
              <Link href="/" className="mobile-link">Home</Link>
              <Link href="#" className="mobile-link">About</Link>
              <Link href="#" className="mobile-link">Projects</Link>
            </nav>

            <div className="flex gap-3 pt-2">
              <Link
                href="#"
                className="flex-1 rounded-full border px-4 py-2 text-center text-sm font-medium"
              >
                <SignedIn>
                  <UserButton/>
                </SignedIn>
                <SignedOut>
                <Link href="/sign-in">
                  Sign In
                  
                  </Link>
                </SignedOut>
              </Link>
              
            </div>
          </div>
        )}
      </div>

      {/* Reusable styles */}
      <style jsx>{`
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          transition: color 0.2s;
        }
        .nav-link:hover {
          color: #4f46e5;
        }
        .mobile-link {
          font-size: 0.95rem;
          font-weight: 500;
          color: #374151;
        }
      `}</style>
    </header>
  );
}
