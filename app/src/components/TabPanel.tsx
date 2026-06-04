import { TABS, Tab } from '../types'
import About from './About'
import Skills from './Skills'
import Experience from './Experience'
import Education from './Education'
import Projects from './Projects'
import Courses from './Courses'

interface Props {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
  tabsInNav?: boolean
}

export default function TabPanel({ activeTab, setActiveTab, tabsInNav }: Props) {
  return (
    <div>
      <div className={`w-full px-6 flex border-b border-gray-800 transition-opacity duration-200 ${
        tabsInNav ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-4 text-sm font-mono whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? 'text-cyan-400 border-cyan-400'
                : 'text-gray-500 border-transparent hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="min-h-screen">
        {activeTab === 'About' && <About />}
        {activeTab === 'Skills' && <Skills />}
        {activeTab === 'Experience' && <Experience />}
        {activeTab === 'Education' && <Education />}
        {activeTab === 'Projects' && <Projects />}
        {activeTab === 'Courses' && <Courses />}
      </div>
    </div>
  )
}
