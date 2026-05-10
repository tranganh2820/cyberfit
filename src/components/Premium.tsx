'use client'

import { ShieldCheck, Zap, Globe, Cpu, CreditCard, CheckCircle2 } from 'lucide-react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { useState } from 'react'
import { updateRole } from '@/lib/actions'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function TierHub() {
  const [isPending, setIsPending] = useState<string | null>(null)

  const tiers = [
    { id: 'BASIC', name: 'BASIC', price: '$0', features: ['Core Tracking', 'Social Feed', 'Standard Database'] },
    { id: 'ELITE', name: 'ELITE', price: '$19', features: ['Advanced Analytics', 'Routine Builder', 'Regional Rankings', 'AI Coaching'] },
    { id: 'OVERRIDE', name: 'OVERRIDE', price: '$49', features: ['Biometric HUD', 'Verified Status', '1RM Predictions', 'Personal Trainer Sync'], premium: true },
  ]

  const handleUpgrade = async (role: any) => {
    setIsPending(role)
    try {
      await updateRole(role)
      alert(`STATUS_UPGRADED_TO_${role}`)
    } finally {
      setIsPending(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {tiers.map((tier) => (
        <div 
          key={tier.name}
          className={cn(
            "border p-8 glassmorphism relative group flex flex-col h-full transition-all duration-500",
            tier.premium 
              ? "border-cyber-cyan glow-cyan bg-cyber-cyan/5 scale-105 z-10" 
              : "border-white/10 hover:border-white/30 bg-white/5"
          )}
        >
          {tier.premium && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyber-cyan text-black text-[9px] font-black px-4 py-1 tracking-[0.3em] uppercase">
              _Recommended_Protocol
            </div>
          )}
          
          <div className="mb-8">
            <h3 className="font-orbitron text-xl text-white tracking-tighter mb-1">{tier.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold font-jetbrains text-white">{tier.price}</span>
              <span className="text-[10px] font-jetbrains text-gray-300">/MONTH</span>
            </div>
          </div>

          <ul className="space-y-4 flex-1">
            {tier.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3">
                <CheckCircle2 size={14} className={tier.premium ? "text-cyber-cyan" : "text-gray-300"} />
                <span className="text-xs font-jetbrains text-gray-300 uppercase tracking-tighter">{feat}</span>
              </li>
            ))}
          </ul>

          <button 
            onClick={() => handleUpgrade(tier.id)}
            disabled={isPending !== null}
            className={cn(
              "mt-10 w-full py-3 font-orbitron text-xs tracking-widest uppercase transition-all",
              tier.premium 
                ? "bg-cyber-cyan text-black font-black" 
                : "border border-white/20 text-white hover:bg-white hover:text-black",
              isPending === tier.id && "animate-pulse opacity-50"
            )}
          >
            {isPending === tier.id ? 'UPGRADING...' : 'Select_Tier'}
          </button>
        </div>
      ))}
    </div>
  )
}

export function PaymentTerminal() {
  return (
    <div className="border border-white/10 bg-black/40 p-10 glassmorphism relative overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <ShieldCheck size={120} className="text-cyber-cyan" />
      </div>

      <div className="flex items-center gap-3 mb-10">
        <CreditCard className="text-cyber-cyan" />
        <h2 className="font-orbitron text-sm uppercase tracking-widest text-white">Secure_Payment_Terminal</h2>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        <div className="group">
          <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-3">_CARD_HOLDER_ID</label>
          <input type="text" placeholder="OPERATIVE NAME" className="w-full bg-white/5 border-b border-white/20 py-2 px-4 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
        </div>

        <div className="group">
          <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-3">_CARD_NUMBER_SEQUENCE</label>
          <input type="text" placeholder="**** **** **** ****" className="w-full bg-white/5 border-b border-white/20 py-2 px-4 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-3">_EXP_DATE</label>
            <input type="text" placeholder="MM / YY" className="w-full bg-white/5 border-b border-white/20 py-2 px-4 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
          </div>
          <div>
            <label className="block font-jetbrains text-[9px] text-gray-300 uppercase mb-3">_SEC_PROTOCOL</label>
            <input type="text" placeholder="CVC" className="w-full bg-white/5 border-b border-white/20 py-2 px-4 font-jetbrains text-sm focus:outline-none focus:border-cyber-cyan" />
          </div>
        </div>

        <div className="pt-6 flex items-center gap-4">
          <div className="h-10 w-10 border border-white/10 flex items-center justify-center">
            <Cpu size={20} className="text-cyber-cyan animate-pulse" />
          </div>
          <p className="text-[10px] font-jetbrains text-gray-300 leading-relaxed uppercase">
            ENCRYPTION_STATUS: AES-256_ACTIVE<br />
            PAYMENT_GATEWAY: STRIPE_SECURE_API
          </p>
        </div>
      </div>
    </div>
  )
}

export function PremiumHUD() {
  return (
    <div className="border border-white/10 bg-black/40 p-6 glassmorphism h-full">
      <h2 className="font-orbitron text-[10px] uppercase tracking-[0.2em] text-white mb-8">Premium_Telemetry</h2>
      <div className="space-y-6">
        {[
          { label: 'AI_COACH_MODULE', status: 'READY' },
          { label: 'BIOMETRIC_HUD', status: 'ACTIVE' },
          { label: 'ELITE_NETWORK', status: 'CONNECTED' },
          { label: '1RM_PREDICTOR', status: 'STANDBY' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between border-b border-white/5 pb-4">
            <span className="font-jetbrains text-[11px] text-gray-300 uppercase tracking-tighter">{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-cyber-lime" />
              <span className="font-jetbrains text-[9px] text-cyber-lime font-bold">{item.status}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-white/5 p-4 border border-white/10">
        <p className="font-jetbrains text-[9px] text-gray-300 leading-relaxed italic uppercase">
          "The 'OVERRIDE' protocol grants full access to the CyberFit neural network and advanced biometric optimization tools."
        </p>
      </div>
    </div>
  )
}
