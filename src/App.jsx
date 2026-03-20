import { useState } from 'react'
import { USERS } from './data/trainingPlans'
import { useCompletions } from './hooks/useCompletions'
import BottomNav from './components/BottomNav'
import Home from './pages/Home'
import Plan from './pages/Plan'
import Activity from './pages/Activity'
import Profile from './pages/Profile'

function UserSelect() {
  const setUser = (id) => {
    const url = new URL(window.location.href)
    url.searchParams.set('user', id)
    window.location.href = url.toString()
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex flex-col items-center justify-center px-6">
      <div className="text-center mb-10">
        <p className="text-[13px] font-semibold tracking-wider text-gray-500 uppercase mb-2">Boseong 2026</p>
        <h1 className="text-[38px] font-bold tracking-tight text-black leading-tight">Select your<br />profile</h1>
      </div>
      <div className="w-full max-w-sm space-y-4">
        {Object.values(USERS).map(user => (
          <button
            key={user.id}
            onClick={() => setUser(user.id)}
            className="w-full bg-white rounded-[28px] p-5 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.04)] flex items-center space-x-4 hover:border-orange-200 hover:shadow-orange-100/60 active:scale-[0.98] transition-all"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <h2 className="text-[20px] font-bold text-black">{user.name}</h2>
              <p className="text-[14px] text-gray-500">{user.unit === 'km' ? 'Kilometers' : 'Miles'} · Boseong 2026</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Loading your plan…</p>
      </div>
    </div>
  )
}

export default function App() {
  const params = new URLSearchParams(window.location.search)
  const userParam = params.get('user')
  const userId = userParam === 'andrew' || userParam === 'jimmy' ? userParam : null
  const friendId = userId === 'andrew' ? 'jimmy' : userId === 'jimmy' ? 'andrew' : null

  const [activeTab, setActiveTab] = useState('home')
  const { completions, friendCompletions, toggleComplete, loading } = useCompletions(userId, friendId)

  if (!userId) return <UserSelect />
  if (loading) return <LoadingScreen />

  return (
    <div className="font-sans selection:bg-orange-200">
      {activeTab === 'home' && (
        <Home
          userId={userId}
          completions={completions}
          friendCompletions={friendCompletions}
          toggleComplete={toggleComplete}
          setActiveTab={setActiveTab}
        />
      )}
      {activeTab === 'plan' && (
        <Plan
          userId={userId}
          completions={completions}
          toggleComplete={toggleComplete}
        />
      )}
      {activeTab === 'activity' && (
        <Activity
          userId={userId}
          completions={completions}
          friendCompletions={friendCompletions}
        />
      )}
      {activeTab === 'profile' && (
        <Profile
          userId={userId}
          completions={completions}
        />
      )}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
