import { Home, CalendarDays, Activity, User } from 'lucide-react'

const TABS = [
  { id: 'home',    icon: Home,        label: 'Summary' },
  { id: 'plan',    icon: CalendarDays, label: 'Plan' },
  { id: 'activity',icon: Activity,    label: 'Activity' },
  { id: 'profile', icon: User,        label: 'Profile' },
]

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav className="fixed bottom-0 w-full px-6 pb-8 pt-4 backdrop-blur-2xl bg-[#F2F2F7]/80 border-t border-gray-200/60 flex justify-between items-center z-50">
      {TABS.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center space-y-1 w-16 transition-colors duration-200 ${
            activeTab === item.id ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          <span className={`text-[10px] ${activeTab === item.id ? 'font-semibold' : 'font-medium'}`}>
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  )
}
