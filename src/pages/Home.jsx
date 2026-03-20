import { Wind, Zap, Flame, Coffee, Trophy, ChevronRight, TrendingUp, TrendingDown, CheckCircle2, Circle } from 'lucide-react'
import CircularProgress from '../components/CircularProgress'
import { PLANS, USERS, TYPE_CONFIG, getAllRuns, getCurrentWeekNum, friendlyDate } from '../data/trainingPlans'

const ICON_MAP = { Wind, Zap, Flame, Coffee, Trophy }

function RunIcon({ type, size = 22 }) {
  const cfg = TYPE_CONFIG[type]
  const Icon = ICON_MAP[cfg.icon]
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bgClass}`}>
      <Icon size={size} className={cfg.colorClass} />
    </div>
  )
}

export default function Home({ userId, completions, friendCompletions, toggleComplete, setActiveTab }) {
  const user = USERS[userId]
  const friendId = userId === 'andrew' ? 'jimmy' : 'andrew'
  const friend = USERS[friendId]
  const currentWeekNum = getCurrentWeekNum()
  const weekData = PLANS[userId][currentWeekNum - 1]
  const allRuns = getAllRuns(userId)

  // Next uncompleted run
  const nextRun = allRuns.find(r => r.type !== 'rest' && !completions.has(r.key))

  // Weekly stats
  const completedThisWeek = weekData.runs.filter(r => completions.has(r.key))
  const completedVolume = completedThisWeek.reduce((sum, r) => sum + r.distanceNum, 0)
  const totalVolume = weekData.total
  const progressPct = totalVolume > 0 ? (completedVolume / totalVolume) * 100 : 0
  const runnableRuns = weekData.runs.filter(r => r.type !== 'rest')
  const completedCount = completedThisWeek.filter(r => r.type !== 'rest').length

  // Days elapsed in this week (0–7)
  const weekStart = new Date(weekData.runs[0].dateISO + 'T00:00:00')
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const daysElapsed = Math.min(Math.max(Math.floor((today - weekStart) / (1000 * 60 * 60 * 24)), 0), 7)
  const expectedPct = (daysElapsed / 7) * 100
  const onTrack = progressPct >= expectedPct - 5

  // Upcoming: next 4 uncompleted runs after the hero run
  const upcomingRuns = allRuns
    .filter(r => r.type !== 'rest' && !completions.has(r.key) && r.key !== nextRun?.key)
    .slice(0, 4)

  // Friend's runs this week
  const friendWeekData = PLANS[friendId][currentWeekNum - 1]
  const friendCompletedThisWeek = friendWeekData.runs.filter(r => friendCompletions.has(r.key) && r.type !== 'rest')

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-28">
      {/* Header */}
      <header className="sticky top-0 z-50 px-6 pt-12 pb-4 backdrop-blur-xl bg-[#F2F2F7]/80 border-b border-gray-200/50">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[13px] font-semibold tracking-wider text-gray-500 uppercase mb-1">
              Week {currentWeekNum} of 6
            </p>
            <h1 className="text-[34px] leading-tight font-bold tracking-tight text-black">
              {currentWeekNum === 6 ? 'Race Week!' : 'Training'}
            </h1>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="px-5 pt-6 space-y-8">
        {/* Hero Card */}
        {nextRun ? (
          <section>
            <div className="bg-zinc-900 rounded-[32px] p-6 text-white shadow-xl shadow-zinc-900/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                    <Flame size={14} className="text-orange-400" />
                    <span className="text-xs font-semibold tracking-wide uppercase text-gray-200">Up Next</span>
                  </div>
                  <span className="text-sm font-medium text-gray-400">{friendlyDate(nextRun.dateISO)}</span>
                </div>
                <div className="mb-8">
                  <h2 className="text-5xl font-bold tracking-tighter mb-1">
                    {nextRun.distanceNum > 0 ? `${nextRun.distanceNum} ${user.unit}` : '—'}
                  </h2>
                  <p className="text-xl font-medium text-gray-300">{TYPE_CONFIG[nextRun.type].label}</p>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">{nextRun.description}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Date</p>
                    <p className="text-sm font-semibold">{nextRun.date}</p>
                  </div>
                  <button
                    onClick={() => toggleComplete(nextRun.key)}
                    className="bg-orange-500 hover:bg-orange-400 active:scale-95 transition-all text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-orange-500/30"
                  >
                    <CheckCircle2 size={22} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <div className="bg-zinc-900 rounded-[32px] p-6 text-white shadow-xl text-center py-10">
              <Trophy size={40} className="text-yellow-400 mx-auto mb-3" />
              <h2 className="text-2xl font-bold">All Done!</h2>
              <p className="text-gray-400 mt-1">You've completed all your runs. See you at the start line!</p>
            </div>
          </section>
        )}

        {/* This Week */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[20px] font-bold tracking-tight text-black">This Week</h3>
            <button onClick={() => setActiveTab('plan')} className="text-orange-500 text-sm font-medium flex items-center">
              Details <ChevronRight size={16} className="ml-0.5" />
            </button>
          </div>
          <div className="bg-white rounded-[28px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-1">Volume</p>
              <div className="flex items-baseline space-x-1 mb-2">
                <span className="text-3xl font-bold tracking-tight text-black">
                  {completedVolume % 1 === 0 ? completedVolume : completedVolume.toFixed(1)}
                </span>
                <span className="text-sm font-medium text-gray-500">/ {totalVolume} {user.unit}</span>
              </div>
              <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-md inline-flex ${onTrack ? 'text-emerald-600 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {onTrack ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                <span>{onTrack ? 'On track' : 'Behind'}</span>
              </div>
              <p className="text-[12px] text-gray-400 mt-2">{completedCount} of {runnableRuns.length} runs done</p>
            </div>
            <div className="pl-4 border-l border-gray-100">
              <CircularProgress progress={progressPct} size={76} strokeWidth={7} />
            </div>
          </div>
        </section>

        {/* Upcoming */}
        {upcomingRuns.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 px-1">
              <h3 className="text-[20px] font-bold tracking-tight text-black">Upcoming</h3>
              <button onClick={() => setActiveTab('plan')} className="text-orange-500 text-sm font-medium">View Plan</button>
            </div>
            <div className="bg-white rounded-[28px] p-2 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
              {upcomingRuns.map((r, idx) => (
                <div key={r.key} className="relative">
                  <div className="flex items-center p-4 hover:bg-gray-50 rounded-[20px] transition-colors cursor-pointer"
                    onClick={() => toggleComplete(r.key)}>
                    <RunIcon type={r.type} />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="text-[17px] font-semibold tracking-tight text-black">{TYPE_CONFIG[r.type].label}</h4>
                        <span className="text-[15px] font-semibold text-black">
                          {r.distanceNum > 0 ? `${r.distanceNum} ${user.unit}` : '—'}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-[14px] text-gray-500">{friendlyDate(r.dateISO)}, {r.date}</span>
                      </div>
                    </div>
                  </div>
                  {idx < upcomingRuns.length - 1 && (
                    <div className="absolute bottom-0 right-4 left-[76px] h-[1px] bg-gray-100" />
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Buddy Section */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-[20px] font-bold tracking-tight text-black">{friend.name}'s Week</h3>
            <button onClick={() => setActiveTab('activity')} className="text-orange-500 text-sm font-medium">See All</button>
          </div>
          <div className="bg-white rounded-[28px] p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            {friendCompletedThisWeek.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-2">No runs logged yet this week.</p>
            ) : (
              <div className="space-y-3">
                {friendCompletedThisWeek.map(r => (
                  <div key={r.key} className="flex items-center space-x-3">
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                    <div className="flex-1">
                      <span className="text-[15px] font-medium text-black">{TYPE_CONFIG[r.type].label}</span>
                      <span className="text-gray-400 text-sm ml-2">{r.date}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      {r.distanceNum > 0 ? `${r.distanceNum} ${friend.unit}` : '—'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
