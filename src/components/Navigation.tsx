"use client"

import { 
  LayoutDashboard, 
  Dumbbell, 
  Apple, 
  Trophy, 
  CreditCard, 
  Settings, 
  LogOut,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import { UserButton, SignOutButton, useUser, useAuth } from "@clerk/nextjs"

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Dumbbell, label: 'Workouts', href: '/routines' },
  { icon: Apple, label: 'Nutrition', href: '/nutrition' },
  { icon: Trophy, label: 'Leaderboards', href: '/leaderboards' },
  { icon: CreditCard, label: 'Premium', href: '/premium' },
]

export function SideNavBar() {
  const { isSignedIn } = useAuth();

  return (
    <aside className="w-64 border-r border-white/10 bg-black flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <Activity className="text-cyber-cyan w-8 h-8" />
        <span className="font-orbitron font-bold text-xl tracking-tighter">
          CYBER<span className="text-cyber-cyan">FIT</span>
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-cyber-cyan hover:bg-cyber-cyan/5 transition-all duration-200 group"
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-jetbrains text-sm uppercase tracking-wider">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-white transition-colors">
          <Settings size={18} />
          <span className="font-jetbrains text-xs uppercase tracking-widest">Settings</span>
        </button>
        {isSignedIn && (
          <SignOutButton redirectUrl="/sign-in">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500/70 hover:text-red-400 transition-colors">
              <LogOut size={18} />
              <span className="font-jetbrains text-xs uppercase tracking-widest">Disconnect</span>
            </button>
          </SignOutButton>
        )}
      </div>
    </aside>
  )
}

export function TopAppBar() {
  const { user, isLoaded, isSignedIn } = useUser();

  return (
    <header className="h-16 border-b border-white/10 bg-black/50 glassmorphism sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="h-2 w-2 rounded-full bg-cyber-lime animate-pulse" />
        <span className="font-jetbrains text-[10px] text-cyber-lime tracking-[0.2em] uppercase">
          System Status: Optimal
        </span>
      </div>

      <div className="flex items-center gap-6">
        {isSignedIn ? (
          <>
            <div className="flex flex-col items-end">
              <span className="text-white font-bold text-xs uppercase tracking-tighter">
                {isLoaded ? (user?.username || user?.firstName || 'Operative') : '...'}
              </span>
              <span className="text-cyber-cyan font-jetbrains text-[9px] uppercase tracking-widest">
                Status: Authenticated
              </span>
            </div>
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-10 h-10 border border-cyber-cyan/30 p-0.5 rounded-none",
                  userButtonTrigger: "focus:shadow-none focus:outline-none"
                }
              }}
            />
          </>
        ) : (
          <Link href="/sign-in" className="text-cyber-cyan font-jetbrains text-xs uppercase tracking-widest border border-cyber-cyan/30 px-4 py-2 hover:bg-cyber-cyan hover:text-black transition-all">
            Login_Required
          </Link>
        )}
      </div>
    </header>
  )
}
