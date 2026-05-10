'use client'

import { useState, useEffect } from 'react'

export function SystemFooter() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex justify-between items-center text-[10px] font-jetbrains text-gray-300 uppercase tracking-widest pt-8 border-t border-white/5">
      <span>Region: Sector_7G</span>
      <span>Lat: 37.7749 // Long: -122.4194</span>
      <span>Local_Time: {mounted ? new Date().toLocaleTimeString() : 'SYNCING...'}</span>
    </div>
  )
}
