import { useState } from 'react'
import { Wind, Zap, Flame, Coffee, Trophy, CheckCircle2 } from 'lucide-react'
import { USERS, TYPE_CONFIG, getAllRuns } from '../data/trainingPlans'

const ICON_MAP = { Wind, Zap, Flame, Coffee, Trophy }

function RunIcon({ type }) {
  const cfg = TYPE_CONFIG[type]
  const Icon = ICON_MAP[cfg.icon]
  return (
    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bgClass}`}>
      <Icon size={20} className={cfg.colorClass} />
    </div>
  )
}

function CompletedList({ targetUserId, completionSet }) {
  const user = USERS[targetUserId]
  const allRuns = getAllRuns(targetUserId)
  const completed = allRuns
    .filter(r => completionSet.has(r.key) && r.type !== 'rest')
    .reverse()

  const totalVolume = completed.reduce((sum, r) => sum + r.distanceNum, 0)

  if (completed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Flame size={28} className="text-gray-300" />
        </div>
        <p className="text-gray-500 font-medium">No runs logged yet.</p>
        <p className="text-gray-400 text-sm mt-1">Get out there!</p>
      </div>
    )
  }

  return (
    <div>
      {/* Summary */}
      <div className="bg-white rounded-[24px] p-4 mb-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between">
          <div className="text-center flex-1 border-r border-gray-100">
            <p className="text-2xl font-bold text-black">{completed.length}</p>
            <p className="text-[12px] text-gray-500 font-medium mt-0.5">Runs Done</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-black">
              {totalVolume % 1 === 0 ? totalVolume : totalVolume.toFixed(1)}
            </p>
            <p className="text-[12px] text-gray-500 font-medium mt-0.5">{user.unit} Total</p>
          </div>
        </div>
      </div>

      {/* Run list */}
      <div className="bg-white rounded-[28px] p-2 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {completed.map((r, idx) => (
          <div key={r.key} className="relative">
            <div className="flex items-center p-4">
              <RunIcon type={r.type} />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-[16px] font-semibold text-black">{TYPE_CONFIG[r.type].label}</h4>
                  <span className="text-[14px] font-semibold text-black">
                    {r.distanceNum > 0 ? `${r.distanceNum} ${user.unit}` : '—'}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  <span className="text-[13px] text-gray-400">{r.date} · Week {r.week}</span>
                </div>
              </div>
            </div>
            {idx < completed.length - 1 && (
              <div className="absolute bottom-0 right-4 left-[64px] h-[1px] bg-gray-100" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Activity({ userId, completions, friendCompletions }) {
  const friendId = userId === 'andrew' ? 'jimmy' : 'andrew'
  const friend = USERS[friendId]
  const [activeView, setActiveView] = useState('mine')

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-28">
      <header className="sticky top-0 z-50 px-6 pt-12 pb-4 backdrop-blur-xl bg-[#F2F2F7]/80 border-b border-gray-200/50">
        <h1 className="text-[34px] font-bold tracking-tight text-black mb-4">Activity</h1>
        {/* Toggle */}
        <div className="flex bg-gray-200/70 rounded-xl p-1">
          <button
            onClick={() => setActiveView('mine')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeView === 'mine' ? 'bg-white text-black shadow-sm' : 'text-gray-500'
            }`}
          >
            Mine
          </button>
          <button
            onClick={() => setActiveView('friend')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeView === 'friend' ? 'bg-white text-black shadow-sm' : 'text-gray-500'
            }`}
          >
            {friend.name}'s
          </button>
        </div>
      </header>

      <main className="px-5 pt-5">
        {activeView === 'mine'
          ? <CompletedList targetUserId={userId} completionSet={completions} />
          : <CompletedList targetUserId={friendId} completionSet={friendCompletions} />
        }
      </main>
    </div>
  )
}
