import { useState } from 'react'
import { Wind, Zap, Flame, Coffee, Trophy, CheckCircle2, Circle, ChevronDown, ChevronUp, Pencil, X, Check } from 'lucide-react'
import { PLANS, USERS, TYPE_CONFIG, getCurrentWeekNum } from '../data/trainingPlans'

const ICON_MAP = { Wind, Zap, Flame, Coffee, Trophy }

function RunIcon({ type }) {
  const cfg = TYPE_CONFIG[type]
  const Icon = ICON_MAP[cfg.icon]
  return (
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.bgClass}`}>
      <Icon size={22} className={cfg.colorClass} />
    </div>
  )
}

function EditForm({ run, unit, onSave, onCancel }) {
  const [description, setDescription] = useState(run.description)
  const [distanceNum, setDistanceNum] = useState(run.distanceNum)

  function handleSave() {
    const trimmed = description.trim()
    if (!trimmed) return
    onSave({ description: trimmed, distanceNum: Number(distanceNum) })
  }

  return (
    <div className="mt-3 space-y-2">
      <textarea
        className="w-full text-[14px] text-gray-700 border border-gray-200 rounded-xl p-3 resize-none focus:outline-none focus:border-orange-400"
        rows={3}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      {run.distanceNum > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-[13px] text-gray-500">Distance</span>
          <input
            type="number"
            min="0"
            step="0.1"
            className="w-24 text-[14px] text-gray-700 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-400"
            value={distanceNum}
            onChange={e => setDistanceNum(e.target.value)}
          />
          <span className="text-[13px] text-gray-500">{unit}</span>
        </div>
      )}
      <div className="flex space-x-2 pt-1">
        <button
          onClick={handleSave}
          className="flex items-center space-x-1 bg-orange-500 text-white text-[13px] font-semibold px-4 py-1.5 rounded-full"
        >
          <Check size={14} />
          <span>Save</span>
        </button>
        <button
          onClick={onCancel}
          className="flex items-center space-x-1 bg-gray-100 text-gray-600 text-[13px] font-semibold px-4 py-1.5 rounded-full"
        >
          <X size={14} />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  )
}

function RunRow({ run, unit, completed, onToggle, isEdited, onSaveEdit, onClearEdit }) {
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const isRest = run.type === 'rest'
  const isRace = run.type === 'race'
  const truncated = !editing && run.description.length > 55
  const displayDesc = expanded || !truncated ? run.description : run.description.slice(0, 55) + '…'

  function handleSave(fields) {
    onSaveEdit(run.key, fields)
    setEditing(false)
  }

  return (
    <div className={`rounded-[20px] p-4 mb-2 border transition-all ${
      completed ? 'bg-gray-50 border-gray-100' : isRace ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-start space-x-3">
        <RunIcon type={run.type} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-0.5">
            <div className="flex items-center space-x-2">
              <span className={`text-[13px] font-semibold uppercase tracking-wider ${TYPE_CONFIG[run.type].colorClass}`}>
                {run.day}
              </span>
              <span className="text-[12px] text-gray-400">{run.date}</span>
              {isEdited && !editing && (
                <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-wide">edited</span>
              )}
            </div>
            <span className={`text-[15px] font-bold ml-2 flex-shrink-0 ${completed ? 'text-gray-400' : 'text-black'}`}>
              {run.distanceNum > 0 ? `${run.distanceNum} ${unit}` : '—'}
            </span>
          </div>

          {editing ? (
            <EditForm
              run={run}
              unit={unit}
              onSave={handleSave}
              onCancel={() => setEditing(false)}
            />
          ) : (
            <>
              <p className={`text-[14px] leading-relaxed ${completed ? 'text-gray-400 line-through' : isRest ? 'text-gray-400' : 'text-gray-700'}`}>
                {displayDesc}
              </p>
              {truncated && (
                <button
                  onClick={() => setExpanded(e => !e)}
                  className="flex items-center text-orange-500 text-[12px] font-medium mt-1"
                >
                  {expanded ? <><ChevronUp size={14} /> Show less</> : <><ChevronDown size={14} /> Show more</>}
                </button>
              )}
              {!isRest && !isRace && (
                <div className="flex items-center space-x-3 mt-2">
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center space-x-1 text-[12px] text-gray-400 hover:text-orange-500 transition-colors"
                  >
                    <Pencil size={12} />
                    <span>Edit</span>
                  </button>
                  {isEdited && (
                    <button
                      onClick={() => onClearEdit(run.key)}
                      className="text-[12px] text-gray-400 hover:text-red-400 transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {!isRest && (
          <button onClick={() => onToggle(run.key)} className="flex-shrink-0 ml-1 mt-0.5">
            {completed
              ? <CheckCircle2 size={24} className="text-emerald-500" />
              : <Circle size={24} className="text-gray-300" />
            }
          </button>
        )}
      </div>
    </div>
  )
}

export default function Plan({ userId, completions, toggleComplete, workoutEdits = {}, saveWorkoutEdit, clearWorkoutEdit }) {
  const currentWeekNum = getCurrentWeekNum()
  const [selectedWeek, setSelectedWeek] = useState(currentWeekNum)
  const user = USERS[userId]
  const weekData = PLANS[userId][selectedWeek - 1]

  // Apply any saved edits on top of base run data
  const runs = weekData.runs.map(r => ({
    ...r,
    ...(workoutEdits[r.key] || {}),
  }))

  const completedInWeek = runs.filter(r => completions.has(r.key) && r.type !== 'rest').length
  const runnableRuns = runs.filter(r => r.type !== 'rest').length

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-28">
      <header className="sticky top-0 z-50 px-6 pt-12 pb-4 backdrop-blur-xl bg-[#F2F2F7]/80 border-b border-gray-200/50">
        <h1 className="text-[34px] font-bold tracking-tight text-black mb-4">Plan</h1>
        {/* Week tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
          {PLANS[userId].map((w, i) => {
            const wNum = i + 1
            const isActive = wNum === selectedWeek
            const isCurrent = wNum === currentWeekNum
            return (
              <button
                key={wNum}
                onClick={() => setSelectedWeek(wNum)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                    : isCurrent
                    ? 'bg-orange-100 text-orange-500'
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
              >
                W{wNum}
              </button>
            )
          })}
        </div>
      </header>

      <main className="px-5 pt-5">
        {/* Week summary */}
        <div className="mb-5">
          <h2 className="text-[18px] font-bold text-black">{weekData.weekLabel}</h2>
          <p className="text-[14px] text-gray-500 mt-0.5">
            {weekData.total} {user.unit} total · {completedInWeek} of {runnableRuns} runs done
          </p>
        </div>

        {/* Run list */}
        <div>
          {runs.map(r => (
            <RunRow
              key={r.key}
              run={r}
              unit={user.unit}
              completed={completions.has(r.key)}
              onToggle={toggleComplete}
              isEdited={!!workoutEdits[r.key]}
              onSaveEdit={saveWorkoutEdit}
              onClearEdit={clearWorkoutEdit}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
