import { useState } from 'react'
import { Copy, Check, MapPin, Calendar, TrendingUp } from 'lucide-react'
import { USERS, PLANS, getAllRuns, getDaysToRace } from '../data/trainingPlans'

export default function Profile({ userId, completions }) {
  const user = USERS[userId]
  const allRuns = getAllRuns(userId)
  const [copied, setCopied] = useState(false)

  const completedRuns = allRuns.filter(r => completions.has(r.key) && r.type !== 'rest')
  const totalVolume = completedRuns.reduce((sum, r) => sum + r.distanceNum, 0)
  const totalPlanVolume = allRuns.filter(r => r.type !== 'rest' && r.type !== 'race').reduce((sum, r) => sum + r.distanceNum, 0)
  const overallPct = totalPlanVolume > 0 ? Math.min((totalVolume / totalPlanVolume) * 100, 100) : 0
  const daysToRace = getDaysToRace()

  const shareUrl = `${window.location.origin}${window.location.pathname}?user=${userId}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-28">
      <header className="sticky top-0 z-50 px-6 pt-12 pb-4 backdrop-blur-xl bg-[#F2F2F7]/80 border-b border-gray-200/50">
        <h1 className="text-[34px] font-bold tracking-tight text-black">Profile</h1>
      </header>

      <main className="px-5 pt-6 space-y-5">
        {/* User card */}
        <div className="bg-white rounded-[28px] p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center space-x-5">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 border-orange-100 shadow-md flex-shrink-0 ${user.avatarBg}`}>
            <span className="text-white font-bold text-2xl tracking-wide">{user.initials}</span>
          </div>
          <div>
            <h2 className="text-[24px] font-bold text-black">{user.name}</h2>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin size={14} className="mr-1" />
              <span>Boseong Marathon 2026</span>
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-0.5">
              <Calendar size={14} className="mr-1" />
              <span>May 2, 2026</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center">
            <p className="text-2xl font-bold text-black">{completedRuns.length}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wide">Runs Done</p>
          </div>
          <div className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center">
            <p className="text-2xl font-bold text-black">{daysToRace}</p>
            <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wide">Days to Race</p>
          </div>
          <div className="bg-white rounded-[24px] p-4 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-center">
            <p className="text-2xl font-bold text-black">
              {totalVolume % 1 === 0 ? totalVolume : totalVolume.toFixed(0)}
            </p>
            <p className="text-[11px] text-gray-500 font-medium mt-1 uppercase tracking-wide">{user.unit} Logged</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <TrendingUp size={18} className="text-orange-500" />
              <span className="text-[16px] font-bold text-black">Build Progress</span>
            </div>
            <span className="text-[15px] font-bold text-orange-500">{Math.round(overallPct)}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-1000"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-[12px] text-gray-400 mt-2">
            {totalVolume % 1 === 0 ? totalVolume : totalVolume.toFixed(1)} / {totalPlanVolume} {user.unit} of training completed
          </p>
        </div>

        {/* Share link */}
        <div className="bg-white rounded-[28px] p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
          <h3 className="text-[16px] font-bold text-black mb-1">Your Training Link</h3>
          <p className="text-[13px] text-gray-500 mb-3">Share this link to access your training on any device.</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 overflow-hidden">
              <p className="text-[13px] text-gray-600 truncate">{shareUrl}</p>
            </div>
            <button
              onClick={copyLink}
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                copied ? 'bg-emerald-500 text-white' : 'bg-orange-500 text-white'
              }`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
