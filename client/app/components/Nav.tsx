"use client"
import React from 'react'
import { Shield } from 'lucide-react'

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 backdrop-blur-md bg-black/20 border-b border-white/5">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-white/20 transition-all">
          <Shield className="w-5 h-5 text-white/80" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Incognito
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-500 uppercase tracking-wider">Live</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav