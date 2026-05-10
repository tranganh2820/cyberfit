import { TierHub, PaymentTerminal, PremiumHUD } from '@/components/Premium'

export default function PremiumPage() {
  return (
    <main className="p-8 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="text-center space-y-2 mb-12">
        <h1 className="font-orbitron text-4xl text-white tracking-tighter uppercase">Premium_Protocol_Initialization</h1>
        <p className="font-jetbrains text-xs text-cyber-cyan tracking-[0.4em] uppercase">Upgrade your operative status to ELITE or OVERRIDE</p>
      </div>

      {/* Tier Selection */}
      <TierHub />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Payment Terminal */}
        <div className="lg:col-span-8">
          <PaymentTerminal />
        </div>

        {/* Premium HUD Sidebar */}
        <div className="lg:col-span-4">
          <PremiumHUD />
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <button className="border border-cyber-cyan/50 bg-cyber-cyan text-black px-12 py-5 font-orbitron font-black text-sm tracking-[0.3em] uppercase hover:bg-white transition-all glow-cyan">
          Initialize_Premium_Access
        </button>
      </div>
    </main>
  )
}
